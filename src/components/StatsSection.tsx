import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MarqueeStrip from './MarqueeStrip'
import { startPreload } from '../hooks/useImagePreloader'

interface StatBlock {
  label: string
  number: string
  numericEnd: number
  suffix: string
  decimals: number
  context: string
}

const stats: StatBlock[] = [
  {
    label: 'ANNUAL VISITORS',
    number: '40M+',
    numericEnd: 40,
    suffix: 'M+',
    decimals: 0,
    context: 'More than Disneyland & Universal combined',
  },
  {
    label: 'PROPERTY SIZE',
    number: '3.3M',
    numericEnd: 3.3,
    suffix: 'M',
    decimals: 1,
    context: 'Square feet of curated experience',
  },
  {
    label: 'METRO CATCHMENT',
    number: '20M',
    numericEnd: 20,
    suffix: 'M',
    decimals: 0,
    context: 'People within 30 miles',
  },
  {
    label: 'ENTERTAINMENT',
    number: '55%',
    numericEnd: 55,
    suffix: '%',
    decimals: 0,
    context: 'Of total space — unmatched in retail',
  },
]

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([])
  const borderRefs = useRef<(HTMLDivElement | null)[]>([])

  // Begin frame preloading when Stats section becomes 10% visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startPreload()
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    const el = document.getElementById('stats-section')
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Left column clip-path reveal
    if (leftColRef.current) {
      const leftEls = leftColRef.current.querySelectorAll('[data-reveal]')
      gsap.fromTo(
        leftEls,
        { clipPath: 'inset(0 0 100% 0)', opacity: 0, y: 30 },
        {
          clipPath: 'inset(0 0 0% 0)',
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    // Stat number count-up + border reveal
    numberRefs.current.forEach((el, i) => {
      if (!el) return
      const stat = stats[i]
      const obj = { val: 0 }

      gsap.to(obj, {
        val: stat.numericEnd,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          el.textContent = obj.val.toFixed(stat.decimals) + stat.suffix
        },
      })
    })

    // Gold left-border height animation
    borderRefs.current.forEach((el) => {
      if (!el) return
      gsap.fromTo(
        el,
        { height: '0%' },
        {
          height: '100%',
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
  }, { scope: sectionRef })

  return (
    <section
      id="stats-section"
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col"
      style={{ background: '#0A0A0A' }}
    >
      {/* Main two-column content */}
      <div className="flex-1 flex items-center px-16">
        {/* Left column */}
        <div ref={leftColRef} className="w-1/2 flex flex-col justify-center pr-16">
          <span
            data-reveal
            className="font-inter text-gold text-[11px] tracking-[0.25em] uppercase mb-8"
          >
            BY THE NUMBERS
          </span>

          <div data-reveal>
            <h2 className="font-cormorant text-white text-[64px] leading-[1.05]">
              A destination that
            </h2>
            <h2 className="font-cormorant text-white text-[64px] leading-[1.05]">
              operates at
            </h2>
            <h2 className="font-cormorant italic text-gold text-[64px] leading-[1.05]">
              a different scale.
            </h2>
          </div>

          <div data-reveal className="w-[60px] h-px bg-gold mt-10 mb-6" />

          <p
            data-reveal
            className="font-inter text-white/60 text-[14px] leading-relaxed max-w-[380px]"
          >
            The numbers behind America's most ambitious
            retail and entertainment destination.
          </p>
        </div>

        {/* Right column — 2x2 stat grid */}
        <div className="w-1/2 grid grid-cols-2 gap-x-12 gap-y-14">
          {stats.map((stat, i) => (
            <div key={stat.label} className="relative pl-6">
              {/* Animated gold left border */}
              <div
                ref={(el) => { borderRefs.current[i] = el }}
                className="absolute left-0 top-0 w-px bg-gold"
                style={{ height: '0%' }}
              />

              <span className="font-inter text-gold text-[10px] tracking-[0.2em] uppercase block mb-3">
                {stat.label}
              </span>

              <span
                ref={(el) => { numberRefs.current[i] = el }}
                className="font-bebas text-white text-[96px] leading-none block"
              >
                0{stat.suffix}
              </span>

              <p className="font-cormorant italic text-white/50 text-[16px] mt-2">
                {stat.context}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom marquee ticker */}
      <div
        className="w-full shrink-0"
        style={{
          height: 48,
          borderTop: '1px solid rgba(201,168,76,0.2)',
        }}
      >
        <MarqueeStrip />
      </div>

      {/* Transition line */}
      <div className="relative w-full shrink-0 flex items-center justify-center py-6">
        <div className="absolute inset-x-0 top-0 h-px bg-gold/40" />
        <span className="font-inter text-gold text-[10px] tracking-[0.3em] uppercase flex items-center gap-3">
          <span>↓</span>
          EXPLORE THE WORLD BELOW
          <span>↓</span>
        </span>
      </div>
    </section>
  )
}
