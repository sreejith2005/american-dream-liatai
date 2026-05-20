import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface UseCanvasScrollOptions {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  containerRef: React.RefObject<HTMLDivElement | null>
  totalFrames: number
  getFramePath: (frameNumber: number) => string
  snapPoints: number[]
}

interface UseCanvasScrollReturn {
  loadingProgress: number
  isReady: boolean
  currentProgress: number
}

export function useCanvasScroll(options: UseCanvasScrollOptions): UseCanvasScrollReturn {
  const { canvasRef, containerRef, totalFrames, getFramePath, snapPoints } = options

  // CRITICAL: savedImages declared at TOP, before any useEffect
  const savedImages = useRef<HTMLImageElement[]>([])
  const progressRef = useRef(0)
  const rafId = useRef(0)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [currentProgress, setCurrentProgress] = useState(0)

  // Preload all frames
  useEffect(() => {
    let loadedCount = 0
    const images: HTMLImageElement[] = []

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image()
      img.src = getFramePath(i)
      img.onload = () => {
        loadedCount++
        setLoadingProgress(Math.round((loadedCount / totalFrames) * 100))
        if (loadedCount === totalFrames) {
          setIsReady(true)
        }
      }
      img.onerror = () => {
        loadedCount++
        setLoadingProgress(Math.round((loadedCount / totalFrames) * 100))
        if (loadedCount === totalFrames) {
          setIsReady(true)
        }
      }
      images.push(img)
    }

    savedImages.current = images
  }, [totalFrames, getFramePath])

  // ScrollTrigger + rAF draw loop — only after preload complete
  useEffect(() => {
    if (!isReady || !canvasRef.current || !containerRef.current) return

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

    // Draw first frame immediately
    const firstFrame = savedImages.current[0]
    if (firstFrame?.complete) {
      ctx.drawImage(firstFrame, 0, 0, canvas.width, canvas.height)
    }

    // ScrollTrigger setup
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=500vh',
      pin: true,
      scrub: 1.5,
      invalidateOnRefresh: true,
      snap: {
        snapTo: snapPoints,
        duration: { min: 0.3, max: 0.8 },
        delay: 0.15,
        ease: 'power2.inOut',
      },
      onUpdate: (self) => {
        progressRef.current = self.progress
        setCurrentProgress(self.progress)
      },
    })

    // requestAnimationFrame draw loop
    let lastFrame = -1
    const draw = () => {
      const progress = progressRef.current
      const frameIndex = Math.round(progress * (totalFrames - 1))

      if (frameIndex !== lastFrame) {
        const frame = savedImages.current[frameIndex]
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
  }, [isReady, canvasRef, containerRef, totalFrames, snapPoints])

  return { loadingProgress, isReady, currentProgress }
}
