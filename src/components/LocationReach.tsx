import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const accessPoints = [
  'Direct NJ Transit bus service from Port Authority',
  '10-minute drive from MetLife Stadium',
  'I-95, Route 3, and NJ Turnpike direct access',
  'Free 3-story parking structure, 26,000+ spaces',
  'Future NRL direct rail connection planned',
]

const catchment = [
  { distance: '5 MI', desc: '~3 million people in immediate catchment' },
  { distance: '15 MI', desc: '~12 million — the full NJ/NYC metro belt' },
  { distance: '30 MI', desc: '~20 million — the full NYC tri-state reach' },
]

const cities = [
  { name: 'New York City', x: 72, y: 32, size: 5 },
  { name: 'Newark', x: 40, y: 55, size: 3.5 },
  { name: 'Jersey City', x: 62, y: 40, size: 3 },
  { name: 'Brooklyn', x: 80, y: 55, size: 3.5 },
]

const transit = [
  {
    label: 'Bus',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="14" rx="2" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <line x1="12" y1="3" x2="12" y2="10" />
        <circle cx="7" cy="20" r="1.5" />
        <circle cx="17" cy="20" r="1.5" />
        <line x1="7" y1="17" x2="7" y2="18.5" />
        <line x1="17" y1="17" x2="17" y2="18.5" />
      </svg>
    ),
  },
  {
    label: 'Highway',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20L8 4h8l4 16" />
        <line x1="12" y1="6" x2="12" y2="8" />
        <line x1="12" y1="11" x2="12" y2="13" />
        <line x1="12" y1="16" x2="12" y2="18" />
      </svg>
    ),
  },
  {
    label: 'Rail',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="16" rx="3" />
        <line x1="4" y1="10" x2="20" y2="10" />
        <line x1="12" y1="2" x2="12" y2="10" />
        <circle cx="8" cy="22" r="1" />
        <circle cx="16" cy="22" r="1" />
        <line x1="8" y1="18" x2="8" y2="21" />
        <line x1="16" y1="18" x2="16" y2="21" />
      </svg>
    ),
  },
  {
    label: '26K Parking',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
      </svg>
    ),
  },
]

