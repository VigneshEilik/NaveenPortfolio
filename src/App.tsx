import { BackToTop } from './components/FloatingUi'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { About } from './components/sections/About'
import { Approach } from './components/sections/Approach'
import { Contact } from './components/sections/Contact'
import { Destinations } from './components/sections/Destinations'
import { Education } from './components/sections/Education'
import { Experience } from './components/sections/Experience'
import { Expertise } from './components/sections/Expertise'
import { Hero } from './components/sections/Hero'
import { Ribbon } from './components/sections/Ribbon'
import { Work } from './components/sections/Work'
import { useSpotlight } from './hooks/useMotion'

export default function App() {
  useSpotlight()
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-sun px-4 py-2 text-sm font-semibold text-navy-deep focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Ribbon />
        <About />
        <Expertise />
        <Approach />
        <Experience />
        <Work />
        <Destinations />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
