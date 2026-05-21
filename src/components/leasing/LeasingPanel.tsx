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
      // Slide in
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
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
    } else {
      // Slide out
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
      
      // Restore body scroll
      document.body.style.overflow = 'auto'
    }
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [space])

  // If no space is provided, we still render the hidden structure so GSAP can animate it out,
  // but we use the "last known" space data or just return null if never opened.
  // Actually, keeping the data around until animation finishes is better, but since this is a simple implementation,
  // we can rely on `pointer-events-none` when `!space`.

  return (
    <>
      {/* Scrim */}
      <div
        ref={scrimRef}
        className={`fixed inset-0 bg-black/60 z-40 ${space ? 'pointer-events-auto' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
      />

      {/* Slide-in Panel */}
      <div
        ref={panelRef}
        className="fixed top-0 right-0 w-[85vw] max-w-[860px] h-full bg-[#0D0D0D] z-50 flex flex-col shadow-2xl overflow-y-auto translate-x-full"
      >
        {space && (
          <>
            {/* Close button inside panel */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black transition-colors"
              aria-label="Close panel"
            >
              ✕
            </button>

            {/* Hero Image */}
            <div className="w-full h-[260px] relative shrink-0">
              <img
                src={space.imagePath}
                alt={space.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] to-transparent" />
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 flex-1 flex flex-col">
              <span className="font-inter text-white/60 text-xs tracking-widest uppercase mb-3">
                {space.category}
              </span>
              <h2 className="font-bebas text-[#C9A84C] text-5xl md:text-6xl leading-none mb-6">
                {space.name}
              </h2>
              
              <div className="flex flex-col gap-2 mb-8 pb-8 border-b border-white/10">
                <p className="font-inter text-white/80 text-lg">
                  <span className="text-white font-medium">Size:</span> {space.sqft}
                </p>
                <p className="font-inter text-white/80 text-lg">
                  <span className="text-white font-medium">Ideal For:</span> {space.idealFor}
                </p>
              </div>

              <div className="flex-1">
                <h3 className="font-inter text-white/50 text-sm tracking-widest uppercase mb-6">
                  Space Highlights
                </h3>
                <ul className="flex flex-col gap-4">
                  {space.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <span className="font-inter text-[#C9A84C] font-light">—</span>
                      <span className="font-inter text-white/70 text-base leading-relaxed">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="mt-12 pt-8">
                <a
                  href={`mailto:leasing@americandream.com?subject=Enquiry about ${space.name}`}
                  className="block w-full text-center bg-[#C9A84C] text-[#000000] font-bebas text-xl tracking-widest py-5 hover:bg-white transition-colors duration-300"
                >
                  {space.ctaLabel}
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
