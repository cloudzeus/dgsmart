import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const articles = [
  {
    title: 'Η Τεχνολογία LiDAR στη Βιομηχανική Αποτύπωση',
    tags: ['LiDAR', 'Τεχνολογία', 'BIM'],
    image: '/lidar-scan.jpg',
    date: '15 Ιαν 2026',
  },
  {
    title: 'AI στη Γεωργία: Το Μέλλον της Καλλιέργειας',
    tags: ['AI', 'Έξυπνη Γεωργία', 'Drones'],
    image: '/smart-agriculture.jpg',
    date: '10 Ιαν 2026',
  },
  {
    title: 'Έξυπνα Κτίρια: Εξοικονόμηση Ενέργειας με IoT',
    tags: ['IoT', 'Έξυπνα Κτίρια', 'Energy'],
    image: '/smart-building.jpg',
    date: '5 Ιαν 2026',
  },
]

export default function StayUpdated() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.news-header',
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

      // Cards animation
      const cards = gsap.utils.toArray('.news-card') as HTMLElement[]
      cards.forEach((card, index) => {
        const image = card.querySelector('.card-image')

        // Card entrance
        gsap.fromTo(card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        )

        // Image parallax
        gsap.to(image, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="news-header mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Νέα & Insights
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Τελευταία Νέα από τον Κόσμο της Τεχνολογίας
          </h2>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.title}
              className="news-card group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-56 rounded-xl overflow-hidden mb-4">
                <div className="card-image absolute inset-0 w-full h-[120%]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Arrow Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                  <ArrowUpRight className="w-5 h-5 text-slate-900" />
                </div>

                {/* Date badge */}
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-slate-700">
                  {article.date}
                </div>
              </div>

              {/* Content */}
              <div className="card-content">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-secondary/10 text-secondary rounded-full group-hover:bg-secondary group-hover:text-white transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-secondary transition-colors line-clamp-2">
                  {article.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
