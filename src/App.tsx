import HeroSection from './components/HeroSection'
import StatsSection from './components/StatsSection'
import ParallaxWorld from './components/ParallaxWorld'
import CustomCursor from './components/CustomCursor'

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

      <main>
        <HeroSection />
        <StatsSection />
        <ParallaxWorld />
      </main>
    </>
  )
}