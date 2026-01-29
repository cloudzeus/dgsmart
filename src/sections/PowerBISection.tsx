'use client'

import { useEffect, useRef } from 'react'
import { BarChart3, TrendingUp, PieChart, LineChart, Database, Share2, Zap, Eye, FileText, Layers } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const powerBIFeatures = [
  {
    icon: TrendingUp,
    title: 'Real-time Dashboards',
    description: 'Διαδραστικά dashboards που ενημερώνονται σε πραγματικό χρόνο με τα τελευταία δεδομένα της επιχείρησής σας.',
  },
  {
    icon: Database,
    title: 'Data Integration',
    description: 'Σύνδεση με πολλαπλές πηγές δεδομένων - SQL, Excel, cloud services, APIs και ERP συστήματα.',
  },
  {
    icon: LineChart,
    title: 'Predictive Analytics',
    description: 'Προβλέψεις και τάσεις με βάση ιστορικά δεδομένα για λήψη στρατηγικών αποφάσεων.',
  },
  {
    icon: Share2,
    title: 'Collaborative Reports',
    description: 'Κοινή χρήση αναφορών με την ομάδα σας με δυνατότητα σχολιασμού και κοινής επεξεργασίας.',
  },
  {
    icon: Zap,
    title: 'Automated Refresh',
    description: 'Αυτόματη ανανέωση δεδομένων σε προγραμματισμένα διαστήματα χωρίς χειροκίνητη παρέμβαση.',
  },
  {
    icon: Eye,
    title: 'Custom Visualizations',
    description: 'Εξατομικευμένα γραφήματα και visualizations προσαρμοσμένα στις ανάγκες σας.',
  },
]

const reportTypes = [
  { icon: BarChart3, label: 'Sales Analytics' },
  { icon: PieChart, label: 'Financial Reports' },
  { icon: LineChart, label: 'Performance Metrics' },
  { icon: FileText, label: 'KPI Dashboards' },
  { icon: Layers, label: 'Operational Reports' },
  { icon: Database, label: 'Data Warehouse' },
]

export default function PowerBISection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.powerbi-header',
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

      // Image reveal animation
      gsap.fromTo('.powerbi-image',
        { opacity: 0, scale: 0.95, clipPath: 'inset(0 100% 0 0)' },
        {
          opacity: 1,
          scale: 1,
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: '.powerbi-image',
            start: 'top 75%',
          },
        }
      )

      // Feature cards stagger
      gsap.fromTo('.powerbi-feature',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.powerbi-features-grid',
            start: 'top 80%',
          },
        }
      )

      // Report types animation
      gsap.fromTo('.report-type',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.report-types',
            start: 'top 85%',
          },
        }
      )

      // Stats counter animation
      const stats = gsap.utils.toArray('.powerbi-stat') as HTMLElement[]
      stats.forEach((stat) => {
        const value = stat.querySelector('.stat-value')
        if (value) {
          const endValue = parseInt(value.getAttribute('data-value') || '0')
          gsap.fromTo(value,
            { innerText: 0 },
            {
              innerText: endValue,
              duration: 2,
              ease: 'power2.out',
              snap: { innerText: 1 },
              scrollTrigger: {
                trigger: stat,
                start: 'top 85%',
              },
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="powerbi" ref={sectionRef} className="py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="powerbi-header text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 rounded-full mb-6">
            <BarChart3 className="w-5 h-5 text-secondary" />
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Business Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Power BI & <span className="text-secondary">Advanced Reporting</span>
          </h2>
          <p className="text-slate-300 max-w-3xl mx-auto text-lg">
            Μετατρέψτε τα δεδομένα σας σε δράσιμες πληροφορίες με τις επαγγελματικές μας λύσεις
            Power BI. Δημιουργούμε διαδραστικά dashboards και αναφορές που σας βοηθούν να λαμβάνετε
            αποφάσεις βασισμένες σε δεδομένα.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image */}
          <div className="powerbi-image relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/powerbi-dashboard.jpg"
              alt="Power BI Dashboard"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />

            {/* Floating Stats */}
            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-4">
              <div className="powerbi-stat bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
                <div className="stat-value text-2xl font-bold text-secondary" data-value="150">0</div>
                <div className="text-xs text-white/80">Dashboards</div>
              </div>
              <div className="powerbi-stat bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
                <div className="stat-value text-2xl font-bold text-secondary" data-value="50">0</div>
                <div className="text-xs text-white/80">Clients</div>
              </div>
              <div className="powerbi-stat bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
                <div className="stat-value text-2xl font-bold text-secondary" data-value="99">0</div>
                <div className="text-xs text-white/80">% Uptime</div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="powerbi-features-grid grid sm:grid-cols-2 gap-6">
            {powerBIFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="powerbi-feature group p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-secondary/50 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Report Types */}
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-white mb-4">Τύποι Αναφορών</h3>
          <p className="text-slate-400">Εξειδικευμένες αναφορές για κάθε τμήμα της επιχείρησής σας</p>
        </div>

        <div className="report-types flex flex-wrap justify-center gap-4">
          {reportTypes.map((type) => {
            const Icon = type.icon
            return (
              <div
                key={type.label}
                className="report-type flex items-center gap-3 px-6 py-4 bg-white/5 rounded-xl border border-white/10 hover:border-secondary/50 hover:bg-white/10 transition-all cursor-pointer"
              >
                <Icon className="w-5 h-5 text-secondary" />
                <span className="text-white font-medium">{type.label}</span>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary-dark transition-all hover:scale-105 shadow-lg shadow-secondary/30"
          >
            <BarChart3 className="w-5 h-5" />
            Ζητήστε Demo Dashboard
          </Link>
        </div>
      </div>
    </section>
  )
}
