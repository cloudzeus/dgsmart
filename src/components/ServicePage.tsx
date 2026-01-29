'use client'

import { ArrowRight, Check } from 'lucide-react'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import Link from 'next/link'

// Service data configuration
const serviceConfigs: Record<string, {
    title: string
    subtitle: string
    description: string
    image: string
    features: { title: string; description: string }[]
    bullets: string[]
    stats: { value: string; label: string }[]
    ctaText: string
}> = {
    lidar: {
        title: 'LiDAR Ανίχνευση & 3D Σάρωση',
        subtitle: 'Ακριβής 3D Αποτύπωση',
        description: 'Προηγμένη τεχνολογία LiDAR για ακριβή 3D σάρωση χώρων, κτιρίων και εξωτερικών περιοχών. Ιδανικό για αρχιτεκτονικές μελέτες, αποτυπώσεις και δημιουργία Digital Twins.',
        image: '/lidar-scan.jpg',
        features: [
            { title: '3D Point Cloud', description: 'Δημιουργία λεπτομερούς νέφους σημείων με εκατομμύρια μετρήσεις.' },
            { title: 'Ακρίβεια ±2mm', description: 'Εξαιρετική ακρίβεια για επαγγελματικές εφαρμογές και μελέτες.' },
            { title: 'BIM Integration', description: 'Ενσωμάτωση με Building Information Modeling συστήματα.' },
        ],
        bullets: [
            'Ακρίβεια ±2mm',
            'BIM ready exports',
            'Digital twin creation',
            'Volume calculations',
            'Change detection',
            'As-built documentation',
        ],
        stats: [
            { value: '±2mm', label: 'Ακρίβεια' },
            { value: '500m', label: 'Εμβέλεια' },
            { value: '24h', label: 'Παράδοση' },
        ],
        ctaText: 'Ζητήστε Προσφορά Σάρωσης',
    },
    'smart-building': {
        title: 'Έξυπνα Κτίρια',
        subtitle: 'BMS & Automation',
        description: 'Ολοκληρωμένες λύσεις αυτοματισμού κτιρίων με έλεγχο φωτισμού, κλιματισμού, ασφάλειας και ενεργειακής διαχείρισης για μέγιστη απόδοση και άνεση.',
        image: '/smart-building.jpg',
        features: [
            { title: 'Ενεργειακή Διαχείριση', description: 'Αυτοματοποιημένος έλεγχος φωτισμού, κλιματισμού και θέρμανσης.' },
            { title: 'Ασφάλεια & Πρόσβαση', description: 'Συστήματα ελέγχου πρόσβασης, CCTV και συναγερμοί με AI.' },
            { title: 'Περιβαλλοντικός Έλεγχος', description: 'Παρακολούθηση ποιότητας αέρα, θερμοκρασίας και υγρασίας.' },
        ],
        bullets: [
            'Έλεγχος φωτισμού με αισθητήρες',
            'Smart thermostat & κλιματισμός',
            'Παρακολούθηση ενέργειας',
            'Συναγερμοί & CCTV με AI',
            'Έλεγχος πρόσβασης',
            'Ανίχνευση διαρροών',
        ],
        stats: [
            { value: '-35%', label: 'Ενέργεια' },
            { value: '+25%', label: 'Άνεση' },
            { value: '24/7', label: 'Monitoring' },
        ],
        ctaText: 'Σχεδιάστε το Smart Building σας',
    },
    'smart-warehouse': {
        title: 'Έξυπνη Αποθήκευση',
        subtitle: 'RFID & Robotics',
        description: 'Συστήματα διαχείρισης αποθήκης με real-time παρακολούθηση αποθεμάτων, αυτοματοποιημένη ταξινόμηση και βελτιστοποίηση logistics.',
        image: '/smart-warehouse.jpg',
        features: [
            { title: 'Real-time Tracking', description: 'Πλήρης ορατότητα των αποθεμάτων με RFID και barcode scanning.' },
            { title: 'Αυτοματοποιημένη Ταξινόμηση', description: 'Έξυπνα ρομπότ και conveyors για αυτόματη ταξινόμηση.' },
            { title: 'Πρόβλεψη Ζήτησης', description: 'AI αλγόριθμοι που προβλέπουν ζήτηση και βελτιστοποιούν αποθέματα.' },
        ],
        bullets: [
            'RFID & barcode tracking',
            'Αυτοματοποιημένη ταξινόμηση',
            'Pick-to-light συστήματα',
            'Πρόβλεψη αποθεμάτων',
            'Βελτιστοποίηση διαδρομών',
            'Αναφορές & analytics',
        ],
        stats: [
            { value: '+60%', label: 'Ταχύτητα' },
            { value: '-90%', label: 'Λάθη' },
            { value: '18m', label: 'ROI' },
        ],
        ctaText: 'Βελτιστοποιήστε την Αποθήκη σας',
    },
    'erp-integration': {
        title: 'Ενσωμάτωση ERP',
        subtitle: 'Softone & Custom APIs',
        description: 'Πλήρης ενσωμάτωση IoT και AI συστημάτων με Softone, SAP, Oracle και Microsoft Dynamics για απρόσκοπτη ροή δεδομένων.',
        image: '/erp-integration.jpg',
        features: [
            { title: 'Διασύνδεση Συστημάτων', description: 'Απρόσκοπτη ενσωμάτωση IoT δεδομένων με οποιοδήποτε ERP.' },
            { title: 'Αυτοματοποίηση Διαδικασιών', description: 'Αυτόματη ενημέρωση αποθεμάτων, παραγγελιών και τιμολογίων.' },
            { title: 'Ενιαία Αναφορά', description: 'Ενοποιημένα dashboards με δεδομένα από όλες τις πηγές.' },
        ],
        bullets: [
            'Softone ενσωμάτωση',
            'SAP ενσωμάτωση',
            'Oracle NetSuite',
            'API διασυνδέσεις',
            'Real-time συγχρονισμός',
            'Custom integrations',
        ],
        stats: [
            { value: '100%', label: 'Sync' },
            { value: '-50%', label: 'Χρόνος' },
            { value: '0', label: 'Λάθη' },
        ],
        ctaText: 'Ενσωματώστε το ERP σας',
    },
    'ai-ml': {
        title: 'AI & Machine Learning',
        subtitle: 'Predictive Analytics',
        description: 'Εξατομικευμένες AI λύσεις για ανάλυση δεδομένων, πρόβλεψη συντήρησης, αναγνώριση εικόνας και αυτοματοποίηση διαδικασιών.',
        image: '/ai-ml.jpg',
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
        stats: [
            { value: '95%', label: 'Accuracy' },
            { value: '-40%', label: 'Downtime' },
            { value: '3x', label: 'ROI' },
        ],
        ctaText: 'Ανακαλύψτε τις Δυνατότητες AI',
    },
    'computer-vision': {
        title: 'Computer Vision',
        subtitle: 'Object Detection & QC',
        description: 'Προηγμένα συστήματα όρασης υπολογιστή για αναγνώριση αντικειμένων, ανίχνευση ελαττωμάτων, quality control και αυτοματοποιημένη παρακολούθηση.',
        image: '/ai-ml.jpg',
        features: [
            { title: 'Object Detection', description: 'Αναγνώριση και εντοπισμός αντικειμένων σε real-time.' },
            { title: 'Quality Control', description: 'Αυτόματος έλεγχος ποιότητας με AI αναγνώριση ελαττωμάτων.' },
            { title: 'Real-time Analysis', description: 'Άμεση ανάλυση και απόκριση σε κάθε κατάσταση.' },
        ],
        bullets: [
            'Object detection',
            'Quality control',
            'Real-time analysis',
            'Face recognition',
            'OCR & text extraction',
            'Video analytics',
        ],
        stats: [
            { value: '99%', label: 'Accuracy' },
            { value: '<100ms', label: 'Response' },
            { value: '24/7', label: 'Operation' },
        ],
        ctaText: 'Υλοποιήστε Computer Vision',
    },
    compliance: {
        title: 'Συμμόρφωση & Ασφάλεια',
        subtitle: 'GDPR, NIS2, HASP',
        description: 'Πλήρης συμμόρφωση με HASP, GDPR, NIS2 και κανονισμούς ασφάλειας προσωπικού. Διασφάλιση προστασίας δεδομένων και ασφαλούς λειτουργίας.',
        image: '/smart-building.jpg',
        features: [
            { title: 'GDPR Compliance', description: 'Πλήρης συμμόρφωση με τον κανονισμό προστασίας δεδομένων.' },
            { title: 'NIS2 Ready', description: 'Προετοιμασία για την οδηγία NIS2 για την κυβερνοασφάλεια.' },
            { title: 'HASP Safety', description: 'Συμμόρφωση με κανονισμούς ασφάλειας προσωπικού.' },
        ],
        bullets: [
            'GDPR Compliance',
            'NIS2 Ready',
            'HASP Safety',
            'Data encryption',
            'Access control',
            'Audit trails',
        ],
        stats: [
            { value: '100%', label: 'Compliance' },
            { value: '0', label: 'Incidents' },
            { value: 'ISO', label: 'Certified' },
        ],
        ctaText: 'Εξασφαλίστε Συμμόρφωση',
    },
}

