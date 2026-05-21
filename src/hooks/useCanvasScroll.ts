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
  /** Ref to the draw function — available after mount. Use to draw frame 1 early. */
  drawFnRef: React.RefObject<((img: HTMLImageElement) => void) | null>
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
  const drawFnRef = useRef<((img: HTMLImageElement) => void) | null>(null)
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

    // Simple canvas sizing — no DPR scaling to avoid zoom artifacts
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // ScrollTrigger setup — with snap points synced to zone clip boundaries
    const isMobile = window.innerWidth < 768
    const scrollDistance = isMobile ? '+=1200vh' : '+=4000vh'
    const snapDuration = isMobile
      ? { min: 0.3, max: 0.6 }
      : { min: 0.6, max: 1.2 }

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: scrollDistance,
      pin: true,
      scrub: 1.5,
      invalidateOnRefresh: true,
      snap: {
        snapTo: [0.000, 0.201, 0.425, 0.584, 0.801, 0.999],
        duration: snapDuration,
        delay: 0.05,
        ease: "power1.inOut"
      },
      onUpdate: (self) => {
        progressRef.current = self.progress
        // Direct DOM callback — zero React state updates, zero re-renders
        onProgressUpdateRef.current?.(self.progress)
      },
    })

    // Letterbox-contain draw — fills viewport proportionally, no cropping
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    const draw = (img: HTMLImageElement) => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const imgAspect = img.naturalWidth / img.naturalHeight
      const canvasAspect = canvas.width / canvas.height

      let drawW: number, drawH: number, drawX: number, drawY: number

      if (imgAspect > canvasAspect) {
        // image wider than canvas — fit to canvas width, letterbox top/bottom
        drawW = canvas.width
        drawH = canvas.width / imgAspect
        drawX = 0
        drawY = (canvas.height - drawH) / 2
      } else {
        // image taller than canvas — fit to canvas height, pillarbox left/right
        drawH = canvas.height
        drawW = canvas.height * imgAspect
        drawX = (canvas.width - drawW) / 2
        drawY = 0
      }

      ctx.filter = 'contrast(1.05) saturate(1.1)'
      ctx.drawImage(img, drawX, drawY, drawW, drawH)
      ctx.filter = 'none'
    }

    // Expose draw function via ref so ParallaxWorld can draw frame 1 early
    drawFnRef.current = draw

    let lastFrameIndex = -1
    const getFrame = (index: number, images: HTMLImageElement[]): HTMLImageElement | null => {
      if (images[index]?.complete) return images[index];
      // Walk back to nearest loaded frame
      for (let i = index - 1; i >= 0; i--) {
        if (images[i]?.complete) return images[i];
      }
      return null;
    };

    const loop = () => {
      const progress = progressRef.current
      const frameIndex = Math.round(progress * (totalFramesRef.current - 1))
      const images = getImagesRef.current()

      if (frameIndex !== lastFrameIndex) {
        const frame = getFrame(frameIndex, images)
        if (frame) {
          draw(frame)
          lastFrameIndex = frameIndex
        }
      }

      rafId.current = requestAnimationFrame(loop)
    }
    rafId.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId.current)
      scrollTriggerRef.current?.kill()
      scrollTriggerRef.current = null
      window.removeEventListener('resize', resize)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Mount once only — all values accessed via stable refs

  return { loadingProgress, isReady, drawFnRef }
}
