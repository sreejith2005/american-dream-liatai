import './sections.css'
import HeroSection from './components/HeroSection'
import StatsSection from './components/StatsSection'
import ParallaxWorld from './components/ParallaxWorld'
import CustomCursor from './components/CustomCursor'
import SectionNav from './components/SectionNav'
import PropertyOverview from './components/PropertyOverview'
import RetailLeasing from './components/RetailLeasing'
import DiningLifestyle from './components/DiningLifestyle'
import EventsVenues from './components/EventsVenues'
import Sponsorship from './components/Sponsorship'
import LocationReach from './components/LocationReach'
import TheClose from './components/TheClose'
import Footer from './components/Footer'

export default function App() {
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

      <CustomCursor />
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
        <PropertyOverview />
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