## American Dream — Interactive Sales Deck

A cinematic, non-linear browser-based sales tool for the American Dream mall (East Rutherford, NJ), built as a high-stakes interview assignment for LIAT.AI.

Live URL: https://american-dream-liatai.vercel.app/

GitHub: https://github.com/sreejith2005/american-dream-liatai

## Tech Stack

| Technology | Version | Purpose |
| --- | --- | --- |
| React | ^19.2.6 | Component framework for the interactive sales deck UI. |
| ReactDOM | ^19.2.6 | Browser rendering layer for mounting the React application. |
| TypeScript | ~6.0.2 | Static typing for application code and build-time validation. |
| Vite | ^8.0.12 | Client-side development server, bundler, and production build pipeline. |
| @vitejs/plugin-react | ^6.0.1 | React integration for Vite. |
| Tailwind CSS | ^4.3.0 | Utility-first styling system for layout, typography, spacing, and responsive design. |
| @tailwindcss/vite | ^4.3.0 | Tailwind CSS integration through the Vite plugin pipeline. |
| GSAP | ^3.15.0 | Timeline and scroll animation engine. |
| @gsap/react | ^2.1.2 | React integration utilities for GSAP. |
| GSAP ScrollTrigger | ^3.15.0 | Scroll-linked pinning, scrubbing, snapping, and section choreography. |
| Framer Motion | ^12.39.0 | Declarative motion for React component transitions and interaction polish. |
| @studio-freight/lenis | ^1.0.42 | Smooth scrolling engine used alongside scroll choreography. |
| React Router DOM | ^7.15.1 | Route management for the main deck and expandable `/leasing` sub-route. |
| ESLint | ^10.3.0 | Static linting for code quality and consistency. |
| @eslint/js | ^10.0.1 | Core ESLint JavaScript rule presets. |
| typescript-eslint | ^8.59.2 | TypeScript-aware ESLint integration. |
| eslint-plugin-react-hooks | ^7.1.1 | React Hooks lint rules. |
| eslint-plugin-react-refresh | ^0.5.2 | React Refresh lint support for Vite development. |
| PostCSS | ^8.5.14 | CSS processing foundation used by the styling toolchain. |
| Autoprefixer | ^10.5.0 | Vendor prefix automation for CSS output. |
| globals | ^17.6.0 | Shared global definitions for ESLint configuration. |
| @types/node | ^24.12.3 | Type definitions for Node.js APIs used by tooling. |
| @types/react | ^19.2.14 | Type definitions for React. |
| @types/react-dom | ^19.2.3 | Type definitions for ReactDOM. |

Vite was chosen over Next.js deliberately. Next.js was explicitly avoided to eliminate hydration jitter and maximize GSAP ScrollTrigger scroll performance. Pure client-side rendering keeps the animation engine as the uncontested owner of the page lifecycle. For a scroll-choreography-heavy experience, this tradeoff is more important than server-rendered routing.

## Setup Instructions

1. Prerequisites — install Node.js `v18+`.

2. Clone the repo:

```bash
git clone https://github.com/sreejith2005/american-dream-liatai
```

3. Install dependencies:

```bash
npm install
```

4. Add frame assets — `/public/assets/Section3Frames/` must contain frames `001.jpg` through `428.jpg`. These are not in the repo due to file size (~30MB). Generate them from a source video with FFmpeg:

```bash
ffmpeg -i source_video.mp4 -vf fps=15,scale=1920:-1 -q:v 4 %03d.jpg
```

5. Add video asset — `/public/assets/videos/` must contain the Hero section background video in MP4 format. This video is not included in the repo due to file size.

6. Run development server:

```bash
npm run dev
```

7. Build for production:

```bash
npm run build
```

8. Preview production build:

```bash
npm run preview
```

The site will run without the frame assets and video but Section 3 (Parallax World) and the Hero video will not display correctly.

## Project Structure

```text
src/
├── assets/
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
├── components/
│   ├── leasing/
│   │   ├── CategoryGrid.tsx — renders leasing category cards.
│   │   ├── LeasingHero.tsx — hero section for the dedicated leasing route.
│   │   └── LeasingPanel.tsx — leasing detail panel component.
│   ├── ContactModal.tsx — shared inquiry modal controlled from App context.
│   ├── CustomCursor.tsx — custom cursor layer for desktop interaction polish.
│   ├── DiningLifestyle.tsx — dining and lifestyle content section.
│   ├── EventsVenues.tsx — events and venues content section.
│   ├── Footer.tsx — closing site footer.
│   ├── HeroSection.tsx — opening cinematic hero experience.
│   ├── LocationReach.tsx — location and reach content section.
│   ├── MarqueeStrip.tsx — reusable marquee strip visual component.
│   ├── ParallaxWorld.tsx — Section 3 canvas frame-scrubbed mall journey.
│   ├── PropertyOverview.tsx — property overview content component.
│   ├── RetailLeasing.tsx — retail leasing section and entry point.
│   ├── SectionNav.tsx — section navigation UI.
│   ├── Sponsorship.tsx — sponsorship and brand partnership section.
│   ├── StatsSection.tsx — statistics section following the hero.
│   └── TheClose.tsx — final narrative close and CTA section.
├── context/
├── data/
│   └── leasingData.ts — data source for leasing spaces and categories.
├── hooks/
│   ├── useCanvasScroll.ts — GSAP ScrollTrigger canvas scrub engine.
│   └── useImagePreloader.ts — singleton image preloader for Section 3 frames.
├── pages/
│   └── LeasingPage.tsx — lazy-loaded `/leasing` route.
├── utils/
├── App.css
├── App.tsx — top-level router, modal context, and main section composition.
├── index.css
├── main.tsx
└── sections.css
```

