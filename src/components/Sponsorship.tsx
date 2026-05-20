import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const audienceStats = [
  { value: '40M+', label: 'Annual Visitors' },
  { value: '68%', label: 'Aged 18–45 (prime spending demographic)' },
  { value: '$95K', label: 'Average Household Income' },
  { value: '4.2 hrs', label: 'Average Dwell Time' },
]

const tiers = [
  {
    icon: '★★★',
    name: 'PRESENTING PARTNER',
    features: [
      'Naming rights to a major attraction',
      'Exclusive activation zones across property',
      'Digital display domination (200+ screens)',
      'Co-branded event programming',
      'Dedicated concierge partnership team',
    ],
  },
  {
    icon: '★★',
    name: 'SIGNATURE PARTNER',
    features: [
      'Branded activation space (5,000+ sq ft)',
      'Seasonal campaign integration',
      'Event co-sponsorship rights',
      'Digital and physical brand placement',
    ],
  },
  {
    icon: '★',
    name: 'EVENT PARTNER',
    features: [
      'Single-event brand activation',
      'Product sampling and launch support',
      'Social and digital amplification',
    ],
  },
]


export default function Sponsorship() {
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

      const rules = sectionRef.current?.querySelectorAll('[data-gold-rule]')
      if (rules) {
        gsap.fromTo(
          rules,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: 'left',
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
      id="sponsorship"
      ref={sectionRef}
      data-theme="light"
      className="min-h-screen w-full bg-cream py-24 px-8 md:px-16"
    >
      {/* Header */}
      <div className="max-w-xl">
        <span data-reveal className="font-bebas text-gold text-xs tracking-[0.3em] uppercase block mb-4">
          SPONSORSHIP &amp; PARTNERSHIPS
        </span>
        <h2 data-reveal className="font-cormorant text-charcoal text-[clamp(2.5rem,3.5vw,3.5rem)] leading-tight">
          Reach 40 Million People.
          <br />
          One Partnership.
        </h2>
        <div data-gold-rule className="w-12 h-px bg-gold mt-4 mb-4" />
        <p data-reveal className="font-inter text-charcoal/60 text-sm leading-relaxed mt-4">
          American Dream delivers what no media buy can — a captive,
          experiential audience actively choosing to be here.
          Sponsorship here is presence, not advertising.
        </p>
      </div>

      {/* Audience demographics */}
      <div data-reveal className="mt-16 border-t border-b border-charcoal/10 py-10 flex flex-wrap items-center gap-0">
        {audienceStats.map((stat, i) => (
          <div key={stat.label} className="flex items-center">
            <div className="flex flex-col px-6 md:px-8">
              <span className="font-bebas text-charcoal text-3xl md:text-4xl leading-none">{stat.value}</span>
              <span className="font-inter text-charcoal/60 text-xs mt-1 max-w-[160px]">{stat.label}</span>
            </div>
            {i < audienceStats.length - 1 && (
              <div className="w-px h-12 bg-charcoal/10 shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Partnership tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            data-card
            className="bg-white border border-charcoal/10 p-8 hover:border-gold transition-all duration-300 flex flex-col"
          >
            <span className="text-gold text-2xl mb-3">{tier.icon}</span>
            <h3 className="font-bebas text-charcoal text-[1.5rem] tracking-wider">{tier.name}</h3>
            <ul className="mt-4 flex flex-col gap-2 flex-1">
              {tier.features.map((f) => (
                <li key={f} className="font-inter text-charcoal/70 text-sm flex items-start gap-2">
                  <span className="text-gold mt-0.5 shrink-0">·</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#close"
              className="mt-6 block text-center border border-gold text-gold font-inter text-xs tracking-widest uppercase px-6 py-3 hover:bg-gold hover:text-black transition-all duration-300 cursor-pointer"
            >
              Inquire
            </a>
          </div>
        ))}
      </div>


      {/* Bottom CTA */}
      <div className="mt-16 text-center">
        <p className="font-inter text-charcoal/60 text-sm">
          Ready to put your brand inside 40 million experiences?
        </p>
        <a
          href="#close"
          className="mt-4 inline-block bg-gold text-black font-inter text-xs tracking-widest uppercase px-8 py-4 hover:bg-gold/90 transition-all duration-300 cursor-pointer"
        >
          Start a Sponsorship Conversation
        </a>
      </div>
    </section>
  )
}
