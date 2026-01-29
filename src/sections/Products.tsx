'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight, Scan, Tractor, Cpu, Warehouse, Database, Brain, Eye, Shield, BarChart3 } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const services = [
  {
    title: 'LiDAR Ανίχνευση & 3D Σάρωση',
    description: 'Προηγμένη τεχνολογία LiDAR για ακριβή 3D σάρωση χώρων, κτιρίων και εξωτερικών περιοχών. Ιδανικό για αρχιτεκτονικές μελέτες και αποτυπώσεις.',
    image: '/lidar-scan.jpg',
    icon: Scan,
    features: ['3D Point Cloud', 'Ακρίβεια ±2mm', 'Μεγάλες αποστάσεις'],
    link: '/service/lidar',
  },
  {
    title: 'Έξυπνη Γεωργία',
    description: 'IoT λύσεις για παρακολούθηση καλλιεργειών, αυτοματοποιημένο πότισμα, ανάλυση εδάφους και καιρικών συνθηκών για μέγιστη απόδοση.',
    image: '/smart-agriculture.jpg',
    icon: Tractor,
    features: ['Αυτόματο πότισμα', 'Αισθητήρες εδάφους', 'Drone monitoring'],
    link: '/smart-agriculture',
  },
  {
    title: 'Έξυπνα Κτίρια',
    description: 'Ολοκληρωμένες λύσεις αυτοματισμού κτιρίων με έλεγχο φωτισμού, κλιματισμού, ασφάλειας και ενεργειακής διαχείρισης.',
    image: '/smart-building.jpg',
    icon: Cpu,
    features: ['BMS Systems', 'Energy optimization', 'Access control'],
    link: '/service/smart-building',
  },
  {
    title: 'Έξυπνη Αποθήκευση',
    description: 'Συστήματα διαχείρισης αποθήκης με real-time παρακολούθηση αποθεμάτων, αυτοματοποιημένη ταξινόμηση και βελτιστοποίηση logistics.',
    image: '/smart-warehouse.jpg',
    icon: Warehouse,
    features: ['RFID Tracking', 'Robotic arms', 'Real-time inventory'],
    link: '/service/smart-warehouse',
  },
  {
    title: 'Ενσωμάτωση ERP',
    description: 'Πλήρης ενσωμάτωση IoT και AI συστημάτων με Softone, SAP, Oracle και Microsoft Dynamics για απρόσκοπτη ροή δεδομένων.',
    image: '/erp-integration.jpg',
    icon: Database,
    features: ['Softone Integration', 'SAP', 'Custom APIs'],
    link: '/service/erp-integration',
  },
  {
    title: 'AI & Machine Learning',
    description: 'Εξατομικευμένες AI λύσεις για ανάλυση δεδομένων, πρόβλεψη συντήρησης, αναγνώριση εικόνας και αυτοματοποίηση διαδικασιών.',
    image: '/ai-ml.jpg',
    icon: Brain,
    features: ['Predictive analytics', 'Computer vision', 'NLP'],
    link: '/service/ai-ml',
  },
  {
    title: 'Computer Vision',
    description: 'Προηγμένα συστήματα όρασης υπολογιστή για αναγνώριση αντικειμένων, ανίχνευση ελαττωμάτων, quality control και αυτοματοποιημένη παρακολούθηση.',
    image: '/ai-ml.jpg',
    icon: Eye,
    features: ['Object detection', 'Quality control', 'Real-time analysis'],
    link: '/service/computer-vision',
  },
  {
    title: 'Συμμόρφωση & Ασφάλεια',
    description: 'Πλήρης συμμόρφωση με HASP, GDPR, NIS2 και κανονισμούς ασφάλειας προσωπικού. Διασφάλιση προστασίας δεδομένων και ασφαλούς λειτουργίας.',
    image: '/smart-building.jpg',
    icon: Shield,
    features: ['GDPR Compliance', 'NIS2 Ready', 'HASP Safety'],
    link: '/service/compliance',
  },
  {
    title: 'Power BI & Advanced Reporting',
    description: 'Επαγγελματικές λύσεις BI και προηγμένης αναφοράς με Power BI. Διαδραστικά dashboards, real-time analytics και custom reports για κάθε ανάγκη.',
    image: '/powerbi-dashboard.jpg',
    icon: BarChart3,
    features: ['Interactive Dashboards', 'Real-time Data', 'Custom Reports'],
    link: '/service/powerbi',
  },
]

export default function Products() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation with clip-path reveal
      gsap.fromTo('.services-header',
        {
          opacity: 0,
          clipPath: 'inset(0 100% 0 0)',
        },
        {
          opacity: 1,
          clipPath: 'inset(0 0% 0 0)',
          duration: 1,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )

      // Cards stagger animation with image mask reveal
      const cards = gsap.utils.toArray('.service-card') as HTMLElement[]
      cards.forEach((card, index) => {
        const image = card.querySelector('.card-image')
        const content = card.querySelector('.card-content')
        const features = card.querySelectorAll('.feature-tag')

        // Card entrance
        gsap.fromTo(card,
          { opacity: 0, y: 80, rotateX: 15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        )

        // Image mask reveal
        gsap.fromTo(image,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1,
            delay: index * 0.1 + 0.2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        )

        // Content fade in
        gsap.fromTo(content,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1 + 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        )

        // Feature tags stagger
        gsap.fromTo(features,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.05,
            delay: index * 0.1 + 0.6,
            ease: 'back.out(1.7)',
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

  // Magnetic hover effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(card, {
      rotateY: x * 0.02,
      rotateX: -y * 0.02,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    })
  }

  return (
    <section id="services" ref={sectionRef} className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="services-header flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Οι Υπηρεσίες μας
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              Ολοκληρωμένες Λύσεις<br />
              AI & IoT για κάθε Ανάγκη
            </h2>
          </div>
          <p className="text-slate-600 max-w-md lg:text-right">
            Από την LiDAR ανίχνευση μέχρι την ενσωμάτωση ERP,
            προσφέρουμε καινοτόμες λύσεις που μεταμορφώνουν τις επιχειρήσεις.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: '1000px' }}>
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="service-card group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Image with mask reveal */}
                <div className="card-image relative h-52 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Icon badge */}
                  <div className="absolute bottom-4 left-4 w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg transform translate-z-10">
                    <Icon className="w-7 h-7 text-secondary" />
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="card-content p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-secondary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 mb-4 line-clamp-3 text-sm">
                    {service.description}
                  </p>

                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="feature-tag px-3 py-1 text-xs font-medium bg-secondary/10 text-secondary rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={service.link}
                    className="inline-flex items-center gap-2 text-secondary font-semibold group/link"
                  >
                    Μάθετε περισσότερα
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
