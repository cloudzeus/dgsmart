'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ChevronLeft, ChevronRight, Cpu, Wifi, Scan, Tractor, Warehouse, Database, Brain, BarChart3 } from 'lucide-react'
import Link from 'next/link'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const services = [
  { name: 'LiDAR Ανίχνευση', type: 'Service', icon: Scan, image: '/lidar-scan.jpg', description: '3D Ανίχνευση & Σάρωση' },
  { name: 'Έξυπνη Γεωργία', type: 'Service', icon: Tractor, image: '/smart-agriculture.jpg', description: 'IoT & Drone Monitoring' },
  { name: 'Έξυπνα Κτίρια', type: 'Service', icon: Cpu, image: '/smart-building.jpg', description: 'BMS & Automation' },
  { name: 'Έξυπνη Αποθήκευση', type: 'Service', icon: Warehouse, image: '/smart-warehouse.jpg', description: 'RFID & Robotics' },
  { name: 'Ενσωμάτωση ERP', type: 'Service', icon: Database, image: '/erp-integration.jpg', description: 'Softone & Custom APIs' },
  { name: 'AI & ML', type: 'Service', icon: Brain, image: '/ai-ml.jpg', description: 'Predictive Analytics' },
  { name: 'Computer Vision', type: 'Service', icon: Scan, image: '/ai-ml.jpg', description: 'Object Detection & QC' },
  { name: 'Power BI & Reporting', type: 'Service', icon: BarChart3, image: '/powerbi-dashboard.jpg', description: 'Dashboards & Analytics' },
]

// Animated counter hook
function useAnimatedCounter(end: number, duration: number = 2) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 90%',
      onEnter: () => {
        if (hasAnimated.current) return
        hasAnimated.current = true

        const obj = { value: 0 }
        gsap.to(obj, {
          value: end,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            setCount(Math.floor(obj.value))
          },
        })
      },
    })
    return () => trigger.kill()
  }, [end, duration])

  return { count, ref }
}

