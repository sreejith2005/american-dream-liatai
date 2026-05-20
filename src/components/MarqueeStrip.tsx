import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const items = [
  '3 THEME PARKS',
  '100+ DINING OPTIONS',
  'NHL ICE RINK',
  'INDOOR SKI SLOPE',
  'PERFORMING ARTS CENTER',
  'LUXURY FLAGSHIP STORES',
  'DREAMWORKS WATER PARK',
  'NICKELODEON UNIVERSE',
]

export default function MarqueeStrip() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const firstSet = track.querySelector('[data-marquee-set]') as HTMLElement
    if (!firstSet) return

    const totalWidth = firstSet.offsetWidth

    gsap.to(track, {
      x: -totalWidth,
      duration: totalWidth / 50,
      ease: 'none',
      repeat: -1,
    })
  }, [])

  const renderItems = () =>
    items.map((item, i) => (
      <span key={i} className="flex items-center shrink-0 gap-6">
        <span className="font-bebas text-[16px] text-white/25 tracking-[0.1em] whitespace-nowrap">
          {item}
        </span>
        <span className="text-gold/30 text-[8px]">◆</span>
      </span>
    ))

  return (
    <div className="w-full overflow-hidden h-full flex items-center">
      <div ref={trackRef} className="flex gap-6 w-max">
        <div data-marquee-set className="flex gap-6">
          {renderItems()}
        </div>
        <div className="flex gap-6">
          {renderItems()}
        </div>
        <div className="flex gap-6">
          {renderItems()}
        </div>
      </div>
    </div>
  )
}
