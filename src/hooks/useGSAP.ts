import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useSmoothScroll = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]')
    
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href')
        if (href && href !== '#') {
          e.preventDefault()
          const target = document.querySelector(href)
          if (target) {
            gsap.to(window, {
              duration: 1.2,
              scrollTo: { y: target, offsetY: 80 },
              ease: 'power3.inOut',
            })
          }
        }
      })
    })

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', () => {})
      })
    }
  }, [])
}

export const useParallax = (speed: number = 0.5) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    
    gsap.to(element, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === element) {
          st.kill()
        }
      })
    }
  }, [speed])

  return ref
}

export const useScrollReveal = (
  options: {
    y?: number
    opacity?: number
    duration?: number
    delay?: number
    stagger?: number
    start?: string
  } = {}
) => {
  const ref = useRef<HTMLDivElement>(null)
  const {
    y = 60,
    opacity = 0,
    duration = 1,
    delay = 0,
    stagger = 0.1,
    start = 'top 80%',
  } = options

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const children = element.children.length > 0 ? element.children : [element]

    gsap.set(children, { y, opacity })

    gsap.to(children, {
      y: 0,
      opacity: 1,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: 'play none none none',
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === element) {
          st.kill()
        }
      })
    }
  }, [y, opacity, duration, delay, stagger, start])

  return ref
}

export const useCountUp = (end: number, duration: number = 2) => {
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return

    const element = ref.current

    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      onEnter: () => {
        if (hasAnimated.current) return
        hasAnimated.current = true

        const obj = { value: 0 }
        gsap.to(obj, {
          value: end,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            if (element) {
              element.textContent = Math.floor(obj.value).toLocaleString()
            }
          },
        })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === element) {
          st.kill()
        }
      })
    }
  }, [end, duration])

  return ref
}

export default gsap