export default function Hero() {
  const [activeService, setActiveService] = useState(0)
  const [carouselOffset, setCarouselOffset] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const visibleCount = 6

  const stats = [
    { value: 150, suffix: '+', label: 'Έργα', ref: useAnimatedCounter(150, 2.5) },
    { value: 50, suffix: '+', label: 'Συνεργάτες', ref: useAnimatedCounter(50, 2) },
    { value: 10, suffix: '+', label: 'Χρόνια', ref: useAnimatedCounter(10, 1.5) },
  ]

  // Fade image when service changes
  useEffect(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          if (imageRef.current) {
            gsap.to(imageRef.current, {
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out'
            })
          }
        }
      })
    }
  }, [activeService])

  useEffect(() => {
    setIsMounted(true)
    const ctx = gsap.context(() => {
      // Badge animation
      gsap.fromTo('.hero-badge',
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.2, ease: 'back.out(1.7)' }
      )

      // Title character animation
      const title = titleRef.current
      if (title) {
        const text = title.innerText
        title.innerHTML = text.split('').map((char) =>
          char === ' ' ? ' ' : `<span class="inline-block" style="opacity: 0; transform: translateY(50px)">${char}</span>`
        ).join('')

        gsap.to(title.querySelectorAll('span'), {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.03,
          delay: 0.4,
          ease: 'power3.out',
        })
      }

      // Description fade in
      gsap.fromTo('.hero-desc',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: 'power3.out' }
      )

      // Buttons animation
      gsap.fromTo('.hero-buttons',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1, ease: 'power3.out' }
      )

      // Stats animation
      gsap.fromTo('.hero-stats',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.2, ease: 'power3.out' }
      )

      // Multi-layer parallax on hero image
      gsap.to('.hero-image-layer-1', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.to('.hero-image-layer-2', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Floating cards with continuous animation
      gsap.to('.floating-card-1', {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to('.floating-card-2', {
        y: 10,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Particle animation
      const particles = particlesRef.current?.querySelectorAll('.particle')
      if (particles) {
        particles.forEach((particle, i) => {
          gsap.to(particle, {
            y: -100 - Math.random() * 100,
            x: (Math.random() - 0.5) * 100,
            opacity: 0,
            duration: 3 + Math.random() * 2,
            repeat: -1,
            delay: i * 0.2,
            ease: 'power1.out',
          })
        })
      }

      // Services carousel entrance
      gsap.fromTo('.services-carousel',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-carousel',
            start: 'top 90%',
          }
        }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // Carousel navigation
  const handlePrev = () => {
    setCarouselOffset((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCarouselOffset((prev) => Math.min(services.length - visibleCount, prev + 1))
  }

  const handleServiceClick = (index: number) => {
    setActiveService(index)
  }

  // Magnetic button effect
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    })
  }

  const visibleServices = services.slice(carouselOffset, carouselOffset + visibleCount)

  return (
    <section ref={heroRef} className="relative min-h-screen pt-[80px] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />

        <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
          {isMounted && [...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle absolute w-1 h-1 bg-secondary/50 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${50 + Math.random() * 50}%`,
              }}
            />
          ))}
        </div>

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(220, 38, 38, 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(220, 38, 38, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 z-10">
            <div className="hero-badge">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 backdrop-blur-sm text-secondary text-sm font-semibold rounded-full border border-secondary/30">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                AI & IoT Integrator
              </span>
            </div>

            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Μετατρέπουμε τις Ιδέες σε Έξυπνες Λύσεις
            </h1>

            <p className="hero-desc text-lg text-gray-300 max-w-lg">
              Η DGSMART είναι ηγέτης στην ενσωμάτωση AI και IoT λύσεων.
              Παρέχουμε LiDAR ανίχνευση, έξυπνη γεωργία, έξυπνα κτίρια και
              αποθήκευση, καθώς και πλήρη ενσωμάτωση με οποιοδήποτε ERP σύστημα.
            </p>

            <div className="hero-buttons flex flex-wrap gap-4">
              <Link
                href="/#services"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group flex items-center gap-2 px-8 py-4 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-dark transition-colors"
              >
                Οι Υπηρεσίες μας
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                Επικοινωνήστε μαζί μας
              </Link>
            </div>

            {/* Stats */}
            <div className="hero-stats flex gap-8 pt-4">
              {stats.map((stat) => (
                <div key={stat.label} ref={stat.ref.ref}>
                  <div className="text-4xl font-bold text-white">
                    {stat.ref.count}{stat.suffix}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Hero Image with Parallax Layers */}
          <div className="relative h-[500px] lg:h-[600px]">
            {/* Layer 1: Background glow */}
            <div className="hero-image-layer-1 absolute inset-0 flex items-center justify-center">
              <div className="w-[400px] h-[400px] bg-secondary/30 rounded-full blur-[100px]" />
            </div>

            {/* Layer 2: Main Image - Changes based on selected service with fade */}
            <div className="hero-image-layer-2 absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  ref={imageRef}
                  src={services[activeService].image}
                  alt={services[activeService].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </div>

            {/* Floating Cards - Dynamic based on selected service */}
            <div className="floating-card-1 absolute -left-4 top-1/4 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                  {(() => {
                    const Icon = services[activeService].icon
                    return <Icon className="w-5 h-5 text-secondary" />
                  })()}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{services[activeService].name}</div>
                  <div className="text-xs text-gray-400">{services[activeService].description}</div>
                </div>
              </div>
            </div>

            <div className="floating-card-2 absolute -right-4 bottom-1/3 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Wifi className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">IoT Connected</div>
                  <div className="text-xs text-gray-400">Real-time Data</div>
                </div>
              </div>
            </div>

            {/* Drone mini image */}
            <div className="absolute right-8 top-8 w-24 h-24 rounded-xl overflow-hidden border-2 border-secondary/50 shadow-lg shadow-secondary/20">
              <img
                src="/drone-agriculture.jpg"
                alt="Drone"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Services Carousel - Shows 6 at a time */}
        <div className="services-carousel mt-16">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Οι Υπηρεσίες μας</h3>
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  disabled={carouselOffset === 0}
                  className={`p-2 rounded-lg transition-colors ${carouselOffset === 0
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={carouselOffset >= services.length - visibleCount}
                  className={`p-2 rounded-lg transition-colors ${carouselOffset >= services.length - visibleCount
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {visibleServices.map((service, index) => {
                const Icon = service.icon
                const actualIndex = carouselOffset + index
                return (
                  <div
                    key={service.name}
                    onClick={() => handleServiceClick(actualIndex)}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${activeService === actualIndex
                      ? 'bg-secondary text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                  >
                    <Icon className={`w-6 h-6 mb-2 ${activeService === actualIndex ? 'text-white' : 'text-secondary'}`} />
                    <span className={`text-xs font-medium ${activeService === actualIndex ? 'text-white/80' : 'text-gray-500'}`}>
                      {service.type}
                    </span>
                    <p className="text-sm font-semibold mt-1 line-clamp-2">{service.name}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
