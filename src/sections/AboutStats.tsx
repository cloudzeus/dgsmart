'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const stats = [
  { value: 150, suffix: '+', label: 'Ολοκληρωμένα Έργα' },
  { value: 50, suffix: '+', label: 'Εταιρικοί Συνεργάτες' },
  { value: 10, suffix: '+', label: 'Χρόνια Εμπειρίας' },
  { value: 98, suffix: '%', label: 'Ικανοποιημένοι Πελάτες' },
]

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return
        hasAnimated.current = true

        const obj = { value: 0 }
        gsap.to(obj, {
          value: end,
          duration: 2.5,
          ease: 'power2.out',
          onUpdate: () => {
            setCount(Math.floor(obj.value))
          },
        })
      },
    })
    return () => trigger.kill()
  }, [end])

  return (
    <div ref={ref} className="text-4xl sm:text-5xl font-bold text-white">
      {count.toLocaleString()}{suffix}
    </div>
  )
}

export default function AboutStats() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo('.about-content',
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      )

      // Image parallax
      gsap.to(imageRef.current, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Stats animation
      gsap.fromTo('.stat-card',
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="company" ref={sectionRef} className="py-20 lg:py-28 bg-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="about-content space-y-6">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Η Εταιρεία μας
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              DGSMART: Η Τεχνολογία στην Υπηρεσία σας
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Η DGSMART είναι πρωτοπόρος στην ενσωμάτωση AI και IoT λύσεων στην Ελλάδα.
              Με περισσότερα από 10 χρόνια εμπειρίας, παρέχουμε καινοτόμες λύσεις που
              μεταμορφώνουν τον τρόπο λειτουργίας των επιχειρήσεων.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Από την LiDAR ανίχνευση μέχρι την ενσωμάτωση ERP, η ομάδα μας των
              εξειδικευμένων μηχανικών και προγραμματιστών είναι έτοιμη να αντιμετωπίσει
              κάθε πρόκληση.
            </p>

            {/* Features list */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {[
                'Πιστοποιημένοι μηχανικοί',
                '24/7 Υποστήριξη',
                'Custom λύσεις',
                'Εγγύηση εργασίας',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-dark transition-colors shadow-lg shadow-secondary/30"
            >
              Επικοινωνήστε μαζί μας
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right - Image & Stats */}
          <div className="space-y-8">
            {/* Image */}
            <div ref={imageRef} className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/ai-ml.jpg"
                alt="AI Technology"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
            </div>

            {/* Stats Grid */}
            <div className="stats-grid grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="stat-card text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-secondary/50 transition-colors"
                >
                  <CountUp end={stat.value} suffix={stat.suffix} />
                  <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