## Design Decisions

### **1. Canvas Frame Scrubber over CSS Parallax**

An early CSS-layered parallax attempt was scrapped because it looked cheap at this scale. The canvas approach maps scroll progress directly to 428 individual video frames extracted at 15fps, giving the illusion of physically traveling through the mall. GSAP ScrollTrigger with scrub drives the frame index while snap points create five distinct narrative zones.

### **2. Non-Linear Architecture**

The assignment explicitly required the viewer to control their journey. Section 4's track selector lets a retail leasing director jump directly to leasing content while a sponsorship manager goes to brand partnership data — both audiences get a tailored experience from the same URL. The `/leasing` sub-route demonstrates the expandable architecture the brief asked for in Phase 2.

### **3. Vite over Next.js**

Hydration jitter from server-side rendering visibly interrupts GSAP scroll timelines. A pure client-side Vite build eliminates this entirely and keeps the animation engine as the uncontested owner of the page lifecycle.

### **4. Three-Phase Preloading Strategy**

428 JPEG frames cannot be loaded on demand. The solution is a three-phase approach: 30 frames load at JS bundle parse time, 100 frames load when the Hero mounts, and all 428 load in the background 1.5 seconds after Hero mount. By the time a normal user scrolls through Hero and Stats (roughly 25 seconds of engagement), all frames are cached and Section 3 is instant.

### **5. Data-Driven Component Architecture**

All leasing spaces, panel content, and zone definitions live in data files (`leasingData.ts`, `panelData.ts`) rather than hardcoded JSX. Adding a new leasing space, sponsor tier, or venue card requires editing one data file — no component code changes needed. This directly addresses the assignment's Phase 2 expandability requirement.

## AI Tools Used

- **Claude (Anthropic)** — Primary coding collaborator throughout the entire build. Used inside the development environment to architect components, write GSAP animation logic, debug ScrollTrigger and Lenis conflicts, design the preloading strategy, and implement the canvas frame scrubber. All generated code was reviewed, directed, and refined through an iterative prompting process rather than accepted wholesale.

- **TestSprite MCP** — Integrated via Model Context Protocol directly inside the coding environment. TestSprite provided AI-assisted automated UI testing — visually inspecting the rendered interface, identifying broken interactions, flagging layout regressions, and surfacing console errors without manual click-through testing after every change. Particularly valuable for catching GSAP and React state conflicts that only manifest at runtime.

- **AI Image Generation** — All photorealistic renders of mall interior spaces, retail environments, and venue imagery were generated using AI image generation tools. Each render required iterative prompt refinement to achieve accurate architectural lighting, correct perspective, sharp material textures, and the specific atmosphere of a luxury mixed-use destination.

- **AI Video Generation** — The source video used for the Parallax World frame extraction was produced with AI video generation tools. Achieving usable footage required careful attention to camera movement smoothness (the video must scrub cleanly frame-by-frame), drone-style aerial transitions, and interior walk-through angles that hold up at any point in the scroll sequence.

- **FFmpeg** — Used to extract individual JPEG frames from the source video at 15fps with controlled compression (`-q:v 4`) producing 428 frames at approximately 30MB total — lightweight enough for browser delivery without sacrificing visual quality.

All AI-generated imagery and video assets were produced using free AI tools available during the build process. As a result, some visual assets may show limitations in fidelity, consistency, motion smoothness, or compression quality compared with professionally commissioned renders or production-grade video generation. The project prioritizes interaction design, technical execution, and scroll-based storytelling architecture; higher-budget asset production would improve the final visual polish without changing the underlying implementation.

## Known Limitations & What I Would Improve With More Time

1. **WebGL renderer** — The canvas 2D context works well on modern hardware but introduces perceptible frame drop on mid-range mobile devices under load. Migrating the frame scrubber to a WebGL renderer would offload blitting entirely to the GPU and unlock per-frame shader effects like real-time colour grading per zone.

2. **Live data integration** — All statistics and availability information are currently static. Connecting to a CMS or live property data API would make the deck self-updating and allow dynamic personalisation — a sponsor visiting in Q4 sees holiday footfall projections, a tenant in Q1 sees spring opening availability.

3. **Section transition choreography** — The connective tissue between sections (particularly the exit from Section 3 into Section 4) works but lacks the same cinematic intentionality as the sections themselves. Purpose-built transition sequences for each section boundary would elevate the overall flow significantly.

4. **Touch-native mobile experience** — The current mobile implementation is responsive but not touch-native. A swipe-gesture zone navigator for Section 3 (swipe left/right to move between clips rather than scroll vertically) would be the correct interaction paradigm for phones and make the deck genuinely usable on mobile rather than merely functional.

5. **Analytics and engagement tracking** — A sales tool should tell the salesperson which sections prospects spent the most time on, which CTA they clicked, and where they dropped off. Integrating lightweight event tracking would turn this from a presentation into an insight-generating tool that makes every subsequent pitch smarter.
