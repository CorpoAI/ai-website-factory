'use client'

import { useEffect, useState } from 'react'
import type { Dict } from '@/engine/i18n'
import type { ContactSection, SiteConfig } from '@/engine/types'
import { Hours } from './interactive'
import { useLead } from './lead'
import { useScrolled } from './motion'
import { Arrow, Rich, fullAddress, telHref, type SectionProps } from './ui'

/** Header is transparent over a full-bleed hero photo, solid after scrolling. */
export function Header({ site, d, overlay }: { site: SiteConfig; d: Dict; overlay: boolean }) {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(60)
  const b = site.business
  const links = site.sections.filter((s) => s.nav && s.id)
  const hero = site.sections.find((s) => s.type === 'hero')
  const cta = hero?.type === 'hero' ? hero.primaryCta : undefined
  const solid = !overlay || scrolled || open

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? 'bg-bg/95 text-ink shadow-[0_1px_0_rgb(var(--c-line))] backdrop-blur' : 'bg-transparent text-white'}`}>
      <DemoBanner site={site} d={d} />
      <div className={`container-site flex items-center justify-between gap-6 transition-all duration-500 ${solid ? 'h-16' : 'h-20'}`}>
        <a href="#" className="flex items-center gap-3">
          {b.logo?.src ? (
            <img src={b.logo.src} alt={b.name} className="h-9 w-auto" />
          ) : (
            <span className="font-display text-2xl leading-none">{b.name}</span>
          )}
        </a>
        <nav className="hidden items-center gap-8 text-[13px] font-medium uppercase tracking-[0.14em] lg:flex">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="link-underline opacity-80 transition hover:opacity-100">
              {l.nav}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          {b.phone && (
            <a href={telHref(b.phone)} className="hidden text-sm font-semibold tabular-nums xl:block">
              {b.phone}
            </a>
          )}
          {cta && (
            <a href={cta.href} className="btn-primary hidden !px-5 !py-2.5 text-sm md:inline-flex">
              {cta.label}
            </a>
          )}
          <button type="button" className="-mr-2 p-2 lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={d.menu}>
            <span className="relative block h-3 w-7">
              <span className={`absolute left-0 h-px w-7 bg-current transition ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 h-px w-7 bg-current transition ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </div>
      </div>
      {open && (
        <nav className="h-[calc(100svh-4rem)] overflow-y-auto border-t border-line bg-bg lg:hidden">
          <div className="container-site flex flex-col py-8">
            {links.map((l, i) => (
              <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} className="flex items-baseline gap-4 border-b border-line py-4 font-display text-4xl animate-rise-in" style={{ animationDelay: `${i * 50}ms` }}>
                <span className="font-body text-xs text-ink-muted">{String(i + 1).padStart(2, '0')}</span>
                {l.nav}
              </a>
            ))}
            {b.phone && (
              <a href={telHref(b.phone)} className="btn-primary mt-8">
                {d.call}: {b.phone}
              </a>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}

/** Mobile bottom bar: call + main action — the two things local visitors want. */
export function MobileBar({ site, d }: { site: SiteConfig; d: Dict }) {
  const scrolled = useScrolled(500)
  const b = site.business
  const hero = site.sections.find((s) => s.type === 'hero')
  const cta = hero?.type === 'hero' ? hero.primaryCta : undefined
  if (!b.phone && !cta) return null
  return (
    <div className={`fixed inset-x-3 bottom-3 z-40 grid grid-cols-2 gap-2 transition duration-500 sm:hidden ${scrolled ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-20 opacity-0'}`}>
      {b.phone && (
        <a href={telHref(b.phone)} className="btn !py-3.5 bg-ink text-bg shadow-xl">
          {d.call}
        </a>
      )}
      {cta && (
        <a href={cta.href} className={`btn-primary !py-3.5 shadow-xl ${b.phone ? '' : 'col-span-2'}`}>
          {cta.label}
        </a>
      )}
    </div>
  )
}

function ContactForm({ site, d }: { site: SiteConfig; d: Dict }) {
  const { status, submit } = useLead(site.slug, 'contact')
  if (status === 'sent') return <p className="border-l-2 border-brand py-4 pl-6 text-xl">{d.sent}</p>
  return (
    <form
      className="grid gap-x-8 gap-y-8 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault()
        submit(e.currentTarget)
      }}
    >
      <div className="sm:col-span-2">
        <label className="label" htmlFor="c-name">
          {d.name}
        </label>
        <input id="c-name" name="name" required className="field" autoComplete="name" />
      </div>
      <div>
        <label className="label" htmlFor="c-phone">
          {d.phone}
        </label>
        <input id="c-phone" name="phone" type="tel" required className="field" autoComplete="tel" />
      </div>
      <div>
        <label className="label" htmlFor="c-email">
          {d.email}
        </label>
        <input id="c-email" name="email" type="email" className="field" autoComplete="email" />
      </div>
      <div className="sm:col-span-2">
        <label className="label" htmlFor="c-msg">
          {d.message}
        </label>
        <textarea id="c-msg" name="message" rows={3} className="field resize-none" />
      </div>
      <label className="flex gap-3 text-sm text-ink-muted sm:col-span-2">
        <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 accent-[rgb(var(--c-brand))]" />
        {d.consent}
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <button className="btn-primary sm:col-span-2 sm:justify-self-start" disabled={status === 'sending'}>
        {status === 'sending' ? d.sending : d.send} <Arrow />
      </button>
      {status === 'error' && <p className="text-sm text-red-600 sm:col-span-2">{d.error}</p>}
    </form>
  )
}

