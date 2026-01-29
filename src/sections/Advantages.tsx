'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Tractor, Warehouse, Database, ArrowRight, Check, Factory, ShoppingCart, BarChart3, Scan, Brain } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const tabs = [
  {
    id: 'smart-building',
    label: 'Έξυπνα Κτίρια',
    icon: Building2,
    features: [
      { title: 'Ενεργειακή Διαχείριση', description: 'Αυτοματοποιημένος έλεγχος φωτισμού, κλιματισμού και θέρμανσης για εξοικονόμηση ενέργειας.' },
      { title: 'Ασφάλεια & Πρόσβαση', description: 'Συστήματα ελέγχου πρόσβασης, CCTV και συναγερμοί με AI αναγνώριση.' },
      { title: 'Περιβαλλοντικός Έλεγχος', description: 'Παρακολούθηση ποιότητας αέρα, θερμοκρασίας και υγρασίας σε πραγματικό χρόνο.' },
    ],
    bullets: [
      'Έλεγχος φωτισμού με αισθητήρες κίνησης',
      'Smart thermostat & κλιματισμός',
      'Παρακολούθηση ενεργειακής κατανάλωσης',
      'Συναγερμοί & CCTV με AI',
      'Έλεγχος πρόσβασης',
      'Ανίχνευση διαρροών',
    ],
    image: '/smart-building.jpg',
  },
  {
    id: 'smart-agriculture',
    label: 'Έξυπνη Γεωργία',
    icon: Tractor,
    features: [
      { title: 'Αυτόματο Πότισμα', description: 'Έξυπνα συστήματα άρδευσης που προσαρμόζονται στις καιρικές συνθήκες και τις ανάγκες των καλλιεργειών.' },
      { title: 'Ανάλυση Εδάφους', description: 'Αισθητήρες που μετρούν υγρασία, pH και θρεπτικά συστατικά του εδάφους.' },
      { title: 'Καιρικές Προβλέψεις', description: 'AI-powered προβλέψεις για βέλτιστο χρόνο σποράς, λίπανσης και συγκομιδής.' },
    ],
    bullets: [
      'Αισθητήρες υγρασίας εδάφους',
      'Αυτόματα συστήματα άρδευσης',
      'Παρακολούθηση καιρού σε πραγματικό χρόνο',
      'Drone απεικόνιση καλλιεργειών',
      'Πρόβλεψη ασθενειών φυτών',
      'Βελτιστοποίηση αποδόσεων',
    ],
    image: '/smart-agriculture.jpg',
  },
  {
    id: 'smart-warehouse',
    label: 'Έξυπνη Αποθήκευση',
    icon: Warehouse,
    features: [
      { title: 'Real-time Tracking', description: 'Πλήρης ορατότητα των αποθεμάτων σε πραγματικό χρόνο με RFID και barcode scanning.' },
      { title: 'Αυτοματοποιημένη Ταξινόμηση', description: 'Έξυπνα ρομπότ και conveyors για αυτόματη ταξινόμηση και μετακίνηση προϊόντων.' },
      { title: 'Πρόβλεψη Ζήτησης', description: 'AI αλγόριθμοι που προβλέπουν ζήτηση και βελτιστοποιούν τα επίπεδα αποθέματος.' },
    ],
    bullets: [
      'RFID & barcode tracking',
      'Αυτοματοποιημένη ταξινόμηση',
      'Pick-to-light συστήματα',
      'Πρόβλεψη αποθεμάτων',
      'Βελτιστοποίηση διαδρομών',
      'Αναφορές & analytics',
    ],
    image: '/smart-warehouse.jpg',
  },
  {
    id: 'erp-integration',
    label: 'Ενσωμάτωση ERP',
    icon: Database,
    features: [
      { title: 'Διασύνδεση Συστημάτων', description: 'Απρόσκοπτη ενσωμάτωση IoT δεδομένων με Softone, SAP, Oracle and other ERP.' },
      { title: 'Αυτοματοποίηση Διαδικασιών', description: 'Αυτόματη ενημέρωση αποθεμάτων, παραγγελιών και τιμολογίων σε όλα τα συστήματα.' },
      { title: 'Ενιαία Αναφορά', description: 'Ενοποιημένα dashboards με δεδομένα από όλες τις πηγές για πλήρη επισκόπηση.' },
    ],
    bullets: [
      'Softone ενσωμάτωση',
      'SAP ενσωμάτωση',
      'Oracle NetSuite',
      'API διασυνδέσεις',
      'Real-time συγχρονισμός',
      'Custom integrations',
    ],
    image: '/erp-integration.jpg',
  },
  {
    id: 'smart-industry',
    label: 'Έξυπνη Βιομηχανία',
    icon: Factory,
    features: [
      { title: 'Παρακολούθηση Παραγωγής', description: 'Real-time monitoring της παραγωγικής διαδικασίας με IoT αισθητήρες.' },
      { title: 'Predictive Maintenance', description: 'Πρόβλεψη βλαβών και προγραμματισμός συντήρησης πριν την εμφάνιση προβλήματος.' },
      { title: 'Ποιοτικός Έλεγχος', description: 'Αυτοματοποιημένος έλεγχος ποιότητας με computer vision και AI.' },
    ],
    bullets: [
      'OEE Monitoring',
      'Machine Learning για συντήρηση',
      'Computer Vision QC',
      'Energy monitoring',
      'Safety compliance',
      'Digital Twin',
    ],
    image: '/smart-building.jpg',
  },
  {
    id: 'smart-retail',
    label: 'Έξυπνο Λιανικό Εμπόριο',
    icon: ShoppingCart,
    features: [
      { title: 'Smart Shelves', description: 'Έξυπνα ράφια που παρακολουθούν τα επίπεδα αποθέματος αυτόματα.' },
      { title: 'People Counting', description: 'Ανάλυση ροής πελατών και βελτιστοποίηση διάταξης καταστήματος.' },
      { title: 'Personalized Marketing', description: 'Στοχευμένες προσφορές βασισμένες στη συμπεριφορά πελατών.' },
    ],
    bullets: [
      'RFID tracking προϊόντων',
      'People counting sensors',
      'Heat maps καταστήματος',
      'Digital signage',
      'Queue management',
      'Loss prevention',
    ],
    image: '/smart-warehouse.jpg',
  },
  {
    id: 'lidar-scanning',
    label: 'LiDAR & 3D Σάρωση',
    icon: Scan,
    features: [
      { title: '3D Point Cloud', description: 'Ακριβής 3D αποτύπωση χώρων με ανάλυση ±2mm.' },
      { title: 'BIM Integration', description: 'Ενσωμάτωση με Building Information Modeling για αρχιτεκτονικές μελέτες.' },
      { title: 'Digital Twin', description: 'Δημιουργία ψηφιακών διδύμων για simulation και ανάλυση.' },
    ],
    bullets: [
      'Ακρίβεια ±2mm',
      'BIM ready exports',
      'Digital twin creation',
      'Volume calculations',
      'Change detection',
      'As-built documentation',
    ],
    image: '/lidar-scan.jpg',
  },
  {
    id: 'ai-solutions',
    label: 'AI & Machine Learning',
    icon: Brain,
    features: [
      { title: 'Predictive Analytics', description: 'Πρόβλεψη τάσεων και συμπεριφοράς με βάση ιστορικά δεδομένα.' },
      { title: 'Computer Vision', description: 'Αναγνώριση εικόνας, object detection και quality control.' },
      { title: 'NLP & Chatbots', description: 'Επεξεργασία φυσικής γλώσσας και intelligent chatbots.' },
    ],
    bullets: [
      'Predictive models',
      'Object detection',
      'Anomaly detection',
      'NLP processing',
      'Recommendation engines',
      'Automated reporting',
    ],
    image: '/ai-ml.jpg',
  },
  {
    id: 'powerbi',
    label: 'Power BI & Analytics',
    icon: BarChart3,
    features: [
      { title: 'Interactive Dashboards', description: 'Διαδραστικά dashboards που ενημερώνονται σε real-time.' },
      { title: 'Data Integration', description: 'Σύνδεση με SQL, Excel, cloud services και ERP συστήματα.' },
      { title: 'Custom Reports', description: 'Εξατομικευμένες αναφορές προσαρμοσμένες στις ανάγκες σας.' },
    ],
    bullets: [
      'Real-time dashboards',
      'Multi-source integration',
      'Custom visualizations',
      'Automated refresh',
      'Mobile friendly',
      'Collaborative sharing',
    ],
    image: '/powerbi-dashboard.jpg',
  },
]

