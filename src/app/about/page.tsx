'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Lightbulb, Users, Target, Rocket, Heart, Code, LineChart, Cpu, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const values = [
    {
        icon: Lightbulb,
        title: 'Καινοτομία',
        description: 'Διψάμε για νέες τεχνολογίες. Δεν σταματάμε ποτέ να μαθαίνουμε και να εξελισσόμαστε.',
    },
    {
        icon: Target,
        title: 'Επίλυση Προβλημάτων',
        description: 'Χρησιμοποιούμε την τεχνολογία όχι για να εντυπωσιάσουμε, αλλά για να λύσουμε πραγματικά προβλήματα.',
    },
    {
        icon: Rocket,
        title: 'R&D',
        description: 'Επενδύουμε συνεχώς στην έρευνα και ανάπτυξη. Αυτό μας δίνει την ενέργεια να προσαρμοζόμαστε σε κάθε νέο δεδομένο.',
    },
    {
        icon: Users,
        title: 'Επιχειρηματική Σκέψη',
        description: 'Είμαστε επιχειρηματίες και γνωρίζουμε ποια προβλήματα πρέπει να λυθούν για να πετύχει μια επιχείρηση.',
    },
    {
        icon: Code,
        title: 'Custom Solutions',
        description: 'Κάθε λύση είναι μοναδική και προσαρμοσμένη στις ανάγκες του πελάτη. Δεν υπάρχουν έτοιμα πακέτα.',
    },
    {
        icon: Heart,
        title: 'Συνεργασία',
        description: 'Συμβουλεύουμε και μεγαλώνουμε μαζί με τους πελάτες μας. Η επιτυχία τους είναι και δική μας επιτυχία.',
    },
]

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
        const trigger = ScrollTrigger.create({
            trigger: ref.current,
            start: 'top 85%',
            onEnter: () => {
                if (hasAnimated.current) return
                hasAnimated.current = true
                const obj = { value: 0 }
                gsap.to(obj, {
                    value: end,
                    duration: 2.5,
                    ease: 'power2.out',
                    onUpdate: () => setCount(Math.floor(obj.value))
                })
            }
        })
        return () => trigger.kill()
    }, [end])

    return (
        <div ref={ref} className="text-4xl sm:text-5xl font-bold text-white">
            {count.toLocaleString()}{suffix}
        </div>
    )
}

export default function About() {
    const pageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.mission-content',
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
            )

            gsap.fromTo('.value-card',
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.1,
                    scrollTrigger: { trigger: '.values-grid', start: 'top 80%' }
                }
            )

            gsap.fromTo('.stat-card',
                { opacity: 0, scale: 0.9 },
                {
                    opacity: 1, scale: 1, duration: 0.6, stagger: 0.1,
                    scrollTrigger: { trigger: '.stats-section', start: 'top 80%' }
                }
            )
        }, pageRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={pageRef} className="min-h-screen bg-white">
            <Navigation />

            {/* Hero / Mission Section */}
            <section className="relative pt-[80px] min-h-[80vh] flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-black overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/30 rounded-full blur-[150px]" />
                    <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px]" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="mission-content max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Sparkles className="w-5 h-5 text-secondary" />
                            <span className="text-secondary font-medium">Η Φιλοσοφία μας</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
                            Μετατρέπουμε Ιδέες σε
                            <span className="text-secondary"> Πραγματικότητα</span>
                        </h1>

                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            Είμαστε εδώ για να ακούσουμε την ιδέα σας και να την κάνουμε πραγματικότητα.
                            Δεν πουλάμε απλώς τεχνολογία - λύνουμε πραγματικά προβλήματα για πραγματικές επιχειρήσεις.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-dark transition-colors"
                            >
                                Πείτε μας την Ιδέα σας
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who We Are Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Ποιοι Είμαστε</span>
                            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                                Μέλη του Ομίλου DGSOFT
                            </h2>
                            <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                                Η DGSMART είναι μέλος του ομίλου <strong>DGSOFT</strong>, ενός από τους μεγαλύτερους
                                ERP integrators στην Ελλάδα. Αυτή η συνεργασία μας δίνει πρόσβαση σε
                                δεκαετίες εμπειρίας στην ενσωμάτωση επιχειρηματικών συστημάτων.
                            </p>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                Εφευρίσκουμε τα "ελλείποντα κομμάτια" μιας επιτυχημένης επιχείρησης.
                                Κάθε λύση που σχεδιάζουμε είναι μοναδική και προσαρμοσμένη στις ανάγκες
                                του κάθε πελάτη. Δεν υπάρχουν έτοιμα πακέτα - μόνο custom solutions.
                            </p>
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                                <Cpu className="w-10 h-10 text-secondary" />
                                <div>
                                    <p className="font-semibold text-slate-900">AI & IoT Integrators</p>
                                    <p className="text-sm text-slate-500">Εξειδίκευση σε καινοτόμες τεχνολογίες</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src="/ai-ml.jpg"
                                alt="AI Technology"
                                className="rounded-2xl shadow-2xl w-full"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                                <LineChart className="w-10 h-10 text-secondary mb-2" />
                                <p className="text-2xl font-bold text-slate-900">150+</p>
                                <p className="text-slate-500">Επιτυχημένα Έργα</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Approach */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Η Προσέγγισή μας</span>
                        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
                            Πώς Δουλεύουμε
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '01',
                                title: 'Ακούμε',
                                description: 'Σας ακούμε προσεκτικά για να κατανοήσουμε τις ανάγκες, τους στόχους και τις προκλήσεις της επιχείρησής σας.',
                            },
                            {
                                step: '02',
                                title: 'Αναλύουμε',
                                description: 'Αναλύουμε το υπάρχον σύστημα και σχεδιάζουμε την βέλτιστη λύση που ανταποκρίνεται στις ανάγκες σας.',
                            },
                            {
                                step: '03',
                                title: 'Υλοποιούμε',
                                description: 'Υλοποιούμε την λύση με προσοχή στη λεπτομέρεια, πάντα με γνώμονα την επίλυση του πραγματικού προβλήματος.',
                            },
                        ].map((item) => (
                            <div key={item.step} className="bg-white rounded-2xl p-8 shadow-lg">
                                <span className="text-5xl font-bold text-secondary/20">{item.step}</span>
                                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-3">{item.title}</h3>
                                <p className="text-slate-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Αξίες</span>
                        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
                            Οι Αξίες που μας Καθοδηγούν
                        </h2>
                    </div>

                    <div className="values-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values.map((value) => {
                            const Icon = value.icon
                            return (
                                <div key={value.title} className="value-card bg-slate-50 rounded-2xl p-8 hover:shadow-xl transition-shadow">
                                    <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                                        <Icon className="w-7 h-7 text-secondary" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                                    <p className="text-slate-600">{value.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section py-20 bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="stat-card text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                                <CountUp end={stat.value} suffix={stat.suffix} />
                                <div className="text-gray-400 mt-2">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-secondary">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Έχετε μια Ιδέα; Ας την Κάνουμε Πραγματικότητα.
                    </h2>
                    <p className="text-white/80 mb-8 text-lg">
                        Είμαστε εδώ για να σας ακούσουμε. Κάθε μεγάλο project ξεκινάει από μια ιδέα.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-secondary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        Ξεκινήστε τη Συζήτηση
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    )
}
