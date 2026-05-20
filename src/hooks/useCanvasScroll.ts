import { useRef, useState, useEffect } from 'react'
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
}

interface UseCanvasScrollReturn {
  loadingProgress: number
  isReady: boolean
  currentProgress: number
}

export function useCanvasScroll(options: UseCanvasScrollOptions): UseCanvasScrollReturn {
  const {
    canvasRef,
    containerRef,
    totalFrames,
    getImages,
    isReady,
    loadingProgress,
  } = options

  const progressRef = useRef(0)
  const rafId = useRef(0)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  const [currentProgress, setCurrentProgress] = useState(0)

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

    // ScrollTrigger setup — NO snap (snap fights Lenis and causes jump into Section 4)
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=4000vh',
      pin: true,
      scrub: 1.5,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        progressRef.current = self.progress
        setCurrentProgress(self.progress)
      },
    })

    // requestAnimationFrame draw loop — reads from the module-level images
    // array on every frame.  If a frame isn't loaded yet, it simply skips.
    let lastFrame = -1
    const draw = () => {
      const progress = progressRef.current
      const frameIndex = Math.round(progress * (totalFrames - 1))
      const images = getImages()

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
  }, [canvasRef, containerRef, totalFrames, getImages])

  return { loadingProgress, isReady, currentProgress }
}
