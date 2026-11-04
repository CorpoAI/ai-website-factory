'use client'

import { useState } from 'react'
import type { Dict } from '@/engine/i18n'
import type { ContactSection, SiteConfig } from '@/engine/types'
import { Hours } from './interactive'
import { useLead } from './lead'
import { telHref, type SectionProps } from './ui'

export function Header({ site, d }: { site: SiteConfig; d: Dict }) {
  const [open, setOpen] = useState(false)
  const b = site.business
  const links = site.sections.filter((s) => s.nav && s.id)
  const cta = site.sections.find((s) => s.type === 'hero')

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-2.5 font-display text-lg font-bold">
          {b.logo?.src ? (
            <img src={b.logo.src} alt={b.name} className="h-9 w-auto" />
          ) : (
            <span className="inline-flex h-9 w-9 items-center justify-center bg-brand text-brand-ink rounded-theme">{b.name.charAt(0)}</span>
          )}
          <span className="truncate">{b.name}</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="text-ink-muted transition hover:text-ink">
              {l.nav}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {b.phone && (
            <a href={telHref(b.phone)} className="hidden text-sm font-semibold sm:block">
              {b.phone}
            </a>
          )}
          {cta?.type === 'hero' && cta.primaryCta && (
            <a href={cta.primaryCta.href} className="btn-primary hidden px-4 py-2 text-sm md:inline-flex">
              {cta.primaryCta.label}
            </a>
          )}
          <button type="button" className="p-2 lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={d.menu}>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d={open ? 'M6 6l12 12M18 6 6 18' : 'M4 7h16M4 12h16M4 17h16'} />
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-line lg:hidden">
          <div className="container-site flex flex-col py-3">
            {links.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} className="py-3 text-lg font-medium">
                {l.nav}
              </a>
            ))}
            {b.phone && (
              <a href={telHref(b.phone)} className="btn-primary my-3">
                {d.call}: {b.phone}
              </a>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}

/** Sticky "call" button on mobile — the #1 conversion action for local businesses. */
export function MobileCallBar({ site, d }: { site: SiteConfig; d: Dict }) {
  const b = site.business
  if (!b.phone) return null
  return (
    <a href={telHref(b.phone)} className="btn-primary fixed bottom-4 right-4 z-40 shadow-lg shadow-black/20 sm:hidden">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
      </svg>
      {d.call}
    </a>
  )
}

function ContactForm({ site, d }: { site: SiteConfig; d: Dict }) {
  const { status, submit } = useLead(site.slug, 'contact')
  if (status === 'sent') return <p className="border border-line bg-card p-6 text-lg rounded-theme">{d.sent}</p>
  return (
    <form
      className="grid gap-4 border border-line bg-card p-6 sm:grid-cols-2 sm:p-8 rounded-theme"
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
        <textarea id="c-msg" name="message" rows={4} className="field" />
      </div>
      <label className="flex gap-2 text-sm text-ink-muted sm:col-span-2">
        <input type="checkbox" name="consent" required className="mt-1 accent-[rgb(var(--c-brand))]" />
        {d.consent}
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <button className="btn-primary sm:col-span-2" disabled={status === 'sending'}>
        {status === 'sending' ? d.sending : d.send}
      </button>
      {status === 'error' && <p className="text-sm text-red-600 sm:col-span-2">{d.error}</p>}
    </form>
  )
}

export function Contact({ section: s, site, d }: SectionProps<ContactSection>) {
  const b = site.business
  const address = [b.street, [b.postalCode, b.city].filter(Boolean).join(' ')].filter(Boolean).join(', ')
  const mapQ = encodeURIComponent(b.mapQuery ?? `${b.name}, ${address}`)

  return (
    <section id={s.id} className="section bg-bg-alt">
      <div className="container-site grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="h2">{s.title}</h2>
          {s.subtitle && <p className="mt-4 text-lg text-ink-muted">{s.subtitle}</p>}
          <dl className="mt-8 space-y-5">
            {b.phone && (
              <div>
                <dt className="text-sm text-ink-muted">{d.phone}</dt>
                <dd>
                  <a href={telHref(b.phone)} className="font-display text-2xl font-bold text-brand">
                    {b.phone}
                  </a>
                </dd>
              </div>
            )}
            {b.email && (
              <div>
                <dt className="text-sm text-ink-muted">{d.email}</dt>
                <dd>
                  <a href={`mailto:${b.email}`} className="text-lg font-semibold">
                    {b.email}
                  </a>
                </dd>
              </div>
            )}
            <div>
              <dt className="text-sm text-ink-muted">{d.address}</dt>
              <dd className="text-lg font-semibold">{address}</dd>
            </div>
          </dl>
          {b.openingHours && <Hours site={site} d={d} />}
        </div>
        <div className="space-y-6">
          {s.form && <ContactForm site={site} d={d} />}
          {s.map && (
            <div className={`overflow-hidden border border-line rounded-theme ${s.form ? 'aspect-[16/9]' : 'aspect-square sm:aspect-[4/3]'}`}>
              <iframe
                title={`${d.address}: ${b.name}`}
                src={`https://maps.google.com/maps?q=${mapQ}&output=embed`}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export function Footer({ site, d }: { site: SiteConfig; d: Dict }) {
  const b = site.business
  return (
    <footer className="bg-ink text-bg">
      <div className="container-site grid gap-8 py-12 text-sm sm:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold">{b.name}</p>
          {b.tagline && <p className="mt-2 opacity-70">{b.tagline}</p>}
        </div>
        <div className="opacity-80">
          <p>{[b.street, [b.postalCode, b.city].filter(Boolean).join(' ')].filter(Boolean).join(', ')}</p>
          {b.phone && <p>{b.phone}</p>}
          {b.email && <p>{b.email}</p>}
          {b.taxId && (
            <p className="mt-2 opacity-70">
              {d.taxId}: {b.taxId}
            </p>
          )}
        </div>
        {b.social && (
          <ul className="flex flex-wrap gap-4 sm:justify-end">
            {b.social.map((s) => (
              <li key={s.url}>
                <a href={s.url} className="capitalize opacity-80 hover:opacity-100" target="_blank" rel="noopener noreferrer">
                  {s.platform}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="border-t border-bg/10 py-5 text-center text-xs opacity-60">
        © {new Date().getFullYear()} {b.name}. {d.rights}
      </div>
    </footer>
  )
}

export function DemoBanner({ site, d }: { site: SiteConfig; d: Dict }) {
  if (!site.demo?.isDemo) return null
  return (
    <div className="bg-ink px-4 py-2 text-center text-xs text-bg sm:text-sm">
      {d.demoBanner} <strong>{site.business.name}</strong>
      {site.demo.preparedBy && <> · {site.demo.preparedBy}</>}
      {site.demo.contactHref && (
        <a href={site.demo.contactHref} className="ml-3 font-semibold text-brand underline underline-offset-2">
          {d.demoCta} →
        </a>
      )}
    </div>
  )
}

