import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function LeasingHero() {
  const navigate = useNavigate()

  return (
    <section className="relative w-full h-[50vh] bg-[#000000] flex flex-col items-center justify-center pt-20 px-8">
      {/* Back Navigation */}
      <button
        onClick={() => navigate('/#retail')}
        className="absolute top-8 left-8 md:top-12 md:left-12 font-inter text-[#C9A84C] text-xs tracking-widest uppercase hover:text-white transition-colors duration-300 z-10"
      >
        ← AMERICAN DREAM
      </button>

      {/* Center Content */}
      <div className="text-center max-w-4xl z-10 flex flex-col items-center">
        <span className="font-inter text-[#C9A84C] text-sm tracking-[0.3em] uppercase block mb-6">
          RETAIL & LEASING
        </span>
        <h1 className="font-cormorant text-white text-4xl md:text-6xl leading-tight mb-8">
          Find your space inside the world's most visited destination.
        </h1>
        
        {/* Animated Gold Rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="w-24 h-px bg-[#C9A84C] origin-center"
        />
      </div>
    </section>
  )
}
