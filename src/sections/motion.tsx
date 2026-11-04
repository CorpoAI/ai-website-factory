'use client'

import { useEffect, useRef, useState } from 'react'

/** Adds `.is-in` to every [data-reveal] element when it scrolls into view. */
export function RevealObserver() {
  useEffect(() => {
    const root = document.querySelector('[data-site-root]')
    if (!root) return
    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    // Elements already on screen appear immediately; the rest animate on scroll.
    els.forEach((el) => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight) el.classList.add('is-in')
      else io.observe(el)
    })
    root.classList.add('reveal-ready')
    return () => io.disconnect()
  }, [])
  return null
}

/** Counts a number up when visible. Keeps prefix/suffix ("15+", "98%", "5 lat"). */
export function CountUp({ value }: { value: string }) {
  const m = value.match(/^(\D*)(\d[\d\s.,]*)(.*)$/)
  const target = m ? Number(m[2].replace(/[\s,]/g, '').replace(',', '.')) : NaN
  // Render the real value first (no-JS, SEO, screenshots); animate from 0 on view.
  const [n, setN] = useState(target)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!ref.current || Number.isNaN(target)) return
    const el = ref.current
    if (el.getBoundingClientRect().top < window.innerHeight) return // already visible: keep final value
    setN(0)
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const dur = 1400
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur)
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [target])

  if (!m || Number.isNaN(target)) return <span>{value}</span>
  return (
    <span ref={ref}>
      {m[1]}
      {n.toLocaleString('pl-PL')}
      <span className="text-[0.5em] align-top">{m[3]}</span>
    </span>
  )
}

/** Fades the header from transparent to solid after scrolling past the hero top. */
export function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > threshold)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [threshold])
  return scrolled
}
