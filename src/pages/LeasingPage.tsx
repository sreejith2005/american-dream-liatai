import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import LeasingHero from '../components/leasing/LeasingHero'
import CategoryGrid from '../components/leasing/CategoryGrid'
import LeasingPanel from '../components/leasing/LeasingPanel'
import type { LeasingSpace } from '../data/leasingData'

export default function LeasingPage() {
  const [selectedSpace, setSelectedSpace] = useState<LeasingSpace | null>(null)

  // Form State
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [spaceType, setSpaceType] = useState('Luxury Flagship')
  const [message, setMessage] = useState('')

  const [isSuccess, setIsSuccess] = useState(false)

  // Validation shake animation controls
  const [shakeName, setShakeName] = useState(false)
  const [shakeEmail, setShakeEmail] = useState(false)

  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const ruleRef = useRef(null)
  const isRuleInView = useInView(ruleRef, { once: true, margin: "-100px" })

  const handleSubmit = () => {
    let valid = true
    if (!name.trim()) {
      setShakeName(true)
      setTimeout(() => setShakeName(false), 400)
      valid = false
    }
    if (!email.trim()) {
      setShakeEmail(true)
      setTimeout(() => setShakeEmail(false), 400)
      valid = false
    }

    if (valid) {
      setIsSuccess(true)
    }
  }

  const inputClasses = "bg-transparent border-b border-[#C9A84C]/30 text-white text-base w-full py-3 outline-none font-inter"

  return (
    <main className="w-full bg-[#000000] min-h-screen">
      <LeasingHero />
      <CategoryGrid onSelectSpace={setSelectedSpace} />

      {/* Enquiry Form Section */}
      <div id="leasing-contact" className="bg-[#000000] py-24 px-6 md:px-8 max-w-2xl mx-auto">
        {/* Horizontal Rule */}
        <motion.div
          ref={ruleRef}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isRuleInView ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full h-px bg-[#C9A84C] origin-left mb-16"
        />

        <div className="text-center mb-12">
          <span className="font-inter text-[#C9A84C] tracking-widest uppercase text-sm mb-4 block">
            GET IN TOUCH
          </span>
          <h2 className="font-cormorant text-white text-3xl md:text-5xl mb-4">
            Ready to find your space at American Dream?
          </h2>
          <p className="font-inter text-white/60 text-base">
            Our leasing team responds within 24 hours. Tell us what you're looking for.
          </p>
        </div>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-6">
              <circle cx="32" cy="32" r="31" stroke="#C9A84C" strokeWidth="2" />
              <path d="M20 32L28 40L44 24" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3 className="font-cormorant text-white text-3xl text-center">
              Thank you. We'll be in touch within 24 hours.
            </h3>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-6">
            <motion.input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClasses}
              animate={shakeName ? { x: [0, -8, 8, -8, 0] } : {}}
              transition={{ duration: 0.4 }}
              whileFocus={{ borderColor: "rgba(201, 168, 76, 1)" }}
            />
            <motion.input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={inputClasses}
              whileFocus={{ borderColor: "rgba(201, 168, 76, 1)" }}
            />
            <motion.input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClasses}
              animate={shakeEmail ? { x: [0, -8, 8, -8, 0] } : {}}
              transition={{ duration: 0.4 }}
              whileFocus={{ borderColor: "rgba(201, 168, 76, 1)" }}
            />
            <motion.select
              value={spaceType}
              onChange={(e) => setSpaceType(e.target.value)}
              className={`${inputClasses} appearance-none rounded-none`}
              whileFocus={{ borderColor: "rgba(201, 168, 76, 1)" }}
            >
              <option value="Luxury Flagship" className="bg-black">Luxury Flagship</option>
              <option value="Retail" className="bg-black">Retail</option>
              <option value="F&B" className="bg-black">F&B</option>
              <option value="Pop-Up & Activation" className="bg-black">Pop-Up & Activation</option>
              <option value="Not Sure Yet" className="bg-black">Not Sure Yet</option>
            </motion.select>
            <motion.textarea
              placeholder="Message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${inputClasses} resize-none`}
              whileFocus={{ borderColor: "rgba(201, 168, 76, 1)" }}
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-[#C9A84C] text-[#000000] font-bebas tracking-widest text-xl py-5 mt-6 hover:bg-white transition-colors duration-300 min-h-[44px]"
            >
              SEND ENQUIRY
            </button>
          </div>
        )}
      </div>

      {/* 
        The panel uses GSAP for its entrance/exit animations.
        It mounts once and remains in the DOM, managing its own 
        visibility state based on the `space` prop.
      */}
      <LeasingPanel
        space={selectedSpace}
        onClose={() => setSelectedSpace(null)}
      />
    </main>
  )
}
