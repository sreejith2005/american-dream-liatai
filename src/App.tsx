import { Suspense, lazy, useState, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './sections.css'
import HeroSection from './components/HeroSection'
import StatsSection from './components/StatsSection'
import ParallaxWorld from './components/ParallaxWorld'
import CustomCursor from './components/CustomCursor'
import SectionNav from './components/SectionNav'
import ContactModal from './components/ContactModal'

import RetailLeasing from './components/RetailLeasing'
import DiningLifestyle from './components/DiningLifestyle'
import EventsVenues from './components/EventsVenues'
import Sponsorship from './components/Sponsorship'
import LocationReach from './components/LocationReach'
import TheClose from './components/TheClose'
import Footer from './components/Footer'

const LeasingPage = lazy(() => import('./pages/LeasingPage'))

export const ModalContext = createContext<(type: string) => void>(() => {})
export const useModal = () => useContext(ModalContext)

function MainLayout() {
  return (
    <>
      {/* Film grain overlay */}
      <svg className="film-grain" aria-hidden="true">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      <SectionNav />

      <main>
        <div id="hero" data-theme="dark">
          <HeroSection />
        </div>
        <div id="stats" data-theme="dark">
          <StatsSection />
        </div>
        <div id="parallax-world" data-theme="dark">
          <ParallaxWorld />
        </div>

        <RetailLeasing />
        <DiningLifestyle />
        <EventsVenues />
        <Sponsorship />
        <LocationReach />
        <TheClose />
        <Footer />
      </main>
    </>
  )
}

export default function App() {
  const [activeModal, setActiveModal] = useState<string | null>(null)

  return (
    <ModalContext.Provider value={(type: string) => setActiveModal(type)}>
      <Router>
        <CustomCursor />
        <ContactModal 
          isOpen={activeModal !== null} 
          onClose={() => setActiveModal(null)} 
          inquiryType={activeModal || ''} 
        />
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route 
            path="/leasing" 
            element={
              <Suspense fallback={<div className="h-screen w-screen bg-[#000000]" />}>
                <LeasingPage />
              </Suspense>
            } 
          />
        </Routes>
      </Router>
    </ModalContext.Provider>
  )
}