import { useRef, useEffect } from 'react'
import { lenisInstance } from '../main'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface UseCanvasScrollOptions {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  containerRef: React.RefObject<HTMLDivElement | null>
  totalFrames: number
  /** Module-level images array — entries may be undefined until loaded */
  getImages: () => HTMLImageElement[]
  /** Whether all images have finished loading */
  isReady: boolean
  /** 0–100 loading progress */
  loadingProgress: number
  /** Called on every scroll tick with the current progress — use for direct DOM updates only, never setState */
  onProgressUpdate?: (progress: number) => void
}

interface UseCanvasScrollReturn {
  loadingProgress: number
  isReady: boolean
}

export function useCanvasScroll(options: UseCanvasScrollOptions): UseCanvasScrollReturn {
  const {
    canvasRef,
    containerRef,
    totalFrames,
    getImages,
    isReady,
    loadingProgress,
    onProgressUpdate,
  } = options

  const progressRef = useRef(0)
  const rafId = useRef(0)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  // Stable refs so the useEffect closure never goes stale (deps = [])
  const onProgressUpdateRef = useRef(onProgressUpdate)
  onProgressUpdateRef.current = onProgressUpdate
  const totalFramesRef = useRef(totalFrames)
  totalFramesRef.current = totalFrames
  const getImagesRef = useRef(getImages)
  getImagesRef.current = getImages

  // Initialize ScrollTrigger + rAF draw loop at mount — NOT gated on isReady.
  // The canvas is blank until frames arrive, which is fine because the user
  // isn't at Section 3 yet.  No ScrollTrigger.refresh() is ever called.
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    // DPR-aware canvas sizing
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
    }
    resize()
    window.addEventListener('resize', resize)

    // ScrollTrigger setup — with snap points synced to zone clip boundaries
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=4000vh',
      pin: true,
      scrub: 1.5,
      invalidateOnRefresh: true,
      snap: {
        snapTo: [0.000, 0.201, 0.425, 0.584, 0.801, 0.999],
        duration: { min: 0.4, max: 0.8 },
        delay: 0.1,
        ease: "power2.inOut",
        onStart: () => lenisInstance?.stop(),
        onComplete: () => lenisInstance?.start(),
      },
      onUpdate: (self) => {
        progressRef.current = self.progress
        // Direct DOM callback — zero React state updates, zero re-renders
        onProgressUpdateRef.current?.(self.progress)
      },
    })

    // requestAnimationFrame draw loop — reads from the module-level images
    // array on every frame.  If a frame isn't loaded yet, it simply skips.
    let lastFrame = -1
    const draw = () => {
      const progress = progressRef.current
      const frameIndex = Math.round(progress * (totalFramesRef.current - 1))
      const images = getImagesRef.current()

      if (frameIndex !== lastFrame) {
        const frame = images[frameIndex]
        if (frame?.complete) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(frame, 0, 0, canvas.width, canvas.height)
          lastFrame = frameIndex
        }
      }

      rafId.current = requestAnimationFrame(draw)
    }
    rafId.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId.current)
      scrollTriggerRef.current?.kill()
      scrollTriggerRef.current = null
      window.removeEventListener('resize', resize)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Mount once only — all values accessed via stable refs

  return { loadingProgress, isReady }
}