export default function ServicePage({ serviceId }: { serviceId: string }) {
    const config = serviceConfigs[serviceId] || serviceConfigs.lidar

    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-[80px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="animate-fade-in">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 rounded-full mb-6">
                                <span className="text-secondary font-semibold text-sm uppercase tracking-wider">{config.subtitle}</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                                {config.title}
                            </h1>
                            <p className="text-lg text-slate-300 mb-8 max-w-xl">
                                {config.description}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary-dark transition-all hover:scale-105 shadow-lg shadow-secondary/30"
                                >
                                    {config.ctaText}
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src={config.image}
                                alt={config.title}
                                className="rounded-2xl shadow-2xl"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                                <div className="flex items-center gap-4">
                                    {config.stats.map((stat, index) => (
                                        <div key={index} className="text-center">
                                            <div className="text-2xl font-bold text-secondary">{stat.value}</div>
                                            <div className="text-xs text-slate-600">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 lg:py-28 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Χαρακτηριστικά</span>
                        <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
                            Ολοκληρωμένες Δυνατότητες
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {config.features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100"
                            >
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Τι Περιλαμβάνεται</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {config.bullets.map((bullet, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Check className="w-4 h-4 text-secondary" />
                                    </div>
                                    <span className="text-slate-700">{bullet}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 lg:py-28 bg-gradient-to-br from-secondary to-secondary-dark">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                        Έτοιμοι να Ξεκινήσετε;
                    </h2>
                    <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                        Επικοινωνήστε μαζί μας σήμερα για να συζητήσουμε τις ανάγκες σας και να σας παρουσιάσουμε
                        μια customized λύση για την επιχείρησή σας.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-secondary font-semibold rounded-xl hover:bg-slate-100 transition-all hover:scale-105 shadow-xl"
                    >
                        {config.ctaText}
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    )
}
