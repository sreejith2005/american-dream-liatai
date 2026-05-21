import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useModal } from '../App'

const eventTags = [
  'CONCERTS',
  'BRAND ACTIVATIONS',
  'PRODUCT LAUNCHES',
  'CORPORATE RETREATS',
  'FASHION SHOWS',
  'FILM PREMIERES',
]

const marqueeText =
  'CELEBRITY APPEARANCES · BRAND LAUNCHES · LIVE CONCERTS · FASHION EVENTS · CORPORATE SUMMITS · WORLD PREMIERES · '

export default function EventsVenues() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const openModal = useModal()

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
      id="events"
      ref={sectionRef}
      data-theme="dark"
      className="min-h-screen w-full bg-black py-24 px-8 md:px-16"
    >
      {/* Header */}
      <div className="max-w-2xl">
        <span data-reveal className="font-bebas text-gold text-xs tracking-[0.3em] uppercase block mb-4">
          EVENTS &amp; PLATFORM
        </span>
        <h2 data-reveal className="font-cormorant text-white text-[clamp(2.5rem,4vw,4rem)] leading-tight">
          The Stage the World Didn't Know It Was Missing.
        </h2>
        <p data-reveal className="font-inter text-white/60 text-sm leading-relaxed max-w-lg mt-4">
          15,000-seat LITEPAC performing arts center. 1M+ sq ft exposition
          space. A captive audience of 40 million annual visitors.
          American Dream is not a venue — it's a platform.
        </p>
      </div>

      {/* Venue cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        {/* Card 1 — LITEPAC */}
        <div
          data-card
          className="relative overflow-hidden cursor-pointer group"
          style={{ height: 500 }}
        >
          <img
            src="/assets/Photorealistic-Renders/13.png"
            alt="LITEPAC Performing Arts Center"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />


          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            <span className="font-bebas text-gold text-xs tracking-[0.3em] uppercase block mb-2">
              LITEPAC
            </span>
            <h3 className="font-cormorant text-white text-[1.8rem] leading-snug mb-3">
              Performing Arts Center
            </h3>
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <span className="font-inter text-white/60 text-xs">
                <span className="font-bebas text-white text-sm">15,000</span> seats
              </span>
              <span className="w-px h-3 bg-white/20" />
              <span className="font-inter text-white/60 text-xs">World-class acoustics</span>
              <span className="w-px h-3 bg-white/20" />
              <span className="font-inter text-white/60 text-xs">Year-round programming</span>
            </div>
            <span onClick={() => openModal('events')} className="font-inter text-gold text-xs tracking-widest uppercase hover:text-white transition-colors duration-300 cursor-pointer">
              Book LITEPAC →
            </span>
          </div>
        </div>

        {/* Card 2 — EXPO */}
        <div
          data-card
          className="relative overflow-hidden cursor-pointer group"
          style={{ height: 500 }}
        >
          <img
            src="/assets/Photorealistic-Renders/14.png"
            alt="Exposition and Convention Hall"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />


          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            <span className="font-bebas text-gold text-xs tracking-[0.3em] uppercase block mb-2">
              EXPO CENTER
            </span>
            <h3 className="font-cormorant text-white text-[1.8rem] leading-snug mb-3">
              Exposition &amp; Convention Hall
            </h3>
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <span className="font-inter text-white/60 text-xs">
                <span className="font-bebas text-white text-sm">1M+ sq ft</span>
              </span>
              <span className="w-px h-3 bg-white/20" />
              <span className="font-inter text-white/60 text-xs">Corporate events</span>
              <span className="w-px h-3 bg-white/20" />
              <span className="font-inter text-white/60 text-xs">Product launches</span>
            </div>
            <span onClick={() => openModal('events')} className="font-inter text-gold text-xs tracking-widest uppercase hover:text-white transition-colors duration-300 cursor-pointer">
              View Expo Availability →
            </span>
          </div>
        </div>
      </div>

      {/* Event type tags */}
      <div className="mt-16 flex flex-wrap gap-3">
        {eventTags.map((tag) => (
          <span
            key={tag}
            className="border border-white/20 px-4 py-2 text-white/60 font-inter text-xs tracking-widest uppercase rounded-full hover:border-gold hover:text-gold transition-all duration-300 cursor-pointer"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Past events marquee — pure CSS */}
      <div className="mt-12 overflow-hidden">
        <div className="events-marquee-track">
          <span className="font-bebas text-gold/40 text-2xl tracking-widest whitespace-nowrap">
            {marqueeText}{marqueeText}{marqueeText}
          </span>
        </div>
      </div>

      {/* Bottom CTA bar */}
      <div className="mt-20 border-t border-white/10 pt-12 text-center">
        <h3 className="font-cormorant text-white text-[2rem]">Your next event belongs here.</h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <button
            onClick={() => openModal('events')}
            className="bg-gold text-black font-inter text-xs tracking-widest uppercase px-6 py-3 hover:bg-gold/90 transition-all duration-300 cursor-pointer"
          >
            Talk to Our Events Team
          </button>
          <button
            onClick={() => openModal('events')}
            className="border border-gold text-gold font-inter text-xs tracking-widest uppercase px-6 py-3 hover:bg-gold hover:text-black transition-all duration-300 cursor-pointer"
          >
            View Full Calendar
          </button>
        </div>
      </div>
    </section>
  )
}
