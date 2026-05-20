import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const ctaCards = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="12" width="24" height="16" rx="1" stroke="#C9A84C" strokeWidth="1.5" />
        <path d="M4 16L16 8L28 16" stroke="#C9A84C" strokeWidth="1.5" />
        <rect x="12" y="20" width="8" height="8" stroke="#C9A84C" strokeWidth="1.5" />
      </svg>
    ),
    eyebrow: 'FOR TENANTS',
    headline: 'Lease a Space',
    body: 'Luxury flagship, mid-tier retail, F&B, or pop-up. Find your space in the destination that changes everything.',
    cta: 'Talk to Leasing',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="14" r="4" stroke="#C9A84C" strokeWidth="1.5" />
        <circle cx="21" cy="14" r="4" stroke="#C9A84C" strokeWidth="1.5" />
        <path d="M7 26C7 22 9 20 11 20C13 20 14 21 16 21C18 21 19 20 21 20C23 20 25 22 25 26" stroke="#C9A84C" strokeWidth="1.5" />
      </svg>
    ),
    eyebrow: 'FOR BRANDS',
    headline: 'Become a Partner',
    body: 'Put your brand inside 40 million experiences per year. Sponsorship at American Dream is unlike anything else.',
    cta: 'Start a Partnership',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="4" width="22" height="24" rx="1" stroke="#C9A84C" strokeWidth="1.5" />
        <line x1="5" y1="10" x2="27" y2="10" stroke="#C9A84C" strokeWidth="1.5" />
        <line x1="11" y1="4" x2="11" y2="10" stroke="#C9A84C" strokeWidth="1.5" />
        <line x1="21" y1="4" x2="21" y2="10" stroke="#C9A84C" strokeWidth="1.5" />
        <rect x="10" y="15" width="4" height="4" rx="0.5" fill="#C9A84C" />
      </svg>
    ),
    eyebrow: 'FOR PRODUCERS',
    headline: 'Book a Venue',
    body: 'LITEPAC. The Expo Hall. The entire property. American Dream hosts world-class events 365 days a year.',
    cta: 'Explore Event Venues',
  },
]

export default function TheClose() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      const reveals = sectionRef.current?.querySelectorAll('[data-reveal]')
      if (reveals) {
        gsap.fromTo(
          reveals,
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
    }, sectionRef)

    return () => ctx.revert()
  }, { scope: sectionRef })

  return (
    <section
      id="close"
      ref={sectionRef}
      data-theme="dark"
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-24"
    >
      {/* Background with overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1510 40%, #0d0d0d 100%)',
        }}
      />
      <div className="absolute inset-0 bg-black/80" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-8">
        {/* Top */}
        <div className="text-center">
          <span data-reveal className="font-bebas text-gold text-xs tracking-[0.3em] uppercase block mb-4">
            YOUR NEXT MOVE
          </span>
          <h2 data-reveal className="font-cormorant text-white text-[clamp(3rem,5vw,5rem)] leading-none">
            The American Dream
            <br />
            Is Waiting for You.
          </h2>
          <p data-reveal className="font-inter text-white/60 text-sm mt-4 max-w-md mx-auto">
            Whether you're looking to lease, sponsor, or produce —
            the opportunity starts with a single conversation.
          </p>
        </div>

        {/* Three CTA cards */}
        <div className="flex flex-col md:flex-row gap-6 mt-16 justify-center">
          {ctaCards.map((card) => (
            <div
              key={card.eyebrow}
              data-card
              className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 p-10 text-center hover:border-gold transition-all duration-400 cursor-pointer group"
            >
              <div className="flex justify-center">{card.icon}</div>
              <span className="font-bebas text-gold text-xs tracking-[0.3em] uppercase block mt-4">
                {card.eyebrow}
              </span>
              <h3 className="font-cormorant text-white text-[1.8rem] leading-snug mt-2">
                {card.headline}
              </h3>
              <p className="font-inter text-white/60 text-sm mt-3 leading-relaxed">
                {card.body}
              </p>
              <a
                href="#"
                className="mt-6 block border border-gold text-gold font-inter text-xs tracking-widest uppercase px-6 py-3 group-hover:bg-gold group-hover:text-black transition-all duration-300 cursor-pointer"
              >
                {card.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div data-reveal className="mt-16 border-t border-white/10 pt-10 text-center">
          <p className="font-inter text-white/50 text-sm">
            Questions? Reach our commercial team directly.
          </p>
          <p className="mt-2">
            <a
              href="mailto:commercial@americandream.com"
              className="font-inter text-white/50 text-sm underline decoration-gold hover:text-white transition-colors duration-300 cursor-pointer"
            >
              commercial@americandream.com
            </a>
          </p>
          <p className="font-inter text-white/40 text-sm mt-1">+1 (201) 531-2400</p>
        </div>
      </div>
    </section>
  )
}
