'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight, Droplets, Sun, BarChart3, Satellite, Cpu, Leaf } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import Link from 'next/link'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const solutions = [
    {
        icon: Droplets,
        title: 'Έξυπνη Άρδευση',
        description: 'Αυτόματα συστήματα άρδευσης με αισθητήρες υγρασίας εδάφους που προσαρμόζονται στις ανάγκες κάθε καλλιέργειας.',
        features: ['Αισθητήρες υγρασίας', 'Μετεωρολογικοί σταθμοί', 'Αυτόματη ρύθμιση'],
    },
    {
        icon: Sun,
        title: 'Κλιματικός Έλεγχος Θερμοκηπίων',
        description: 'Πλήρης έλεγχος θερμοκρασίας, υγρασίας και CO2 για βέλτιστες συνθήκες ανάπτυξης.',
        features: ['Έλεγχος θερμοκρασίας', 'Διαχείριση CO2', 'Αυτοματισμοί'],
    },
    {
        icon: Satellite,
        title: 'Drone Monitoring & NDVI',
        description: 'Αεροφωτογράφηση με drones για ανάλυση υγείας καλλιεργειών μέσω NDVI δεικτών.',
        features: ['NDVI mapping', 'Ανίχνευση ασθενειών', 'Πρόβλεψη αποδόσεων'],
    },
    {
        icon: Cpu,
        title: 'Digital Twin Καλλιεργειών',
        description: 'Ψηφιακό αντίγραφο της καλλιέργειας για προσομοίωση και βελτιστοποίηση.',
        features: ['3D modeling', 'Προσομοίωση', 'What-if analysis'],
    },
]

const useCases = [
    {
        title: 'Θερμοκήπιο 5 στρεμμάτων - Θεσσαλονίκη',
        description: 'Εγκατάσταση πλήρους συστήματος IoT για αυτοματοποιημένο έλεγχο θερμοκηπίου ντομάτας.',
        results: [
            '25% αύξηση παραγωγής',
            '30% μείωση κατανάλωσης νερού',
            '40% βελτίωση ποιότητας καρπού',
        ],
        image: '/smart-agriculture.jpg',
    },
    {
        title: 'Αμπελώνας 50 στρεμμάτων - Νεμέα',
        description: 'Σύστημα precision agriculture με αισθητήρες και drone monitoring για βέλτιστη διαχείριση.',
        results: [
            '20% μείωση λιπασμάτων',
            'Πρόωρη ανίχνευση ασθενειών',
            'Βελτιστοποίηση συγκομιδής',
        ],
        image: '/agriculture-greenhouse.jpg',
    },
    {
        title: 'Ελαιώνας 200 δέντρων - Καλαμάτα',
        description: 'Smart irrigation system με αισθητήρες και αυτοματοποιημένο πότισμα.',
        results: [
            '35% εξοικονόμηση νερού',
            'Βελτιωμένη ποιότητα ελαιολάδου',
            'Remote monitoring 24/7',
        ],
        image: '/drone-agriculture.jpg',
    },
]

const technologies = [
    { name: 'Milesight Sensors', description: 'AM107, EM300 για περιβαλλοντική παρακολούθηση' },
    { name: 'Milesight Gateways', description: 'UG65, UG67 για LoRaWAN connectivity' },
    { name: 'DJI Drones', description: 'Phantom 4 Multispectral για NDVI mapping' },
    { name: 'Custom Dashboards', description: 'Real-time monitoring & analytics' },
]

export default function SmartAgriculture() {
    const pageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero animation
            gsap.fromTo('.page-hero-content',
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
            )

            // Solutions cards
            gsap.fromTo('.solution-card',
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.15,
                    scrollTrigger: { trigger: '.solutions-grid', start: 'top 80%' }
                }
            )

            // Use cases
            gsap.fromTo('.use-case-card',
                { opacity: 0, x: -50 },
                {
                    opacity: 1, x: 0, duration: 0.8, stagger: 0.2,
                    scrollTrigger: { trigger: '.use-cases-section', start: 'top 80%' }
                }
            )
        }, pageRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={pageRef} className="min-h-screen bg-white">
            <Navigation />

            {/* Hero Section */}
            <section className="relative pt-[80px] min-h-[70vh] flex items-center bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url('/smart-agriculture.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="page-hero-content max-w-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <Leaf className="w-5 h-5 text-green-400" />
                            <span className="text-green-400 font-medium">Smart Agriculture</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                            Μετατρέπουμε τη Γεωργία με
                            <span className="text-green-400"> Τεχνολογία AI & IoT</span>
                        </h1>
                        <p className="text-lg text-gray-300 mb-8">
                            Από το χωράφι μέχρι το ράφι, παρέχουμε ολοκληρωμένες λύσεις precision agriculture
                            που αυξάνουν την απόδοση, μειώνουν το κόστος και βελτιώνουν τη βιωσιμότητα.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Ζητήστε Δωρεάν Αξιολόγηση
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Solutions Grid */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Λύσεις</span>
                        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
                            Ολοκληρωμένες Λύσεις για κάθε Καλλιέργεια
                        </h2>
                    </div>

                    <div className="solutions-grid grid md:grid-cols-2 gap-8">
                        {solutions.map((solution) => {
                            const Icon = solution.icon
                            return (
                                <div key={solution.title} className="solution-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                                        <Icon className="w-7 h-7 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{solution.title}</h3>
                                    <p className="text-slate-600 mb-4">{solution.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {solution.features.map((feature) => (
                                            <span key={feature} className="px-3 py-1 text-sm bg-green-50 text-green-700 rounded-full">
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="use-cases-section py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-green-600 font-semibold text-sm uppercase tracking-wider">Έργα</span>
                        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
                            Επιτυχημένα Έργα Smart Agriculture
                        </h2>
                    </div>

                    <div className="space-y-12">
                        {useCases.map((useCase, index) => (
                            <div key={useCase.title} className={`use-case-card grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                    <img
                                        src={useCase.image}
                                        alt={useCase.title}
                                        className="rounded-2xl shadow-xl w-full h-64 object-cover"
                                    />
                                </div>
                                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{useCase.title}</h3>
                                    <p className="text-slate-600 mb-6">{useCase.description}</p>
                                    <div className="space-y-3">
                                        <p className="font-semibold text-slate-900">Αποτελέσματα:</p>
                                        {useCase.results.map((result) => (
                                            <div key={result} className="flex items-center gap-3">
                                                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                                    <BarChart3 className="w-4 h-4 text-green-600" />
                                                </div>
                                                <span className="text-slate-700">{result}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technologies */}
            <section className="py-20 bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white">Τεχνολογίες που Χρησιμοποιούμε</h2>
                        <p className="mt-4 text-gray-400">Συνεργαζόμαστε με τους καλύτερους κατασκευαστές για αξιόπιστες λύσεις</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {technologies.map((tech) => (
                            <div key={tech.name} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                <h4 className="font-bold text-white mb-2">{tech.name}</h4>
                                <p className="text-sm text-gray-400">{tech.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-green-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Έτοιμοι να Μεταμορφώσετε την Καλλιέργειά σας;
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
