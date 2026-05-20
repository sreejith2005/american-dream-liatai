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
  { name: 'New York City', x: 78, y: 38, size: 6 },
  { name: 'Newark', x: 58, y: 52, size: 4 },
  { name: 'Jersey City', x: 65, y: 42, size: 3 },
  { name: 'Brooklyn', x: 82, y: 52, size: 4 },
]

const transit = [
  { icon: '🚌', label: 'Bus' },
  { icon: '🚗', label: 'Highway' },
  { icon: '🚆', label: 'Rail' },
  { icon: '🅿️', label: '26K Parking' },
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
      className="min-h-screen w-full bg-black py-24 px-8 md:px-16"
    >
      <div className="flex flex-col md:flex-row gap-16 items-start">
        {/* Left column — content (45%) */}
        <div className="w-full md:w-[45%]">
          <span data-reveal className="font-bebas text-gold text-xs tracking-[0.3em] uppercase block mb-4">
            LOCATION &amp; REACH
          </span>
          <h2 data-reveal className="font-cormorant text-white text-[clamp(2.5rem,3.5vw,3.5rem)] leading-tight">
            20 Miles from Times Square.
            <br />
            20 Million People Within Reach.
          </h2>
          <div data-gold-rule className="w-12 h-px bg-gold mt-4 mb-8" />

          {/* Access points */}
          <ul className="flex flex-col gap-3 mb-10">
            {accessPoints.map((point) => (
              <li key={point} data-reveal className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
                <span className="font-inter text-white/70 text-sm">{point}</span>
              </li>
            ))}
          </ul>

          {/* Catchment breakdown */}
          <div className="flex flex-col gap-4">
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
            className="mt-8 inline-block border border-gold text-gold font-inter text-xs tracking-widest uppercase px-6 py-3 hover:bg-gold hover:text-black transition-all duration-300 cursor-pointer"
          >
            View Full Location Report
          </a>
        </div>

        {/* Right column — Map visualization (55%) */}
        <div className="w-full md:w-[55%] flex flex-col items-center">
          <div className="relative w-full max-w-[500px] aspect-square">
            {/* Map base */}
            <div className="absolute inset-0 rounded-full bg-charcoal border border-white/5" />

            {/* SVG rings + center */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              {/* Ring 3 — 30mi */}
              <circle
                data-ring
                cx="50" cy="50" r="45"
                fill="none" stroke="#C9A84C" strokeWidth="0.3"
                opacity="0.2"
              />
              {/* Ring 2 — 15mi */}
              <circle
                data-ring
                cx="50" cy="50" r="30"
                fill="none" stroke="#C9A84C" strokeWidth="0.3"
                opacity="0.4"
              />
              {/* Ring 1 — 5mi */}
              <circle
                data-ring
                cx="50" cy="50" r="15"
                fill="none" stroke="#C9A84C" strokeWidth="0.3"
                opacity="0.6"
              />

              {/* City dots */}
              {cities.map((city) => (
                <g key={city.name}>
                  <circle
                    cx={city.x} cy={city.y}
                    r={city.size / 2}
                    fill="#C9A84C"
                    opacity="0.6"
                  />
                  <text
                    x={city.x}
                    y={city.y - city.size / 2 - 2}
                    textAnchor="middle"
                    fill="white"
                    opacity="0.5"
                    fontSize="2.5"
                    fontFamily="Inter, sans-serif"
                  >
                    {city.name}
                  </text>
                </g>
              ))}

              {/* Center dot — American Dream */}
              <circle cx="50" cy="50" r="2.5" fill="#C9A84C" className="location-pulse" />
              <text
                x="50" y="44"
                textAnchor="middle"
                fill="#C9A84C"
                fontSize="2.8"
                fontFamily="Inter, sans-serif"
                fontWeight="600"
              >
                AMERICAN DREAM
              </text>

              {/* Ring labels */}
              <text x="50" y="67" textAnchor="middle" fill="white" opacity="0.3" fontSize="2" fontFamily="Inter, sans-serif">
                5 mi · 3M people
              </text>
              <text x="50" y="82" textAnchor="middle" fill="white" opacity="0.25" fontSize="2" fontFamily="Inter, sans-serif">
                15 mi · 12M people
              </text>
              <text x="50" y="97" textAnchor="middle" fill="white" opacity="0.2" fontSize="2" fontFamily="Inter, sans-serif">
                30 mi · 20M people
              </text>
            </svg>
          </div>

          {/* Transit icons */}
          <div className="mt-6 flex gap-6 justify-center">
            {transit.map((t) => (
              <span key={t.label} className="font-inter text-white/50 text-xs tracking-widest flex items-center gap-1.5">
                <span>{t.icon}</span> {t.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
