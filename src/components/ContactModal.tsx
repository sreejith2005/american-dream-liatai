import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  inquiryType: string
}

export default function ContactModal({ isOpen, onClose, inquiryType }: ContactModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="relative bg-[#0D0D0D] border border-[#C9A84C]/30 w-full max-w-lg p-10 z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h2 className="font-cormorant text-white text-4xl mb-2">Get in Touch</h2>
            <p className="font-inter text-white/60 text-xs mb-8 uppercase tracking-widest text-[#C9A84C]">
              Inquiry: {inquiryType || 'General'}
            </p>
            <div className="flex flex-col gap-6">
              <input 
                type="text" 
                placeholder="Name" 
                className="bg-transparent border-b border-[#C9A84C]/30 text-white w-full py-3 outline-none font-inter focus:border-[#C9A84C] transition-colors" 
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="bg-transparent border-b border-[#C9A84C]/30 text-white w-full py-3 outline-none font-inter focus:border-[#C9A84C] transition-colors" 
              />
              <textarea 
                placeholder="Message" 
                rows={4} 
                className="bg-transparent border-b border-[#C9A84C]/30 text-white w-full py-3 outline-none font-inter resize-none focus:border-[#C9A84C] transition-colors" 
              />
              <button 
                className="w-full bg-[#C9A84C] text-[#000000] font-bebas tracking-widest text-xl py-4 mt-6 hover:bg-white transition-colors duration-300"
                onClick={onClose}
              >
                SEND MESSAGE
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
