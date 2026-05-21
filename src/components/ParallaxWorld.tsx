import { useRef, useCallback, useEffect } from 'react'
import { useCanvasScroll } from '../hooks/useCanvasScroll'
import { useImagePreloader, getPreloadedImages, TOTAL_FRAMES, startCriticalPreload } from '../hooks/useImagePreloader'

const CLIPS = [
  {
    id: 'entry',
    frameStart: 1,
    frameEnd: 61,
    snapProgress: 0.000,
    fadeIn: 0.000,
    fullyVisible: 0.020,
    fadeOut: 0.160,
    eyebrow: 'AMERICAN DREAM',
    headline: 'Where 20 Million Stories Begin',
    cta: null as string | null,
  },
  {
    id: 'destination',
    frameStart: 62,
    frameEnd: 126,
    snapProgress: 0.201,
    fadeIn: 0.140,
    fullyVisible: 0.201,
    fadeOut: 0.370,
    eyebrow: 'THE DESTINATION',
    headline: '40M+ Visitors. Your Brand at the Center.',
    cta: null as string | null,
  },
  {
    id: 'bigsnow',
    frameStart: 127,
    frameEnd: 167,
    snapProgress: 0.425,
    fadeIn: 0.360,
    fullyVisible: 0.425,
    fadeOut: 0.545,
    eyebrow: 'BIG SNOW AMERICAN DREAM',
    headline: "The World's Only Indoor Ski Slope Inside a Mall.",
    cta: null as string | null,
  },
  {
    id: 'nickelodeon',
    frameStart: 168,
    frameEnd: 230,
    snapProgress: 0.584,
    fadeIn: 0.520,
    fullyVisible: 0.584,
    fadeOut: 0.740,
    eyebrow: 'NICKELODEON UNIVERSE',
    headline: "America's Largest Indoor Theme Park.",
    cta: null as string | null,
  },
  {
    id: 'dreamworks',
    frameStart: 231,
    frameEnd: 428,
    snapProgress: 0.801,
    fadeIn: 0.740,
    fullyVisible: 0.801,
    fadeOut: 0.950,
    eyebrow: 'DREAMWORKS WATER PARK',
    headline: 'One Roof. Infinite Possibilities.',
    cta: 'Explore Partnership Opportunities',
  },
]

/** Three-stage overlay opacity: ramp in → hold → fade out */
function calcZoneOpacity(
  progress: number,
  fadeIn: number,
  fullyVisible: number,
  fadeOut: number,
): number {
  if (progress < fadeIn || progress > fadeOut) return 0

  let opacity = 0
  if (progress >= fadeIn && progress < fullyVisible) {
    // fade in stage — ramp from 0 to 1
    opacity = (progress - fadeIn) / (fullyVisible - fadeIn)
  } else if (progress >= fullyVisible && progress <= fadeOut) {
    // hold then fade out stage
    const holdEnd = fadeOut - (fadeOut - fullyVisible) * 0.3
    if (progress <= holdEnd) opacity = 1
    else opacity = 1 - (progress - holdEnd) / (fadeOut - holdEnd)
  }

  return Math.max(0, Math.min(1, opacity))
}

