'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight, Check, Droplets, Sun, Wifi, Cpu, TrendingUp, Clock } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import Link from 'next/link'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const technologies = [
    { name: 'Milesight AM107', description: 'Αισθητήρες θερμοκρασίας, υγρασίας, CO2' },
    { name: 'Milesight EM300', description: 'Αισθητήρες υγρασίας εδάφους' },
    { name: 'Milesight UG65', description: 'LoRaWAN Gateway' },
    { name: 'DJI Phantom 4', description: 'Multispectral drone για NDVI mapping' },
    { name: 'Custom Dashboard', description: 'Real-time monitoring & analytics' },
]

const results = [
    { metric: '+25%', label: 'Αύξηση Παραγωγής', icon: TrendingUp },
    { metric: '-30%', label: 'Μείωση Νερού', icon: Droplets },
    { metric: '+40%', label: 'Βελτίωση Ποιότητας', icon: Check },
    { metric: '24/7', label: 'Monitoring', icon: Clock },
]

const features = [
    {
        icon: Droplets,
        title: 'Έξυπνη Άρδευση',
        description: 'Αυτόματο πότισμα βάσει αισθητήρων υγρασίας εδάφους και μετεωρολογικών δεδομένων.',
    },
    {
        icon: Sun,
        title: 'Κλιματικός Έλεγχος',
        description: 'Αυτόματος έλεγχος θερμοκρασίας, υγρασίας και CO2 για βέλτιστες συνθήκες ανάπτυξης.',
    },
    {
        icon: Wifi,
        title: 'Remote Monitoring',
        description: 'Παρακολούθηση όλων των παραμέτρων από οποιαδήποτε συσκευή, οποιαδήποτε στιγμή.',
    },
    {
        icon: Cpu,
        title: 'AI Analytics',
        description: 'Προβλέψεις απόδοσης και ανίχνευση ασθενειών με τεχνητή νοημοσύνη.',
    },
]

