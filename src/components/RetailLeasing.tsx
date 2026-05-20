import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/95" />

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <span className="font-bebas text-gold text-xs tracking-[0.3em] uppercase block mb-2">
                {tier.eyebrow}
              </span>
              <h3 className="font-cormorant text-white text-2xl leading-snug mb-2">
                {tier.name}
              </h3>
              <p className="font-inter text-white/60 text-sm leading-relaxed mb-3">
                {tier.body}
              </p>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-bebas text-white text-xl">{tier.stat}</span>
                <span className="font-inter text-white/40 text-xs">{tier.statLabel}</span>
              </div>
              <span className="font-inter text-gold text-xs tracking-widest uppercase hover:text-white transition-colors duration-300 cursor-pointer">
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
        <div className="flex items-center justify-center gap-4">
          <a
            href="#close"
            className="bg-gold text-black font-inter text-xs tracking-widest uppercase px-6 py-3 hover:bg-gold/90 transition-all duration-300 cursor-pointer"
          >
            Schedule a Site Visit
          </a>
          <a
            href="#close"
            className="border border-gold text-gold font-inter text-xs tracking-widest uppercase px-6 py-3 hover:bg-gold hover:text-black transition-all duration-300 cursor-pointer"
          >
            Download Leasing Pack
          </a>
        </div>
      </div>
    </section>
  )
}
