'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Check, Mail, Phone, MapPin, Send, Clock, MessageSquare } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const contactInfo = [
    {
        icon: Mail,
        title: 'Email',
        value: 'info@dgsmart.gr',
        description: 'Απαντάμε εντός 24 ωρών',
    },
    {
        icon: Phone,
        title: 'Τηλέφωνο',
        value: '+30 210 000 0000',
        description: 'Δευτέρα - Παρασκευή 9:00 - 18:00',
    },
    {
        icon: MapPin,
        title: 'Διεύθυνση',
        value: 'Αθήνα, Ελλάδα',
        description: 'Επισκεφθείτε τα γραφεία μας',
    },
    {
        icon: Clock,
        title: 'Ώρες Λειτουργίας',
        value: 'Δευ - Παρ: 9:00 - 18:00',
        description: 'Τεχνική Υποστήριξη 24/7',
    },
]

const services = [
    'Smart Agriculture',
    'Smart Buildings',
    'LiDAR & 3D Scanning',
    'Digital Twins',
    'ERP Integration',
    'AI & Computer Vision',
    'IoT Solutions',
    'Data Analytics',
]

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        message: '',
    })
    const [isSubmitted, setIsSubmitted] = useState(false)
    const pageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.contact-hero',
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
            )

            gsap.fromTo('.info-card',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.6, stagger: 0.1,
                    scrollTrigger: { trigger: '.info-grid', start: 'top 85%' }
                }
            )

            gsap.fromTo('.form-container',
                { opacity: 0, x: 50 },
                {
                    opacity: 1, x: 0, duration: 0.8,
                    scrollTrigger: { trigger: '.form-section', start: 'top 80%' }
                }
            )
        }, pageRef)

        return () => ctx.revert()
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitted(true)
        setTimeout(() => setIsSubmitted(false), 3000)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div ref={pageRef} className="min-h-screen bg-white">
            <Navigation />

            {/* Hero Section */}
            <section className="contact-hero relative pt-[80px] bg-gradient-to-br from-slate-900 via-slate-800 to-black overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-[120px]" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <MessageSquare className="w-12 h-12 text-secondary mx-auto mb-6" />
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Επικοινωνήστε Μαζί μας
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Έχετε ένα project στο μυαλό σας; Θα χαρούμε να σας ακούσουμε και να βρούμε
                        την καλύτερη λύση για τις ανάγκες σας.
                    </p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="info-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info) => {
                            const Icon = info.icon
                            return (
                                <div key={info.title} className="info-card bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                                        <Icon className="w-6 h-6 text-secondary" />
                                    </div>
                                    <h3 className="font-semibold text-slate-900 mb-1">{info.title}</h3>
                                    <p className="text-slate-900 font-medium mb-1">{info.value}</p>
                                    <p className="text-sm text-slate-500">{info.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="form-section py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Left - Info */}
                        <div>
                            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                                Φόρμα Επικοινωνίας
                            </span>
                            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                                Πείτε μας για το Project σας
                            </h2>
                            <p className="text-slate-600 mb-8">
                                Συμπληρώστε τη φόρμα και η ομάδα μας θα επικοινωνήσει μαζί σας
                                εντός 24 ωρών για μια δωρεάν αξιολόγηση.
                            </p>

                            <div className="space-y-4">
                                <h4 className="font-semibold text-slate-900">Υπηρεσίες που προσφέρουμε:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {services.map((service) => (
                                        <span key={service} className="px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded-full">
                                            {service}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 p-6 bg-secondary/5 rounded-xl border border-secondary/20">
                                <h4 className="font-semibold text-slate-900 mb-2">Γιατί DGSMART;</h4>
                                <ul className="space-y-2 text-slate-600">
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-secondary" />
                                        Πιστοποιημένοι μηχανικοί & developers
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-secondary" />
                                        Custom λύσεις προσαρμοσμένες στις ανάγκες σας
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-secondary" />
                                        24/7 Υποστήριξη & monitoring
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-secondary" />
                                        Εγγύηση εργασίας & after-sales support
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Right - Form */}
                        <div className="form-container">
                            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                                            Ονοματεπώνυμο *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                            placeholder="Το όνομά σας"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6 mt-6">
                                    <div>
                                        <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                                            Εταιρεία
                                        </label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                            placeholder="Η εταιρεία σας"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                                            Τηλέφωνο
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                            placeholder="+30 210 000 0000"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-2">
                                        Ενδιαφέρομαι για
                                    </label>
                                    <select
                                        id="service"
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                    >
                                        <option value="">Επιλέξτε υπηρεσία</option>
                                        {services.map((service) => (
                                            <option key={service} value={service}>{service}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mt-6">
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                                        Μήνυμα
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all resize-none"
                                        placeholder="Περιγράψτε μας το project σας, τις ανάγκες σας και τους στόχους σας..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitted}
                                    className={`mt-6 w-full group flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-lg transition-all duration-300 ${isSubmitted
                                            ? 'bg-green-500 text-white'
                                            : 'bg-secondary text-white hover:bg-secondary-dark hover:shadow-lg hover:shadow-secondary/30'
                                        }`}
                                >
                                    {isSubmitted ? (
                                        <>
                                            <Check className="w-5 h-5" />
                                            Το μήνυμα εστάλη επιτυχώς!
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Αποστολή Μηνύματος
                                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
