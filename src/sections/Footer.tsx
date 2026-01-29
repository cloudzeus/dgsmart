'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Linkedin,
  Youtube,
  Facebook,
  Instagram,
  ArrowRight
} from 'lucide-react'

const footerLinks = {
  services: [
    { label: 'LiDAR Ανίχνευση', href: '/service/lidar' },
    { label: 'Έξυπνη Γεωργία', href: '/smart-agriculture' },
    { label: 'Έξυπνα Κτίρια', href: '/service/smart-building' },
    { label: 'Έξυπνη Αποθήκευση', href: '/service/smart-warehouse' },
    { label: 'Ενσωμάτωση ERP', href: '/service/erp-integration' },
    { label: 'AI & Machine Learning', href: '/service/ai-ml' },
    { label: 'Power BI & Reporting', href: '/service/powerbi' },
  ],
  solutions: [
    { label: 'Έξυπνη Βιομηχανία', href: '/#solutions' },
    { label: 'Έξυπνο Λιανικό', href: '/#solutions' },
    { label: 'LiDAR & 3D Σάρωση', href: '/#solutions' },
    { label: 'Logistics & Αποθήκευση', href: '/#solutions' },
    { label: 'Ενεργειακή Διαχείριση', href: '/#solutions' },
  ],
  company: [
    { label: 'Σχετικά με εμάς', href: '/about' },
    { label: 'Έργα', href: '/use-case' },
    { label: 'Νέα', href: '/' },
    { label: 'Καριέρα', href: '/' },
    { label: 'Επικοινωνία', href: '/contact' },
    { label: 'Τεχνική Υποστήριξη', href: '/contact' },
  ],
}

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail('')
  }

  return (
    <footer className="bg-background-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Newsletter */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img
                src="/dgsmartLogo.png"
                alt="DGSMART"
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              AI & IoT Integrator. Μετατρέπουμε τις ιδέες σε έξυπνες λύσεις.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-3">Εγγραφή στο Newsletter</p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Το email σας"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-secondary transition-colors"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-secondary rounded-lg hover:bg-secondary-dark transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              <a
                href="#"
                className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Υπηρεσίες</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold mb-4">Λύσεις</h4>
            <ul className="space-y-2">
              {footerLinks.solutions.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Εταιρεία</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              Copyright © {new Date().getFullYear()} DGSMART. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/" className="text-sm text-gray-500 hover:text-secondary transition-colors">
                Όροι Χρήσης
              </Link>
              <Link href="/" className="text-sm text-gray-500 hover:text-secondary transition-colors">
                Πολιτική Απορρήτου
              </Link>
              <Link href="/" className="text-sm text-gray-500 hover:text-secondary transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
