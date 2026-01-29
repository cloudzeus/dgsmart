'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import Navigation from '@/sections/Navigation'
import Hero from '@/sections/Hero'
import Products from '@/sections/Products'
import Advantages from '@/sections/Advantages'
import CustomerStories from '@/sections/CustomerStories'
import AboutStats from '@/sections/AboutStats'
import StayUpdated from '@/sections/StayUpdated'
import ContactCTA from '@/sections/ContactCTA'
import Footer from '@/sections/Footer'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

export default function Home() {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleClick = (e: Event) => {
      const link = e.currentTarget as HTMLAnchorElement
      const href = link.getAttribute('href')
      if (href && href !== '#' && href.startsWith('#')) {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          gsap.to(window, {
            duration: 1.2,
            scrollTo: { y: target, offsetY: 80 },
            ease: 'power3.inOut',
          })
        }
      }
    }

    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach((link) => {
      link.addEventListener('click', handleClick)
    })

    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)

    // Initial refresh after load
    ScrollTrigger.refresh()

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', handleClick)
      })
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <Products />
        <Advantages />
        <CustomerStories />
        <AboutStats />
        <StayUpdated />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  )
}
