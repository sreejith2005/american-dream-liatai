import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const statPills = [
  { value: '3M', label: 'SQ FT' },
  { value: '40M+', label: 'VISITORS' },
  { value: '20M', label: 'CATCHMENT' },
  { value: '3', label: 'THEME PARKS' },
]

const accessStats = [
  { number: '20 MIN', desc: 'From Midtown Manhattan' },
  { number: '30 MI', desc: 'Catchment radius, 20M+ people' },
  { number: '3', desc: 'Major highways direct access (I-95, I-3, NJ-3)' },
]

export default function PropertyOverview() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const heroImgRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      // Ken Burns on hero image
      if (heroImgRef.current) {
        gsap.fromTo(
          heroImgRef.current,
          { scale: 1.05 },
          {
            scale: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: heroImgRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        )
      }

      // Overlay text reveal
      const overlayEls = sectionRef.current?.querySelectorAll('[data-reveal]')
      if (overlayEls) {
        gsap.fromTo(
          overlayEls,
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

      // Part B columns stagger
      const cols = sectionRef.current?.querySelectorAll('[data-col]')
      if (cols) {
        gsap.fromTo(
          cols,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: cols[0],
              start: 'top 75%',
              once: true,
            },
          }
        )
      }

      // Gold rule
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
            stagger: 0.1,
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
      id="property"
      ref={sectionRef}
      data-theme="light"
      className="min-h-screen w-full bg-cream"
    >
      {/* Part A — Full-bleed aerial image */}
      <div className="relative w-full overflow-hidden" style={{ height: '60vh' }}>
        <div
          ref={heroImgRef}
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #2a1f0e 0%, #4a3520 30%, #1a2a3a 70%, #0d1520 100%)',
          }}
        />

        {/* Bottom-left overlay */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
        <div className="absolute bottom-8 left-8 z-20 max-w-lg" data-reveal>
          <span className="font-bebas text-gold text-xs tracking-[0.3em] uppercase block mb-3">
            THE PROPERTY
          </span>
          <h2 className="font-cormorant text-white text-[clamp(2rem,3.5vw,3.5rem)] leading-tight">
            3 Million Square Feet.
            <br />
            Zero Comparable Properties.
          </h2>
          <div data-gold-rule className="w-12 h-px bg-gold mt-4" />
        </div>

        {/* Bottom-right stat pills */}
        <div className="absolute bottom-8 right-8 z-20 flex gap-3" data-reveal>
          {statPills.map((s) => (
            <div
              key={s.label}
              className="bg-black/70 backdrop-blur-sm px-4 py-2 flex flex-col items-center"
            >
              <span className="font-bebas text-white text-lg leading-none">{s.value}</span>
              <span className="font-inter text-white/60 text-[10px] tracking-wider uppercase mt-0.5">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Part B — Three-column feature grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-8 md:px-16 py-20">
        {/* Left col: Location */}
        <div data-col className="flex flex-col">
          <span className="font-bebas text-gold text-xs tracking-[0.3em] uppercase mb-2">
            LOCATION
          </span>
          <h3 className="font-cormorant text-charcoal text-2xl mb-3">East Rutherford, NJ</h3>
          <p className="font-inter text-charcoal/70 text-sm leading-relaxed">
            20 miles from Times Square. Served by NJ Transit, direct bus, and
            major highway access. Within 30 miles: 20 million people.
            No other entertainment destination sits at this intersection.
          </p>
        </div>

        {/* Center col: Access stats */}
        <div data-col className="flex flex-col gap-6">
          {accessStats.map((item) => (
            <div key={item.number} className="flex items-start gap-4">
              <div className="w-px h-8 bg-gold shrink-0 mt-1" />
              <div>
                <span className="font-bebas text-charcoal text-2xl leading-none block">
                  {item.number}
                </span>
                <span className="font-inter text-charcoal/60 text-xs mt-1 block">
                  {item.desc}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right col: Differentiator callout */}
        <div data-col className="bg-charcoal text-white p-8 flex flex-col justify-between">
          <div>
            <span className="font-bebas text-gold text-xs tracking-[0.3em] uppercase block mb-3">
              THE OPPORTUNITY
            </span>
            <h3 className="font-cormorant italic text-white text-xl leading-snug">
              The only mall in North America where skiing, surfing, and
              a roller coaster exist under the same roof.
            </h3>
          </div>
          <a
            href="#close"
            className="mt-8 inline-block border border-gold text-gold font-inter text-xs tracking-widest uppercase px-6 py-3 w-fit hover:bg-gold hover:text-black transition-all duration-300 cursor-pointer"
          >
            View Full Property Details
          </a>
        </div>
      </div>
    </section>
  )
}
