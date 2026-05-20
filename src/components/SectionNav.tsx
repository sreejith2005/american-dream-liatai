import { useEffect, useRef, useState } from 'react'

const SECTIONS = [
  { id: 'hero', label: 'Hero' },
  { id: 'stats', label: 'Stats' },
  { id: 'parallax-world', label: 'Experience' },
  { id: 'property', label: 'Property' },
  { id: 'retail', label: 'Retail' },
  { id: 'dining', label: 'Dining' },
  { id: 'events', label: 'Events' },
  { id: 'sponsorship', label: 'Sponsorship' },
  { id: 'location', label: 'Location' },
  { id: 'close', label: 'Contact' },
]

export default function SectionNav() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sectionEls = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = SECTIONS.findIndex((s) => s.id === entry.target.id)
            if (idx !== -1) {
              setActiveIndex(idx)
              const t = entry.target.getAttribute('data-theme')
              setTheme(t === 'light' ? 'light' : 'dark')
            }
          }
        })
      },
      { threshold: 0.4 }
    )

    sectionEls.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const dotColor = theme === 'light' ? '#0D0D0D' : '#FFFFFF'
  const goldColor = '#C9A84C'

  return (
    <nav
      ref={navRef}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-4"
    >
      {SECTIONS.map((section, i) => {
        const isActive = i === activeIndex
        return (
          <button
            key={section.id}
            onClick={() => handleClick(section.id)}
            className="group relative flex items-center gap-3 cursor-pointer"
            aria-label={`Go to ${section.label}`}
          >
            {/* Label pill on hover */}
            <span
              className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-inter text-xs tracking-widest uppercase px-3 py-1 rounded-full whitespace-nowrap"
              style={{
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: '#FFFFFF',
              }}
            >
              {section.label}
            </span>

            {/* Dot */}
            <span
              className="block rounded-full shrink-0 transition-all duration-300"
              style={{
                width: isActive ? 10 : 6,
                height: isActive ? 10 : 6,
                backgroundColor: isActive ? goldColor : 'transparent',
                border: isActive ? `2px solid ${goldColor}` : `1.5px solid ${dotColor}`,
                opacity: isActive ? 1 : 0.4,
              }}
            />
          </button>
        )
      })}
    </nav>
  )
}
