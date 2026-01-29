'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const projects = [
  {
    title: 'LiDAR Σάρωση Βιομηχανικού Συγκροτήματος 50.000τμ',
    tags: ['LiDAR', '3D Scanning', 'BIM'],
    location: 'Ασπρόπυργος',
    image: '/lidar-scan.jpg',
    size: 'large',
    stats: { area: '50.000τμ', accuracy: '±2mm', time: '3 μέρες' },
  },
  {
    title: 'Έξυπνο Θερμοκήπιο 10 στρεμμάτων με Drone Monitoring',
    tags: ['Έξυπνη Γεωργία', 'Drones', 'IoT'],
    location: 'Θεσσαλονίκη',
    image: '/drone-agriculture.jpg',
    size: 'large',
    stats: { yield: '+25%', water: '-30%', efficiency: '+40%' },
  },
  {
    title: 'Smart Building Automation για Εμπορικό Κέντρο',
    tags: ['Smart Building', 'BMS', 'Energy'],
    location: 'Αθήνα',
    image: '/smart-building.jpg',
    size: 'small',
    stats: { savings: '-35%', comfort: '+25%', carbon: '-40%' },
  },
  {
    title: 'Ενσωμάτωση Smart Warehouse με Softone ERP',
    tags: ['ERP Integration', 'Smart Warehouse', 'RFID'],
    location: 'Πάτρα',
    image: '/smart-warehouse.jpg',
    size: 'small',
    stats: { speed: '+60%', errors: '-90%', roi: '18 μήνες' },
  },
  {
    title: 'AI Quality Control για Βιομηχανία Τροφίμων',
    tags: ['AI & ML', 'Computer Vision', 'Quality Control'],
    location: 'Βόλος',
    image: '/ai-ml.jpg',
    size: 'small',
    stats: { defects: '-95%', speed: '+40%', roi: '12 μήνες' },
  },
  {
    title: 'Power BI Dashboard για Retail Chain',
    tags: ['Power BI', 'Analytics', 'Reporting'],
    location: 'Ηράκλειο',
    image: '/powerbi-dashboard.jpg',
    size: 'small',
    stats: { insights: '+300%', time: '-70%', decisions: '+50%' },
  },
  {
    title: 'Smart Factory Monitoring & OEE',
    tags: ['Smart Industry', 'IoT', 'OEE'],
    location: 'Θεσσαλονίκη',
    image: '/smart-building.jpg',
    size: 'small',
    stats: { efficiency: '+25%', downtime: '-40%', roi: '14 μήνες' },
  },
  {
    title: 'GDPR & NIS2 Compliance για Τράπεζα',
    tags: ['Compliance', 'Security', 'GDPR'],
    location: 'Αθήνα',
    image: '/smart-building.jpg',
    size: 'small',
    stats: { compliance: '100%', audits: '0', risk: '-80%' },
  },
]

export default function CustomerStories() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.projects-header',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )

      // Cards animation with parallax images
      const cards = gsap.utils.toArray('.project-card') as HTMLElement[]
      cards.forEach((card, index) => {
        const image = card.querySelector('.card-image')
        const content = card.querySelector('.card-content')
        const statsNodes = card.querySelectorAll('.stat-item')

        // Card entrance
        gsap.fromTo(card,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        )

        // Parallax on image
        gsap.to(image, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })

        // Content reveal
        gsap.fromTo(content,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.15 + 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        )

        // Stats stagger
        gsap.fromTo(statsNodes,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            delay: index * 0.15 + 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-20 lg:py-28 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="projects-header flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Έργα
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-2xl">
              Επιτυχημένα Έργα που Μεταμορφώνουν Επιχειρήσεις
            </h2>
          </div>
          <Link
            href="/use-case"
            className="group inline-flex items-center gap-2 text-secondary font-semibold hover:text-secondary-dark transition-colors"
          >
            Όλα τα Έργα
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Projects Grid - 4 columns on large screens */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className={`project-card group relative rounded-2xl overflow-hidden cursor-pointer ${index < 2 ? 'h-[400px] lg:col-span-2' : 'h-[300px]'
                }`}
            >
              {/* Background Image with parallax */}
              <div className="card-image absolute inset-0 w-full h-[130%]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="card-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

              {/* Content */}
              <div className="card-content absolute inset-0 p-6 flex flex-col justify-end">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-secondary/80 text-white rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className={`font-bold text-white mb-2 line-clamp-2 ${index < 2 ? 'text-xl' : 'text-lg'}`}>
                  {project.title}
                </h3>

                {/* Location */}
                <p className="text-sm text-gray-300 mb-3">{project.location}</p>

                {/* Stats */}
                <div className={`flex gap-3 ${index < 2 ? 'mb-4' : ''}`}>
                  {Object.entries(project.stats).slice(0, index < 2 ? 3 : 2).map(([key, value]) => (
                    <div key={key} className="stat-item text-center">
                      <div className={`font-bold text-secondary ${index < 2 ? 'text-lg' : 'text-base'}`}>{value}</div>
                      <div className="text-xs text-gray-400 capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                {/* Link for large cards */}
                {index < 2 && (
                  <span className="flex items-center gap-1 text-sm text-secondary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Δείτε περισσότερα
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