export default function LocationReach() {
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

      // Rings animate in
      const rings = sectionRef.current?.querySelectorAll('[data-ring]')
      if (rings) {
        gsap.fromTo(
          rings,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            transformOrigin: 'center center',
            scrollTrigger: {
              trigger: rings[0],
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
      id="location"
      ref={sectionRef}
      data-theme="dark"
      className="w-full bg-black py-20 px-8 md:px-16"
    >
      <div className="flex flex-col md:flex-row gap-12 items-center max-w-[1400px] mx-auto">
        {/* Left column — content (42%) */}
        <div className="w-full md:w-[42%]">
          <span data-reveal className="font-bebas text-gold text-xs tracking-[0.3em] uppercase block mb-4">
            LOCATION &amp; REACH
          </span>
          <h2 data-reveal className="font-cormorant text-white text-[clamp(2.2rem,3vw,3.2rem)] leading-tight">
            20 Miles from Times Square.
            <br />
            20 Million People Within Reach.
          </h2>
          <div data-gold-rule className="w-12 h-px bg-gold mt-4 mb-8" />

          {/* Access points */}
          <ul className="flex flex-col gap-3 mb-8">
            {accessPoints.map((point) => (
              <li key={point} data-reveal className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
                <span className="font-inter text-white/70 text-sm">{point}</span>
              </li>
            ))}
          </ul>

          {/* Catchment breakdown */}
          <div className="flex flex-col gap-4 mb-8">
            {catchment.map((item) => (
              <div key={item.distance} data-reveal className="flex items-start gap-4">
                <div className="w-px min-h-[40px] bg-gold shrink-0 mt-1" />
                <div>
                  <span className="font-bebas text-white text-2xl leading-none block">{item.distance}</span>
                  <span className="font-inter text-white/60 text-xs mt-1 block">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <a
            href="#close"
            data-reveal
            className="inline-block border border-gold text-gold font-inter text-xs tracking-widest uppercase px-6 py-3 hover:bg-gold hover:text-black transition-all duration-300 cursor-pointer"
          >
            View Full Location Report
          </a>
        </div>

        {/* Right column — Map visualization (58%) */}
        <div className="w-full md:w-[58%] flex flex-col items-center">
          <div className="relative w-full max-w-[560px] aspect-square">
            {/* SVG rings + center */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              {/* Subtle grid lines for depth */}
              <line x1="50" y1="5" x2="50" y2="95" stroke="white" strokeWidth="0.08" opacity="0.1" />
              <line x1="5" y1="50" x2="95" y2="50" stroke="white" strokeWidth="0.08" opacity="0.1" />

              {/* Ring 3 — 30mi */}
              <circle
                data-ring
                cx="50" cy="50" r="44"
                fill="none" stroke="#C9A84C" strokeWidth="0.25"
                opacity="0.15"
                strokeDasharray="2 1.5"
              />
              {/* Ring 2 — 15mi */}
              <circle
                data-ring
                cx="50" cy="50" r="29"
                fill="none" stroke="#C9A84C" strokeWidth="0.25"
                opacity="0.3"
                strokeDasharray="2 1.5"
              />
              {/* Ring 1 — 5mi */}
              <circle
                data-ring
                cx="50" cy="50" r="14"
                fill="none" stroke="#C9A84C" strokeWidth="0.25"
                opacity="0.5"
              />

              {/* Radial fill for innermost ring */}
              <circle
                cx="50" cy="50" r="14"
                fill="#C9A84C" opacity="0.04"
              />

              {/* Connection lines from center to cities */}
              {cities.map((city) => (
                <line
                  key={`line-${city.name}`}
                  x1="50" y1="50"
                  x2={city.x} y2={city.y}
                  stroke="#C9A84C"
                  strokeWidth="0.15"
                  opacity="0.2"
                  strokeDasharray="1 1"
                />
              ))}

              {/* City dots */}
              {cities.map((city) => (
                <g key={city.name}>
                  {/* Glow */}
                  <circle
                    cx={city.x} cy={city.y}
                    r={city.size / 2 + 1}
                    fill="#C9A84C"
                    opacity="0.08"
                  />
                  <circle
                    cx={city.x} cy={city.y}
                    r={city.size / 2}
                    fill="#C9A84C"
                    opacity="0.7"
                  />
                  <text
                    x={city.x}
                    y={city.y - city.size / 2 - 2}
                    textAnchor="middle"
                    fill="white"
                    opacity="0.6"
                    fontSize="2.2"
                    fontFamily="Inter, sans-serif"
                    fontWeight="500"
                    letterSpacing="0.05em"
                  >
                    {city.name}
                  </text>
                </g>
              ))}

              {/* Center dot — American Dream */}
              <circle cx="50" cy="50" r="3" fill="#C9A84C" opacity="0.15" />
              <circle cx="50" cy="50" r="2.5" fill="#C9A84C" className="location-pulse" />
              <text
                x="50" y="45"
                textAnchor="middle"
                fill="#C9A84C"
                fontSize="2.5"
                fontFamily="Inter, sans-serif"
                fontWeight="700"
                letterSpacing="0.08em"
              >
                AMERICAN DREAM
              </text>

              {/* Ring distance labels — positioned along right side */}
              <text x="65" y="50.5" textAnchor="start" fill="white" opacity="0.3" fontSize="1.8" fontFamily="Inter, sans-serif">
                5 mi
              </text>
              <text x="80" y="50.5" textAnchor="start" fill="white" opacity="0.22" fontSize="1.8" fontFamily="Inter, sans-serif">
                15 mi
              </text>
              <text x="95" y="50.5" textAnchor="end" fill="white" opacity="0.15" fontSize="1.8" fontFamily="Inter, sans-serif">
                30 mi
              </text>
            </svg>
          </div>

          {/* Transit icons */}
          <div className="mt-4 flex gap-8 justify-center">
            {transit.map((t) => (
              <span key={t.label} className="font-inter text-white/40 text-xs tracking-widest flex items-center gap-2 uppercase">
                <span className="text-gold/60">{t.icon}</span>
                {t.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
