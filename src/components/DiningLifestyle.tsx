import { useRef, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { lenisInstance } from '../main'

const diningCategories = [
  { label: 'FINE DINING', name: 'Signature Restaurant Row', body: 'Full-service, reservation-driven dining.' },
  { label: 'FOOD HALL', name: 'The American Dream Food Hall', body: '40+ global cuisine vendors.' },
  { label: 'LIFESTYLE', name: 'Rooftop & Bar Experiences', body: 'Elevated bars and experiential dining.' },
]

const diningStats = [
  { value: '100+', label: 'Dining Options' },
  { value: '40+', label: 'Food Hall Vendors' },
  { value: '$2B+', label: 'Annual F&B Revenue' },
]

const liveCategories = [
  { label: 'CONCERTS', name: 'World-Class Live Performances', body: 'Headline acts in a 15,000-seat venue.' },
  { label: 'FASHION SHOWS', name: 'Runway at the Dream', body: 'High-fashion events with millions watching.' },
  { label: 'FILM PREMIERES', name: 'Red Carpet Experiences', body: 'Premiere screenings and celebrity activations.' },
]

const liveStats = [
  { value: '15K', label: 'Seat Capacity' },
  { value: '365', label: 'Days of Programming' },
  { value: '40M+', label: 'Annual Audience' },
]

export default function DiningLifestyle() {
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
      id="dining"
      ref={sectionRef}
      data-theme="light"
      className="w-full bg-cream"
    >
      {/* ── Part 1: Dining & Lifestyle ── */}
      <div className="flex flex-col md:flex-row md:items-stretch">
        {/* Left — Image */}
        <div className="w-full md:w-[55%] p-5">
          <div className="relative w-full h-full min-h-[480px] overflow-hidden">
            <img
              src="/assets/Photorealistic-Renders/5.png"
              alt="The American Dream Food Experience"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: 'center 70%' }}
            />
            <div className="absolute bottom-4 left-4 z-10">
              <span className="font-inter text-gold text-[10px] tracking-[0.2em] uppercase bg-black/50 backdrop-blur-sm px-3 py-1.5">
                The American Dream Food Experience
              </span>
            </div>
          </div>
        </div>

        {/* Right — Content */}
        <div className="w-full md:w-[45%] flex flex-col justify-center pl-8 md:pl-14 pr-8 py-12">
          <span data-reveal className="font-bebas text-gold text-xs tracking-[0.3em] uppercase block mb-2">
            DINING &amp; LIFESTYLE
          </span>
          <h2 data-reveal className="font-cormorant text-charcoal text-[clamp(2rem,3vw,3rem)] leading-tight">
            100+ Dining Options.
            <br />
            Zero Excuses to Leave.
          </h2>
          <div data-gold-rule className="w-12 h-px bg-gold mt-4 mb-5" />
          <p data-reveal className="font-inter text-charcoal/70 text-sm leading-relaxed max-w-xs">
            Visitors don't just eat — they stay, spend, and return.
          </p>

          {/* Categories */}
          <div className="mt-6 flex flex-col gap-4">
            {diningCategories.map((cat) => (
              <div key={cat.label} data-reveal className="flex items-start gap-4">
                <div className="w-px min-h-[36px] bg-gold shrink-0 mt-1" />
                <div>
                  <span className="font-bebas text-gold text-sm tracking-[0.2em] block">{cat.label}</span>
                  <h4 className="font-cormorant text-charcoal text-lg leading-snug">{cat.name}</h4>
                  <p className="font-inter text-charcoal/60 text-xs mt-0.5">{cat.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div data-reveal className="mt-6 flex flex-col sm:flex-row gap-y-4 gap-x-8">
            {diningStats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="font-bebas text-charcoal text-3xl leading-none">{s.value}</span>
                <span className="font-inter text-charcoal/60 text-xs mt-1">{s.label}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => lenisInstance?.scrollTo('#close', { duration: 1.2, easing: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2 })}
            data-reveal
            className="mt-5 inline-block border border-gold text-gold font-inter text-xs tracking-widest uppercase px-6 py-2.5 w-fit hover:bg-gold hover:text-black transition-all duration-300 cursor-pointer"
          >
            Explore F&amp;B Leasing Opportunities
          </button>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="flex items-center justify-center py-6 px-16">
        <div className="flex-1 h-px bg-charcoal/10" />
        <span className="font-inter text-charcoal/30 text-[10px] tracking-[0.3em] uppercase px-6">
          &amp;
        </span>
        <div className="flex-1 h-px bg-charcoal/10" />
      </div>

      {/* ── Part 2: Dream Live Centre ── */}
      <div className="flex flex-col-reverse md:flex-row md:items-stretch">
        {/* Left — Content */}
        <div className="w-full md:w-[45%] flex flex-col justify-center pr-8 md:pr-14 pl-8 py-12">
          <span data-reveal className="font-bebas text-gold text-xs tracking-[0.3em] uppercase block mb-2">
            DREAM LIVE CENTRE
          </span>
          <h2 data-reveal className="font-cormorant text-charcoal text-[clamp(2rem,3vw,3rem)] leading-tight">
            15,000 Seats.
            <br />
            One Unforgettable Stage.
          </h2>
          <div data-gold-rule className="w-12 h-px bg-gold mt-4 mb-5" />
          <p data-reveal className="font-inter text-charcoal/70 text-sm leading-relaxed max-w-xs">
            A world-class venue for concerts, fashion runways, and premieres — with 40M visitors already in the building.
          </p>

          {/* Categories */}
          <div className="mt-6 flex flex-col gap-4">
            {liveCategories.map((cat) => (
              <div key={cat.label} data-reveal className="flex items-start gap-4">
                <div className="w-px min-h-[36px] bg-gold shrink-0 mt-1" />
                <div>
                  <span className="font-bebas text-gold text-sm tracking-[0.2em] block">{cat.label}</span>
                  <h4 className="font-cormorant text-charcoal text-lg leading-snug">{cat.name}</h4>
                  <p className="font-inter text-charcoal/60 text-xs mt-0.5">{cat.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div data-reveal className="mt-6 flex flex-col sm:flex-row gap-y-4 gap-x-8">
            {liveStats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="font-bebas text-charcoal text-3xl leading-none">{s.value}</span>
                <span className="font-inter text-charcoal/60 text-xs mt-1">{s.label}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => lenisInstance?.scrollTo('#close', { duration: 1.2, easing: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2 })}
            data-reveal
            className="mt-5 inline-block border border-gold text-gold font-inter text-xs tracking-widest uppercase px-6 py-2.5 w-fit hover:bg-gold hover:text-black transition-all duration-300 cursor-pointer"
          >
            Book the Dream Live Centre
          </button>
        </div>

        {/* Right — Image */}
        <div className="w-full md:w-[55%] p-5">
          <div className="relative w-full h-full min-h-[480px] overflow-hidden">
            <img
              src="/assets/Photorealistic-Renders/13.webp"
              alt="Dream Live Centre — Performing Arts and Concerts"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-4 right-4 z-10">
              <span className="font-inter text-gold text-[10px] tracking-[0.2em] uppercase bg-black/50 backdrop-blur-sm px-3 py-1.5">
                Dream Live Centre
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