export default function ParallaxWorld() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // DOM refs for direct manipulation — never triggers React re-renders
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([])
  const closingRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const parallaxWrapperRef = useRef<HTMLDivElement>(null)

  // Local hook — reacts to loading progress from the singleton preloader
  const { isReady, loadingProgress } = useImagePreloader()

  // Stable reference to the module-level images array
  const getImages = useCallback(() => getPreloadedImages(), [])

  // Scroll progress callback — direct DOM mutation, zero setState
  const handleProgressUpdate = useCallback((progress: number) => {
    // Update each zone overlay opacity
    CLIPS.forEach((clip, i) => {
      const el = overlayRefs.current[i]
      if (!el) return
      const opacity = calcZoneOpacity(progress, clip.fadeIn, clip.fullyVisible, clip.fadeOut)
      el.style.opacity = String(opacity)
    })

    // CTA visibility (last clip, localProgress > 0.65)
    if (ctaRef.current) {
      const lastClip = CLIPS[CLIPS.length - 1]
      const clipRange = 1.0 - lastClip.snapProgress
      const localProgress = clipRange > 0 ? (progress - lastClip.snapProgress) / clipRange : 0
      const isLastActive = progress >= lastClip.snapProgress
      const ctaVisible = isLastActive && localProgress > 0.65
      ctaRef.current.style.opacity = ctaVisible ? '1' : '0'
      ctaRef.current.style.pointerEvents = ctaVisible ? 'auto' : 'none'
    }

    // Closing overlay — fades in during last 15% of final clip
    if (closingRef.current) {
      const lastClip = CLIPS[CLIPS.length - 1]
      const clipRange = 1.0 - lastClip.snapProgress
      const localProgress = clipRange > 0 ? (progress - lastClip.snapProgress) / clipRange : 0
      const isLastActive = progress >= lastClip.snapProgress
      let closingOpacity = 0
      if (isLastActive && localProgress > 0.85) {
        closingOpacity = Math.min(1, (localProgress - 0.85) / 0.15)
      }
      closingRef.current.style.opacity = String(closingOpacity)
    }

    // Parallax translateX drift
    if (parallaxWrapperRef.current) {
      parallaxWrapperRef.current.style.transform = `translateX(${-20 * progress}px)`
    }
  }, [])

  const { drawFnRef } = useCanvasScroll({
    canvasRef,
    containerRef,
    totalFrames: TOTAL_FRAMES,
    getImages,
    isReady,
    loadingProgress,
    onProgressUpdate: handleProgressUpdate,
  })

  // Draw frame 1 immediately if available — canvas is never blank
  useEffect(() => {
    const images = getPreloadedImages()
    if (images.length > 0 && canvasRef.current && drawFnRef.current && images[0]?.complete) {
      drawFnRef.current(images[0])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <section
        ref={containerRef}
        className="relative h-screen w-full bg-black overflow-hidden"
      >
        {/* Loading overlay — gold progress bar fallback if frames aren't ready */}
        <div
          className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center"
          style={{
            opacity: loadingProgress < 15 ? 1 : 0,
            pointerEvents: loadingProgress < 15 ? 'auto' : 'none',
            transition: 'opacity 600ms ease',
          }}
        >
          {/* Top progress bar */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-transparent">
            <div
              className="h-full bg-gold"
              style={{
                width: `${loadingProgress}%`,
                transition: 'width 100ms linear',
              }}
            />
          </div>
          <span className="font-inter text-white/40 text-xs tracking-[0.3em] uppercase">
            Loading Experience
          </span>
        </div>

        {/* Canvas wrapper with horizontal parallax shift */}
        <div
          ref={parallaxWrapperRef}
          className="absolute inset-0"
          style={{ willChange: 'transform' }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            style={{
              willChange: 'transform',
              transform: 'translateZ(0)',
            }}
          />
        </div>

        {/* Bottom gradient for text legibility */}
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />

        {/* Zone text overlays — one per clip, opacity driven by direct DOM mutation */}
        {CLIPS.map((clip, i) => (
          <div
            key={clip.id}
            ref={(el) => { overlayRefs.current[i] = el }}
            className="absolute bottom-12 left-6 md:left-12 z-20 flex flex-col gap-3 max-w-sm px-2 md:px-0"
            style={{ opacity: 0 }}
          >
            <span className="font-bebas text-gold text-sm md:text-lg font-bold opacity-100 tracking-[0.25em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {clip.eyebrow}
            </span>
            <h3 className="font-cormorant text-white font-semibold leading-tight text-3xl md:text-5xl drop-shadow-[0_2px_12px_rgba(0,0,0,1)]">
              {clip.headline}
            </h3>
            {clip.cta && (
              <a
                ref={ctaRef}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="mt-2 inline-block border border-gold text-gold font-inter text-xs tracking-widest uppercase px-6 py-4 md:py-3 w-fit hover:bg-gold hover:text-black transition-all duration-300 min-h-[44px] flex items-center"
                style={{ opacity: 0, pointerEvents: 'none' }}
                data-cursor-hover
              >
                {clip.cta}
              </a>
            )}
          </div>
        ))}

        {/* Closing overlay — visible at final frame / snap 0.999 */}
        <div
          ref={closingRef}
          className="absolute bottom-12 left-6 md:left-12 z-20 flex flex-col gap-3 max-w-sm px-2 md:px-0"
          style={{ opacity: 0, transition: 'opacity 400ms ease' }}
        >
          <span className="font-bebas text-gold text-sm md:text-lg font-bold opacity-100 tracking-[0.25em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            THE DREAM
          </span>
          <h3 className="font-cormorant text-white font-semibold leading-tight text-3xl md:text-5xl drop-shadow-[0_2px_12px_rgba(0,0,0,1)]">
            This isn't a mall. It's a media channel with a zip code.
          </h3>
        </div>
      </section>

      {/* Section exit transition — brief breath before Section 4 */}
      <div className="h-[10vh] bg-black flex items-center justify-center">
        <div className="w-24 h-px bg-gold/60" />
      </div>
    </>
  )
}
