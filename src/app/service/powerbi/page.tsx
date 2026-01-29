'use client'

import { BarChart3, TrendingUp, PieChart, LineChart, Database, Share2, Zap, Eye, FileText, Layers, ArrowRight, Check } from 'lucide-react'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import Link from 'next/link'

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

const useCases = [
    {
        title: 'Επιχειρηματική Αναφορά',
        description: 'Ολοκληρωμένα dashboards για executives με KPIs, trends και forecasts.',
        bullets: ['Executive dashboards', 'Financial reporting', 'Sales analytics', 'Performance tracking'],
    },
    {
        title: 'Operations Monitoring',
        description: 'Real-time monitoring επιχειρησιακών διαδικασιών και metrics.',
        bullets: ['Production monitoring', 'Supply chain visibility', 'Quality control', 'Resource planning'],
    },
    {
        title: 'Customer Analytics',
        description: 'Ανάλυση συμπεριφοράς πελατών και segmentation.',
        bullets: ['Customer segmentation', 'Churn prediction', 'Lifetime value', 'Campaign analysis'],
    },
]

export default function PowerBIService() {
    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-[80px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 rounded-full mb-6">
                                <BarChart3 className="w-5 h-5 text-secondary" />
                                <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Business Intelligence</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                                Power BI & <span className="text-secondary">Advanced Reporting</span>
                            </h1>
                            <p className="text-lg text-slate-300 mb-8 max-w-xl">
                                Μετατρέψτε τα δεδομένα σας σε δράσιμες πληροφορίες με τις επαγγελματικές μας λύσεις
                                Power BI. Δημιουργούμε διαδραστικά dashboards και αναφορές που σας βοηθούν να λαμβάνετε
                                αποφάσεις βασισμένες σε δεδομένα.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary-dark transition-all hover:scale-105 shadow-lg shadow-secondary/30"
                                >
                                    <BarChart3 className="w-5 h-5" />
                                    Ζητήστε Demo Dashboard
                                </Link>
                                <Link
                                    href="#features"
                                    className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
                                >
                                    Μάθετε περισσότερα
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src="/powerbi-dashboard.jpg"
                                alt="Power BI Dashboard"
                                className="rounded-2xl shadow-2xl"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                                <div className="flex items-center gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-secondary">150+</div>
                                        <div className="text-xs text-slate-600">Dashboards</div>
                                    </div>
                                    <div className="w-px h-10 bg-slate-200" />
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-secondary">50+</div>
                                        <div className="text-xs text-slate-600">Clients</div>
                                    </div>
                                    <div className="w-px h-10 bg-slate-200" />
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-secondary">99%</div>
                                        <div className="text-xs text-slate-600">Uptime</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 lg:py-28 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Χαρακτηριστικά</span>
                        <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
                            Ολοκληρωμένες Δυνατότητες BI
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {powerBIFeatures.map((feature) => {
                            const Icon = feature.icon
                            return (
                                <div
                                    key={feature.title}
                                    className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-secondary/30"
                                >
                                    <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:scale-110 transition-all">
                                        <Icon className="w-7 h-7 text-secondary group-hover:text-white transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                    <p className="text-slate-600">{feature.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Report Types Section */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Τύποι Αναφορών</span>
                        <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                            Εξειδικευμένες Αναφορές για κάθε Τμήμα
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Δημιουργούμε custom reports και dashboards προσαρμοσμένα στις ανάγκες κάθε τμήματος της επιχείρησής σας.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {reportTypes.map((type) => {
                            const Icon = type.icon
                            return (
                                <div
                                    key={type.label}
                                    className="flex items-center gap-3 px-6 py-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-secondary hover:bg-secondary/5 transition-all cursor-pointer"
                                >
                                    <Icon className="w-5 h-5 text-secondary" />
                                    <span className="text-slate-900 font-medium">{type.label}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section className="py-20 lg:py-28 bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Use Cases</span>
                        <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                            Πρακτικές Εφαρμογές
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {useCases.map((useCase) => (
                            <div
                                key={useCase.title}
                                className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-secondary/50 hover:bg-white/10 transition-all"
                            >
                                <h3 className="text-xl font-bold text-white mb-3">{useCase.title}</h3>
                                <p className="text-slate-400 mb-6">{useCase.description}</p>
                                <ul className="space-y-2">
                                    {useCase.bullets.map((bullet) => (
                                        <li key={bullet} className="flex items-center gap-2 text-sm text-slate-300">
                                            <Check className="w-4 h-4 text-secondary flex-shrink-0" />
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 lg:py-28 bg-gradient-to-br from-secondary to-secondary-dark">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                        Έτοιμοι να Μεταμορφώσετε τα Δεδομένα σας;
                    </h2>
                    <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                        Επικοινωνήστε μαζί μας σήμερα για να συζητήσουμε τις ανάγκες σας και να σας παρουσιάσουμε
                        ένα customized demo dashboard.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-secondary font-semibold rounded-xl hover:bg-slate-100 transition-all hover:scale-105 shadow-xl"
                    >
                        <BarChart3 className="w-5 h-5" />
                        Ζητήστε Δωρεάν Demo
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    )
}
