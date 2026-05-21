import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router-dom'

const tiers = [
  {
    eyebrow: 'LUXURY MILE',
    name: 'Flagship & Luxury',
    body: 'Hermès · Dior · Louis Vuitton · Saks',
    stat: '50,000 sq ft',
    statLabel: 'luxury wing',
    cta: 'Inquire About Luxury Leasing →',
    image: '/assets/Photorealistic-Renders/6.png',
  },
  {
    eyebrow: 'MAIN MALL',
    name: 'Retail & Flagship',
    body: '500+ brands across 1.5M sq ft of leasable retail space.',
    stat: '1.5M sq ft',
    statLabel: 'leasable area',
    cta: 'Explore Retail Spaces →',
    image: '/assets/Photorealistic-Renders/11.png',
  },
  {
    eyebrow: 'FLEX SPACES',
    name: 'Pop-Up & Activations',
    body: 'Short-term, high-visibility. Perfect for launches, limited editions, and brand activations.',
    stat: '90-day minimum',
    statLabel: 'with full build-out support',
    cta: 'Book a Pop-Up →',
    image: '/assets/Photorealistic-Renders/12.png',
  },
]

export default function RetailLeasing() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      const header = sectionRef.current?.querySelectorAll('[data-reveal]')
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        )
      }

      const cards = sectionRef.current?.querySelectorAll('[data-card]')
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: cards[0],
              start: 'top 75%',
              once: true,
            },
          }
        )
      }

      const rules = sectionRef.current?.querySelectorAll('[data-gold-rule]')
      if (rules) {
        gsap.fromTo(
          rules,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: 'left center',
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, { scope: sectionRef })

  return (
    <section
      id="retail"
      ref={sectionRef}
      data-theme="dark"
      className="min-h-screen w-full bg-black py-24 px-8 md:px-16"
    >
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span data-reveal className="font-bebas text-gold text-xs tracking-[0.3em] uppercase block mb-4">
          RETAIL &amp; LEASING
        </span>
        <h2 data-reveal className="font-cormorant text-white text-[clamp(2.5rem,4vw,4rem)] leading-tight">
          Your Brand, Amplified.
        </h2>
        <div data-gold-rule className="w-16 h-px bg-gold mx-auto mt-6 mb-6" />
        <p data-reveal className="font-inter text-white/60 text-sm leading-relaxed max-w-lg mx-auto">
          500+ brands. Three distinct retail environments. One address that
          drives more foot traffic than any standalone location ever could.
        </p>
      </div>

      {/* Tier cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {tiers.map((tier) => (
          <div
            key={tier.eyebrow}
            data-card
            className="relative overflow-hidden cursor-pointer group"
            style={{ height: 480 }}
          >
            {/* Background image */}
            <img
              src={tier.image}
              alt={tier.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/90" />

            {/* Eyebrow badge – pinned to top-left with dark backing */}
            <span
              className="absolute top-5 left-5 z-10 font-bebas text-gold tracking-[0.3em] uppercase"
              style={{
                fontSize: '0.8rem',
                padding: '6px 14px',
                background: 'rgba(0,0,0,0.7)',
                borderRadius: '2px',
                border: '1px solid rgba(191,155,48,0.3)',
              }}
            >
              {tier.eyebrow}
            </span>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <h3
                className="font-cormorant text-white leading-snug mb-2"
                style={{ fontSize: '1.75rem', textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}
              >
                {tier.name}
              </h3>
              <p
                className="font-inter text-white/80 leading-relaxed mb-3"
                style={{ fontSize: '0.9rem', textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
              >
                {tier.body}
              </p>
              <div className="flex items-baseline gap-2 mb-4">
                <span
                  className="font-bebas text-white"
                  style={{ fontSize: '1.35rem', textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}
                >
                  {tier.stat}
                </span>
                <span
                  className="font-inter text-white/60"
                  style={{ fontSize: '0.75rem', textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
                >
                  {tier.statLabel}
                </span>
              </div>
              <span 
                onClick={() => navigate('/leasing')}
                className="font-inter text-gold tracking-widest uppercase hover:text-white transition-colors duration-300 cursor-pointer"
                style={{ fontSize: '0.8rem', textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
              >
                {tier.cta}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Leasing contact strip */}
      <div className="mt-20 border-t border-white/10 pt-12 text-center">
        <p className="font-inter text-white/50 text-sm">Ready to discuss a space?</p>
        <h3 className="font-cormorant text-white text-[2rem] mt-2 mb-6">
          Talk to our leasing team.
        </h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/leasing')}
            className="bg-gold text-black font-inter text-xs tracking-widest uppercase px-6 py-3 hover:bg-gold/90 transition-all duration-300 cursor-pointer"
          >
            Schedule a Site Visit
          </button>
          <button
            onClick={() => navigate('/leasing')}
            className="border border-gold text-gold font-inter text-xs tracking-widest uppercase px-6 py-3 hover:bg-gold hover:text-black transition-all duration-300 cursor-pointer"
          >
            Download Leasing Pack
          </button>
        </div>
      </div>
    </section>
  )
}
