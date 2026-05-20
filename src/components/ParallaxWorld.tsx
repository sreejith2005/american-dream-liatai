import { useRef, useCallback } from 'react'
import { useCanvasScroll } from '../hooks/useCanvasScroll'
import { useImagePreloader, getPreloadedImages, TOTAL_FRAMES } from '../hooks/useImagePreloader'

const CLIPS = [
  {
    id: 'entry',
    frameStart: 1,
    frameEnd: 61,
    snapProgress: 0.000,
    eyebrow: 'AMERICAN DREAM',
    headline: 'Where 20 Million Stories Begin',
    sub: 'East Rutherford, NJ  ·  The most ambitious destination ever built.',
    cta: null as string | null,
  },
  {
    id: 'destination',
    frameStart: 62,
    frameEnd: 126,
    snapProgress: 0.145,
    eyebrow: 'THE DESTINATION',
    headline: '40M+ Visitors. Your Brand at the Center.',
    sub: 'Premium dwell time. Unmatched foot traffic. A captive audience.',
    cta: null as string | null,
  },
  {
    id: 'bigsnow',
    frameStart: 127,
    frameEnd: 167,
    snapProgress: 0.297,
    eyebrow: 'BIG SNOW AMERICAN DREAM',
    headline: "The World's Only Indoor Ski Slope Inside a Mall.",
    sub: '365 days of snow. Zero weather risk. Year-round traffic.',
    cta: null as string | null,
  },
  {
    id: 'nickelodeon',
    frameStart: 168,
    frameEnd: 230,
    snapProgress: 0.393,
    eyebrow: 'NICKELODEON UNIVERSE',
    headline: "America's Largest Indoor Theme Park.",
    sub: '35+ rides and attractions. Families return, again and again.',
    cta: null as string | null,
  },
  {
    id: 'dreamworks',
    frameStart: 231,
    frameEnd: 428,
    snapProgress: 0.540,
    eyebrow: 'DREAMWORKS WATER PARK',
    headline: 'One Roof. Infinite Possibilities.',
    sub: 'The largest indoor water park in the Western Hemisphere.',
    cta: 'Explore Partnership Opportunities',
  },
]

function getActiveClipIndex(progress: number): number {
  for (let i = CLIPS.length - 1; i >= 0; i--) {
    if (progress >= CLIPS[i].snapProgress) return i
  }
  return 0
}

function getClipLocalProgress(progress: number, clipIndex: number): number {
  const clipStart = CLIPS[clipIndex].snapProgress
  const clipEnd = CLIPS[clipIndex + 1]?.snapProgress ?? 1.0
  const range = clipEnd - clipStart
  if (range <= 0) return 0
  return Math.min(1, Math.max(0, (progress - clipStart) / range))
}

function getOverlayOpacity(localProgress: number): number {
  if (localProgress <= 0.70) return 1
  if (localProgress <= 0.90) return 1 - (localProgress - 0.70) / 0.20
  return 0
}

export default function ParallaxWorld() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Local hook — reacts to loading progress from the singleton preloader
  const { isReady, loadingProgress } = useImagePreloader()

  // Stable reference to the module-level images array
  const getImages = useCallback(() => getPreloadedImages(), [])

  const { currentProgress } = useCanvasScroll({
    canvasRef,
    containerRef,
    totalFrames: TOTAL_FRAMES,
    getImages,
    isReady,
    loadingProgress,
  })

  const activeClipIndex = getActiveClipIndex(currentProgress)
  const activeClip = CLIPS[activeClipIndex]
  const localProgress = getClipLocalProgress(currentProgress, activeClipIndex)
  const overlayOpacity = getOverlayOpacity(localProgress)
  const ctaVisible = activeClipIndex === CLIPS.length - 1 && localProgress > 0.65

  // Closing overlay: fades in during last 15% of clip 5 (localProgress 0.85–1.0)
  const isLastClip = activeClipIndex === CLIPS.length - 1
  const closingOpacity = isLastClip && localProgress > 0.85
    ? Math.min(1, (localProgress - 0.85) / 0.15)
    : 0

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
            opacity: isReady ? 0 : 1,
            pointerEvents: isReady ? 'none' : 'auto',
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
          className="absolute inset-0"
          style={{
            transform: `translateX(${-20 * currentProgress}px)`,
            willChange: 'transform',
          }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            style={{ filter: 'contrast(1.05) saturate(1.1)' }}
          />
        </div>

        {/* Bottom gradient for text legibility */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none z-10" />

        {/* Text overlay */}
        <div
          className="absolute bottom-12 left-12 z-20 flex flex-col gap-3 max-w-sm"
          style={{ opacity: overlayOpacity }}
        >
          <span className="font-bebas text-gold text-xs tracking-[0.3em] uppercase">
            {activeClip.eyebrow}
          </span>
          <h3 className="font-cormorant text-white leading-tight text-[clamp(1.8rem,3.5vw,3rem)]">
            {activeClip.headline}
          </h3>
          <p className="font-inter text-white/70 text-sm leading-relaxed max-w-xs">
            {activeClip.sub}
          </p>
          {activeClip.cta && ctaVisible && (
            <a
              href="#"
              className="mt-2 inline-block border border-gold text-gold font-inter text-xs tracking-widest uppercase px-6 py-3 w-fit hover:bg-gold hover:text-black transition-all duration-300"
              data-cursor-hover
            >
              {activeClip.cta}
            </a>
          )}
        </div>

        {/* Closing overlay — visible at final frame / snap 1.0 */}
        <div
          className="absolute bottom-12 left-12 z-20 flex flex-col gap-3 max-w-sm"
          style={{ opacity: closingOpacity, transition: 'opacity 400ms ease' }}
        >
          <span className="font-bebas text-gold text-xs tracking-[0.3em] uppercase">
            THE DREAM
          </span>
          <h3 className="font-cormorant text-white leading-tight text-[clamp(1.8rem,3.5vw,3rem)]">
            This isn't a mall. It's a media channel with a zip code.
          </h3>
          <p className="font-inter text-white/70 text-sm leading-relaxed max-w-xs">
            Where the world comes to play — and your brand comes to matter.
          </p>
        </div>
      </section>

      {/* Section exit transition — brief breath before Section 4 */}
      <div className="h-[10vh] bg-black flex items-center justify-center">
        <div className="w-24 h-px bg-gold/60" />
      </div>
    </>
  )
}
