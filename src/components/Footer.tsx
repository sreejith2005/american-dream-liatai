const linkColumns = [
  {
    title: 'Explore',
    links: ['Retail', 'Dining', 'Entertainment', 'Events'],
  },
  {
    title: 'Partner',
    links: ['Leasing', 'Sponsorship', 'Venues', 'Contact'],
  },
  {
    title: 'Connect',
    links: ['americandream.com', 'Instagram', 'LinkedIn'],
  },
]

export default function Footer() {
  return (
    <footer className="w-full bg-charcoal py-16 px-8 md:px-12">
      {/* Top row */}
      <div className="flex flex-col md:flex-row justify-between border-b border-white/10 pb-10 gap-10">
        {/* Left — Brand */}
        <div>
          <span className="font-bebas text-white text-2xl tracking-[0.3em] block">
            AMERICAN DREAM
          </span>
          <span className="font-inter text-white/40 text-xs mt-1 block">
            East Rutherford, NJ
          </span>
        </div>

        {/* Right — Link columns */}
        <div className="flex gap-16">
          {linkColumns.map((col) => (
            <div key={col.title} className="flex flex-col gap-2">
              <span className="font-inter text-white/60 text-xs tracking-widest uppercase mb-2">
                {col.title}
              </span>
              {col.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-inter text-white/40 text-xs hover:text-white/80 transition-colors duration-300 cursor-pointer"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Middle — Massive display text */}
      <div className="py-10 border-b border-white/10 text-center overflow-hidden">
        <span
          className="font-bebas text-white/10 tracking-widest leading-none block"
          style={{ fontSize: 'clamp(6rem, 15vw, 14rem)' }}
        >
          AMERICAN DREAM
        </span>
      </div>

      {/* Bottom row */}
      <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-inter text-white/30 text-xs">
          © 2024 American Dream Meadowlands. All rights reserved.
        </span>
        <span className="font-inter text-white/30 text-xs">
          Built for LIAT.AI Screening
        </span>
      </div>
    </footer>
  )
}