export function Contact({ section: s, site, d }: SectionProps<ContactSection>) {
  const b = site.business
  const address = fullAddress(site)
  const mapQ = encodeURIComponent(b.mapQuery ?? `${b.name}, ${address}`)

  return (
    <section id={s.id} className="section">
      <div className="container-site">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="h2" data-reveal>
              <Rich text={s.title} />
            </h2>
            {s.subtitle && <p className="mt-6 text-lg text-ink-muted">{s.subtitle}</p>}
            <dl className="mt-12 space-y-8">
              {b.phone && (
                <div>
                  <dt className="label">{d.phone}</dt>
                  <dd className="mt-2">
                    <a href={telHref(b.phone)} className="font-display text-4xl tabular-nums link-underline sm:text-5xl">
                      {b.phone}
                    </a>
                  </dd>
                </div>
              )}
              {b.email && (
                <div>
                  <dt className="label">{d.email}</dt>
                  <dd className="mt-2">
                    <a href={`mailto:${b.email}`} className="text-xl link-underline">
                      {b.email}
                    </a>
                  </dd>
                </div>
              )}
              <div>
                <dt className="label">{d.address}</dt>
                <dd className="mt-2 text-xl">{address}</dd>
                {b.serviceArea && <dd className="mt-1 text-ink-muted">{b.serviceArea}</dd>}
              </div>
            </dl>
            {b.openingHours && <Hours site={site} d={d} />}
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            {s.form && <ContactForm site={site} d={d} />}
            {s.map && (
              <div className={`overflow-hidden rounded-theme border border-line ${s.form ? 'mt-14 aspect-[16/9]' : 'aspect-square lg:aspect-[4/5]'}`}>
                <iframe
                  title={`${d.address}: ${b.name}`}
                  src={`https://maps.google.com/maps?q=${mapQ}&output=embed`}
                  className="h-full w-full grayscale-[0.85] contrast-[1.05]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer({ site, d }: { site: SiteConfig; d: Dict }) {
  const b = site.business
  const links = site.sections.filter((s) => s.nav && s.id)
  return (
    <footer className="overflow-hidden bg-inverse text-inverse-ink">
      <div className="container-site grid gap-12 pb-10 pt-20 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          {b.tagline && <p className="max-w-sm font-display text-3xl leading-tight">{b.tagline}</p>}
          {b.phone && (
            <a href={telHref(b.phone)} className="mt-6 inline-block text-lg font-semibold text-brand">
              {b.phone}
            </a>
          )}
        </div>
        <ul className="space-y-2 opacity-75">
          {links.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} className="link-underline">
                {l.nav}
              </a>
            </li>
          ))}
        </ul>
        <div className="space-y-1 opacity-75">
          <p>{fullAddress(site)}</p>
          {b.email && <p>{b.email}</p>}
          {b.taxId && (
            <p className="pt-2">
              {d.taxId}: {b.taxId}
            </p>
          )}
          {b.social && (
            <p className="flex flex-wrap gap-4 pt-4">
              {b.social.map((s) => (
                <a key={s.url} href={s.url} className="capitalize link-underline" target="_blank" rel="noopener noreferrer">
                  {s.platform}
                </a>
              ))}
            </p>
          )}
        </div>
      </div>
      <p className="select-none whitespace-nowrap px-4 font-display text-[22vw] leading-[0.8] tracking-tight text-inverse-ink/[0.07]" aria-hidden>
        {b.name}
      </p>
      <div className="container-site flex flex-wrap justify-between gap-4 border-t border-inverse-ink/10 py-6 text-xs opacity-50">
        <span>
          © {new Date().getFullYear()} {b.name}. {d.rights}
        </span>
      </div>
    </footer>
  )
}

export function DemoBanner({ site, d }: { site: SiteConfig; d: Dict }) {
  if (!site.demo?.isDemo) return null
  return (
    <div className="bg-ink px-4 py-1.5 text-center text-[11px] tracking-wide text-bg">
      {d.demoBanner} <strong>{site.business.name}</strong>
      {site.demo.preparedBy && <span className="opacity-70"> · {site.demo.preparedBy}</span>}
      {site.demo.contactHref && (
        <a href={site.demo.contactHref} className="ml-3 font-semibold text-brand underline underline-offset-2">
          {d.demoCta} →
        </a>
      )}
    </div>
  )
}