export default function Advantages() {
  const [activeTab, setActiveTab] = useState('smart-building')
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const activeContent = tabs.find((tab) => tab.id === activeTab)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.advantages-header',
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

      // Tabs animation
      gsap.fromTo('.advantages-tabs',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )

      // Content area animation
      gsap.fromTo('.advantages-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Image transition animation
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 1.1, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' }
      )
    }
  }, [activeTab])

  return (
    <section id="solutions" ref={sectionRef} className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="advantages-header text-center mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Οι Λύσεις μας
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Εξειδικευμένες Λύσεις για κάθε Κλάδο
          </h2>
        </div>

        {/* Tabs */}
        <div className="advantages-tabs flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium text-sm transition-all duration-300 ${activeTab === tab.id
                    ? 'bg-secondary text-white shadow-lg shadow-secondary/30'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="advantages-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Left - Features */}
              <div className="space-y-8">
                <div className="space-y-6">
                  {activeContent?.features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group p-4 rounded-xl bg-slate-50 hover:bg-secondary/5 transition-colors"
                    >
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-secondary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Bullet Points */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {activeContent?.bullets.map((bullet, index) => (
                    <motion.div
                      key={bullet}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-5 h-5 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-secondary" />
                      </div>
                      <span className="text-sm text-slate-700">{bullet}</span>
                    </motion.div>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-dark transition-colors shadow-lg shadow-secondary/30"
                >
                  Ζητήστε Προσφορά
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Right - Image with parallax */}
              <div className="relative">
                <div
                  ref={imageRef}
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                >
                  <img
                    src={activeContent?.image}
                    alt={activeContent?.label}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
