'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface QuoteModalProps {
  isOpen: boolean
  onClose: () => void
}

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

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setError(null)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to send quote request')

      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service: '',
          message: '',
        })
        onClose()
      }, 3000)
    } catch (error: any) {
      console.error('Error submitting quote request:', error)
      setError(error.message || 'Υπήρξε ένα σφάλμα. Παρακαλούμε προσπαθήστε ξανά.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto">
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-t-2xl flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Ζητήστε Προσφορά</h2>
                  <p className="text-gray-400 text-sm mt-1">
                    Συμπληρώστε τη φόρμα και θα επικοινωνήσουμε μαζί σας
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Form */}
              <div className="p-6">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      Το μήνυμα εστάλη επιτυχώς!
                    </h3>
                    <p className="text-slate-600">
                      Η ομάδα μας θα επικοινωνήσει μαζί σας εντός 24 ωρών.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="quote-name" className="block text-sm font-medium text-slate-700 mb-2">
                          Ονοματεπώνυμο *
                        </label>
                        <input
                          type="text"
                          id="quote-name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                          placeholder="Το όνομά σας"
                        />
                      </div>
                      <div>
                        <label htmlFor="quote-email" className="block text-sm font-medium text-slate-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="quote-email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="quote-company" className="block text-sm font-medium text-slate-700 mb-2">
                          Εταιρεία
                        </label>
                        <input
                          type="text"
                          id="quote-company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                          placeholder="Η εταιρεία σας"
                        />
                      </div>
                      <div>
                        <label htmlFor="quote-phone" className="block text-sm font-medium text-slate-700 mb-2">
                          Τηλέφωνο
                        </label>
                        <input
                          type="tel"
                          id="quote-phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                          placeholder="+30 210 000 0000"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="quote-service" className="block text-sm font-medium text-slate-700 mb-2">
                        Ενδιαφέρομαι για
                      </label>
                      <select
                        id="quote-service"
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

                    <div>
                      <label htmlFor="quote-message" className="block text-sm font-medium text-slate-700 mb-2">
                        Περιγραφή Project
                      </label>
                      <textarea
                        id="quote-message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all resize-none"
                        placeholder="Περιγράψτε μας το project σας..."
                      />
                    </div>

                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full group flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-dark hover:shadow-lg hover:shadow-secondary/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Αποστολή...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Αποστολή Αίτησης
                          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-center text-slate-500">
                      Πατώντας "Αποστολή" συμφωνείτε με την {' '}
                      <Link href="/" className="text-secondary hover:underline">Πολιτική Απορρήτου</Link> μας.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
