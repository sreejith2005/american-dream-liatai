import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import type { LeasingSpace } from '../../data/leasingData'

interface LeasingPanelProps {
  space: LeasingSpace | null
  onClose: () => void
}

export default function LeasingPanel({ space, onClose }: LeasingPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const scrimRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (space) {
      gsap.fromTo(
        panelRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.5, ease: 'power3.out' }
      )
      gsap.fromTo(
        scrimRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
      document.body.style.overflow = 'hidden'
    } else {
      gsap.to(panelRef.current, {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in'
      })
      gsap.to(scrimRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      })
      document.body.style.overflow = 'auto'
    }
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [space])

  return (
    <>
      {/* Scrim — hidden on mobile since panel is full width */}
      <div
        ref={scrimRef}
        className={`fixed inset-0 bg-black/60 z-40 hidden md:block ${space ? 'pointer-events-auto' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
      />

      {/* Slide-in Panel — exactly viewport height, no overflow/scroll */}
      <div
        ref={panelRef}
        className="fixed top-0 right-0 w-[100vw] md:w-[85vw] max-w-[860px] h-screen bg-[#0D0D0D] z-50 shadow-2xl translate-x-full overflow-hidden"
      >
        {space && (
          <div className="flex flex-col h-screen">
            {/* Mobile back bar */}
            <button
              onClick={onClose}
              className="w-full py-4 bg-[#0D0D0D] border-b border-[#C9A84C]/30 text-[#C9A84C] font-bebas text-lg tracking-widest text-center flex items-center justify-center gap-2 md:hidden min-h-[44px]"
              aria-label="Go back"
            >
              ← BACK
            </button>

            {/* Close button — desktop */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-11 h-11 bg-black/50 rounded-full hidden md:flex items-center justify-center text-white hover:bg-black transition-colors p-3"
              aria-label="Close panel"
            >
              ✕
            </button>

            {/* Hero Image — compact, responsive height */}
            <div className="w-full shrink-0 relative h-[200px] md:h-[280px]">
              <img
                src={space.imagePath}
                alt={space.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] to-transparent" />
            </div>

            {/* Content — fills remaining space */}
            <div className="flex-1 flex flex-col justify-between px-4 md:px-8 py-5 md:py-6 min-h-0">
              {/* Top section: title + details */}
              <div>
                <span className="font-inter text-white/60 text-xs tracking-widest uppercase mb-1 block">
                  {space.category}
                </span>
                <h2 className="font-bebas text-[#C9A84C] text-4xl md:text-5xl leading-none mb-4">
                  {space.name}
                </h2>
                
                <div className="flex gap-6 mb-4 pb-4 border-b border-white/10">
                  <p className="font-inter text-white/80 text-sm">
                    <span className="text-white font-medium">Size:</span> {space.sqft}
                  </p>
                  <p className="font-inter text-white/80 text-sm">
                    <span className="text-white font-medium">Ideal For:</span> {space.idealFor}
                  </p>
                </div>
              </div>

              {/* Middle section: highlights */}
              <div className="flex-1 min-h-0 flex flex-col">
                <h3 className="font-inter text-white/50 text-xs tracking-widest uppercase mb-3">
                  Space Highlights
                </h3>
                <ul className="flex flex-col gap-2">
                  {space.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="font-inter text-[#C9A84C] font-light text-sm">—</span>
                      <span className="font-inter text-white/70 text-sm leading-relaxed">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom section: CTA */}
              <div className="pt-4 shrink-0">
                <a
                  href={`mailto:leasing@americandream.com?subject=Enquiry about ${space.name}`}
                  className="block w-full text-center bg-[#C9A84C] text-[#000000] font-bebas text-lg tracking-widest py-4 hover:bg-white transition-colors duration-300"
                >
                  {space.ctaLabel}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
