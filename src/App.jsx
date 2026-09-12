import { useEffect } from 'react'
import NicotineBanner from './components/NicotineBanner'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BrandMarquee from './components/BrandMarquee'
import Categories from './components/Categories'
import ProductGrid from './components/ProductGrid'
import Reviews from './components/Reviews'
import TrustBadges from './components/TrustBadges'
import Footer from './components/Footer'
import MobileCallBar from './components/MobileCallBar'
import CookieConsent from './components/CookieConsent'
import { site } from './data'

function App() {
  /* index.html ships no shop name of its own; the title and description
     come from the active tenant. */
  useEffect(() => {
    document.title = site.seo.title

    let description = document.querySelector('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.setAttribute('name', 'description')
      document.head.appendChild(description)
    }
    description.setAttribute('content', site.seo.description)
  }, [])

  /* One observer reveals every element marked .reveal the first time it
     scrolls into view. Skipped entirely when reduced motion is requested. */
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll('.reveal'))
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <NicotineBanner position="top" />
      <Navbar />

      <main id="main">
        {/* Backgrounds run light, light, dark, light, accent-soft. The dark
            marquee lands after the categories rather than straight under the
            hero, so the page does not alternate on a metronome. */}
        <Hero />
        <Categories />
        <BrandMarquee />
        <ProductGrid />
        <Reviews />
        <TrustBadges />
      </main>

      <Footer />
      <NicotineBanner position="bottom" />
      <MobileCallBar />
      <CookieConsent />
    </>
  )
}

export default App
