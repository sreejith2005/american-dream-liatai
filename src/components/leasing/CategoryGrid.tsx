import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LEASING_CATEGORIES, LEASING_SPACES } from '../../data/leasingData'
import type { CategoryType, LeasingSpace } from '../../data/leasingData'

interface CategoryGridProps {
  onSelectSpace: (space: LeasingSpace) => void
}

export default function CategoryGrid({ onSelectSpace }: CategoryGridProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('ALL')

  const filteredSpaces = LEASING_SPACES.filter(space => 
    activeCategory === 'ALL' ? true : space.category === activeCategory
  )

  return (
    <section className="w-full bg-[#F7F4EE] py-20 px-8 md:px-16 min-h-screen">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
        {LEASING_CATEGORIES.map(category => {
          const isActive = category === activeCategory
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-bebas text-lg tracking-widest transition-colors duration-300 ${
                isActive
                  ? 'bg-[#C9A84C] text-[#000000]'
                  : 'bg-transparent border border-[#C9A84C] text-[#0D0D0D] hover:bg-[#C9A84C]/10'
              }`}
            >
              {category}
            </button>
          )
        })}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredSpaces.map((space) => (
            <motion.div
              layout
              key={space.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative overflow-hidden cursor-pointer group"
              onClick={() => onSelectSpace(space)}
            >
              <div className="relative h-[280px] overflow-hidden">
                <motion.img
                  src={space.imagePath}
                  alt={space.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex flex-col justify-end p-6">
                  <h3 className="font-cormorant text-white text-3xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {space.name}
                  </h3>
                  <span className="font-inter text-[#C9A84C] text-xs tracking-widest uppercase flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    VIEW DETAILS →
                  </span>
                  
                  {/* Gold border bottom rule */}
                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#C9A84C] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
