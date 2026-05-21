import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { startCriticalPreload, startPreload } from '../hooks/useImagePreloader'

const introLines = [
  { text: '20 Million People.', delay: 0.5 },
  { text: 'One Destination.', delay: 1.1 },
]

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const blackOverlayRef = useRef<HTMLDivElement>(null)
  const introBlockRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const headlineL1Ref = useRef<HTMLDivElement>(null)
  const headlineL2Ref = useRef<HTMLDivElement>(null)

  // Start preloading Section 3 frames immediately — Hero gives 10–15s of runway
  useEffect(() => {
    // Phase 2: critical frames (1–100) right away
    startCriticalPreload()
    // Phase 3: full preload after 1.5s so it doesn't compete with Hero video buffering
    const timer = setTimeout(() => startPreload(), 1500)
    return () => clearTimeout(timer)
  }, [])

  useGSAP(() => {
    const tl = gsap.timeline()

    // Phase 1: Word-by-word fade-in for each intro line
    introLines.forEach((line, lineIdx) => {
      const words = sectionRef.current?.querySelectorAll(
        `[data-intro-line="${lineIdx}"] .intro-word`
      )
      if (words) {
        tl.fromTo(
          words,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.08,
          },
          line.delay
        )
      }
    })

    // Phase 2: All intro text fades out
    tl.to(
      introBlockRef.current,
      { opacity: 0, duration: 0.4, ease: 'power2.inOut' },
      2.1
    )

    // Black overlay fades to reveal video
    tl.to(
      blackOverlayRef.current,
      { opacity: 0, duration: 0.8, ease: 'power2.inOut' },
      2.3
    )

    // Hero content fades in
    tl.fromTo(
      heroContentRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out' },
      2.8
    )

    // Headline clip-path reveal
    tl.fromTo(
      headlineL1Ref.current,
      { clipPath: 'inset(0 0 100% 0)', y: 60 },
      {
        clipPath: 'inset(0 0 0% 0)',
        y: 0,
        duration: 1.0,
        ease: 'power3.out',
      },
      2.9
    ).fromTo(
      headlineL2Ref.current,
      { clipPath: 'inset(0 0 100% 0)', y: 60 },
      {
        clipPath: 'inset(0 0 0% 0)',
        y: 0,
        duration: 1.0,
        ease: 'power3.out',
      },
      3.05
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-black overflow-hidden"
    >
      {/* Local video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ pointerEvents: 'none' }}
      >
        <source src="/assets/videos/Holidays at American Dream_720p.mp4" type="video/mp4" />
      </video>

      {/* Dark gradient over video */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* Black overlay (covers video during intro, fades out) */}
      <div
        ref={blackOverlayRef}
        className="absolute inset-0 bg-black z-30"
      />

      {/* Phase 1: Intro text block */}
      <div
        ref={introBlockRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-40 gap-2"
      >
        {introLines.map((line, lineIdx) => (
          <h1
            key={lineIdx}
            data-intro-line={lineIdx}
            className="font-cormorant text-white text-[80px] leading-[1.1] tracking-[0.02em] flex gap-[0.3em]"
          >
            {line.text.split(' ').map((word, wIdx) => (
              <span key={wIdx} className="intro-word inline-block opacity-0">
                {word}
              </span>
            ))}
          </h1>
        ))}
      </div>

      {/* Hero content (visible after video reveals) */}
      <div ref={heroContentRef} className="absolute inset-0 z-20 opacity-0">
        {/* Top left: Brand */}
        <div className="absolute top-10 left-10 flex flex-col gap-3">
          <span className="font-inter text-gold text-[11px] tracking-[0.25em] uppercase">
            AMERICAN DREAM
          </span>
          <div className="w-10 h-px bg-gold" />
        </div>

        {/* Center: Headline */}
        <div className="absolute inset-0 flex flex-col items-center justify-center -mt-8">
          <p className="font-inter text-white/60 text-[11px] tracking-[0.2em] uppercase mb-6">
            East Rutherford, New Jersey
          </p>
          <div className="overflow-hidden">
            <div ref={headlineL1Ref} className="clip-reveal">
              <h2 className="font-cormorant text-white text-[88px] leading-[1.0] text-center">
                The World&rsquo;s Greatest
              </h2>
            </div>
          </div>
          <div className="overflow-hidden">
            <div ref={headlineL2Ref} className="clip-reveal">
              <h2 className="font-cormorant text-white text-[88px] leading-[1.0] text-center">
                Entertainment Destination
              </h2>
            </div>
          </div>
        </div>

        {/* Bottom left: Stats */}
        <div className="absolute bottom-10 left-10 flex items-center gap-4">
          <span className="font-inter text-white text-[12px] uppercase tracking-[0.15em]">
            40M+ &nbsp;Annual Visitors
          </span>
          <span className="w-px h-4 bg-gold/60" />
          <span className="font-inter text-white text-[12px] uppercase tracking-[0.15em]">
            3.3M sq ft &nbsp;Property
          </span>
        </div>

        {/* Bottom center: Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="font-inter text-white/50 text-[10px] tracking-[0.3em] uppercase">
            Scroll to Explore
          </span>
          <div className="w-px bg-gold scroll-line-pulse" />
        </div>

        {/* Bottom right: Year */}
        <div className="absolute bottom-10 right-10">
          <span className="font-inter text-white/40 text-[11px] tracking-[0.2em]">
            EST. 2019
          </span>
        </div>
      </div>
    </section>
  )
}