export default function UseCase() {
    const pageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.hero-content',
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
            )

            gsap.fromTo('.result-card',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.6, stagger: 0.1,
                    scrollTrigger: { trigger: '.results-grid', start: 'top 85%' }
                }
            )

            gsap.fromTo('.feature-card',
                { opacity: 0, x: -30 },
                {
                    opacity: 1, x: 0, duration: 0.6, stagger: 0.15,
                    scrollTrigger: { trigger: '.features-grid', start: 'top 80%' }
                }
            )

            gsap.fromTo('.tech-item',
                { opacity: 0, scale: 0.9 },
                {
                    opacity: 1, scale: 1, duration: 0.4, stagger: 0.1,
                    scrollTrigger: { trigger: '.tech-grid', start: 'top 85%' }
                }
            )
        }, pageRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={pageRef} className="min-h-screen bg-white">
            <Navigation />

            {/* Hero Section */}
            <section className="relative pt-[80px] bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="/smart-agriculture.jpg"
                        alt="Smart Agriculture"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="hero-content">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-medium rounded-full">
                                Case Study
                            </span>
                            <span className="text-green-400 text-sm">Smart Agriculture</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-3xl">
                            Έξυπνο Θερμοκήπιο 5 Στρεμμάτων
                        </h1>

                        <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                            Πλήρες σύστημα IoT για αυτοματοποιημένο έλεγχο θερμοκηπίου ντομάτας
                            στη Θεσσαλονίκη. Αύξηση παραγωγής 25% με 30% λιγότερο νερό.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                            >
                                Ζητήστε Παρόμοια Λύση
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/smart-agriculture"
                                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                            >
                                Όλες οι Λύσεις Γεωργίας
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Results Section */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900">Αποτελέσματα</h2>
                        <p className="text-slate-600 mt-2">Μετρήσιμα οφέλη μετά την εγκατάσταση</p>
                    </div>

                    <div className="results-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {results.map((result) => {
                            const Icon = result.icon
                            return (
                                <div key={result.label} className="result-card bg-white rounded-2xl p-8 shadow-lg text-center">
                                    <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-7 h-7 text-green-600" />
                                    </div>
                                    <p className="text-4xl font-bold text-slate-900 mb-2">{result.metric}</p>
                                    <p className="text-slate-600">{result.label}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Challenge & Solution */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Challenge */}
                        <div>
                            <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">Η Πρόκληση</span>
                            <h2 className="mt-3 text-3xl font-bold text-slate-900 mb-6">
                                Ανεπαρκής Έλεγχος & Χαμένη Παραγωγή
                            </h2>
                            <ul className="space-y-4">
                                {[
                                    'Χειροκίνητος έλεγχος θερμοκρασίας και υγρασίας',
                                    'Ανεπαρκής παρακολούθηση των συνθηκών του εδάφους',
                                    'Υπερβολική κατανάλωση νερού λόγω έλλειψης δεδομένων',
                                    'Καθυστερημένη ανίχνευση ασθενειών',
                                    'Δεν υπήρχε ιστορικό δεδομένων για βελτιστοποίηση',
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-red-500 text-xs">✕</span>
                                        </div>
                                        <span className="text-slate-600">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Solution */}
                        <div>
                            <span className="text-green-500 font-semibold text-sm uppercase tracking-wider">Η Λύση</span>
                            <h2 className="mt-3 text-3xl font-bold text-slate-900 mb-6">
                                Ολοκληρωμένο Σύστημα IoT
                            </h2>
                            <ul className="space-y-4">
                                {[
                                    'Αυτόματος έλεγχος κλίματος με AI algorithms',
                                    'Αισθητήρες υγρασίας εδάφους για έξυπνο πότισμα',
                                    'Εξοικονόμηση 30% νερού με precision irrigation',
                                    'Early warning system για ασθένειες',
                                    'Πλήρες dashboard με ιστορικά δεδομένα και analytics',
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Check className="w-4 h-4 text-green-600" />
                                        </div>
                                        <span className="text-slate-600">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Χαρακτηριστικά</span>
                        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
                            Τι Περιλαμβάνει η Λύση
                        </h2>
                    </div>

                    <div className="features-grid grid md:grid-cols-2 gap-8">
                        {features.map((feature) => {
                            const Icon = feature.icon
                            return (
                                <div key={feature.title} className="feature-card bg-white rounded-2xl p-8 shadow-lg flex gap-6">
                                    <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-7 h-7 text-secondary" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                                        <p className="text-slate-600">{feature.description}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Technologies */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900">Τεχνολογίες που Χρησιμοποιήθηκαν</h2>
                        <p className="text-slate-600 mt-2">Αξιόπιστες λύσεις από κορυφαίους κατασκευαστές</p>
                    </div>

                    <div className="tech-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {technologies.map((tech) => (
                            <div key={tech.name} className="tech-item bg-slate-50 rounded-xl p-6 border border-slate-200">
                                <h4 className="font-bold text-slate-900 mb-1">{tech.name}</h4>
                                <p className="text-sm text-slate-600">{tech.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            <section className="py-20 bg-slate-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="text-6xl text-secondary/30 mb-6">"</div>
                    <blockquote className="text-2xl text-white mb-8">
                        Η DGSMART μας έδωσε πλήρη έλεγχο του θερμοκηπίου μας.
                        Η παραγωγή μας αυξήθηκε κατά 25% και εξοικονομούμε χιλιάδες ευρώ σε νερό κάθε χρόνο.
                    </blockquote>
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">ΚΠ</span>
                        </div>
                        <div className="text-left">
                            <p className="text-white font-semibold">Κώστας Παπαδόπουλος</p>
                            <p className="text-gray-400 text-sm">Ιδιοκτήτης, Θερμοκήπια Παπαδόπουλος</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-green-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Θέλετε Παρόμοια Αποτελέσματα;
                    </h2>
                    <p className="text-green-100 mb-8 text-lg">
                        Επικοινωνήστε μαζί μας για μια δωρεάν αξιολόγηση των αναγκών σας.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        Ξεκινήστε Σήμερα
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    )
}
