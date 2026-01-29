'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import QuoteModal from '../components/QuoteModal'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Υπηρεσίες', href: '/#services', isAnchor: true },
  { label: 'Λύσεις', href: '/#solutions', isAnchor: true },
  { label: 'Έργα', href: '/use-case', isAnchor: false },
  { label: 'Εταιρεία', href: '/about', isAnchor: false },
  { label: 'Επικοινωνία', href: '/contact', isAnchor: false },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isAnchor: boolean) => {
    if (isAnchor && pathname === '/') {
      e.preventDefault()
      const targetId = href.replace('/#', '')
      const target = document.getElementById(targetId)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-white'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-[80px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img
              src="/dgsmartLogo.png"
              alt="DGSMART"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleClick(e as any, item.href, item.isAnchor)}
                className="group flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-secondary transition-colors"
              >
                {item.label}
                {item.isAnchor && (
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-secondary rounded-lg hover:bg-secondary-dark transition-all hover:scale-105"
            >
              Ζητήστε Προσφορά
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 top-[80px] bg-white z-40 lg:hidden"
          >
            <div className="p-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleClick(e as any, item.href, item.isAnchor)}
                    className="flex items-center justify-between p-4 text-lg font-medium text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {item.label}
                    {item.isAnchor && <ChevronDown className="w-5 h-5" />}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsQuoteModalOpen(true)
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3 text-white bg-secondary rounded-lg font-semibold"
                >
                  Ζητήστε Προσφορά
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote Modal */}
      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </motion.header>
  )
}
