'use client'

import { useMemo, useState } from 'react'
import type { Dict } from '@/engine/i18n'
import type { MenuSection, ProjectItem, ProjectsSection, QuoteCalculatorSection, ReservationSection, SiteConfig } from '@/engine/types'
import { useLead } from './lead'
import { Picture, SectionHeading, telHref, type SectionProps } from './ui'

/* ------------------------------------------------------------------ */
/* Construction: portfolio with category filter + before/after          */
/* ------------------------------------------------------------------ */

function ProjectCard({ p, d }: { p: ProjectItem; d: Dict }) {
  const [showBefore, setShowBefore] = useState(false)
  return (
    <article className="group overflow-hidden border border-line bg-card rounded-theme">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Picture image={showBefore ? p.before : p.image} label={p.category} className="transition duration-500 group-hover:scale-105" />
        {p.before && (
          <div className="absolute right-3 top-3 flex overflow-hidden rounded-full bg-black/50 text-xs font-semibold text-white backdrop-blur">
            <button type="button" onClick={() => setShowBefore(true)} className={`px-3 py-1.5 ${showBefore ? 'bg-brand text-brand-ink' : ''}`}>
              {d.before}
            </button>
            <button type="button" onClick={() => setShowBefore(false)} className={`px-3 py-1.5 ${!showBefore ? 'bg-brand text-brand-ink' : ''}`}>
              {d.after}
            </button>
          </div>
        )}
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
          {[p.location, p.year].filter(Boolean).join(' · ')}
        </p>
        <h3 className="mt-1 text-lg font-bold">{p.title}</h3>
        {p.description && <p className="mt-2 text-sm text-ink-muted">{p.description}</p>}
        {p.facts && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {p.facts.map((f) => (
              <li key={f} className="bg-bg-alt px-2.5 py-1 text-xs font-medium rounded-theme">
                {f}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}

export function Projects({ section: s, d }: SectionProps<ProjectsSection>) {
  const categories = useMemo(() => Array.from(new Set(s.items.map((i) => i.category))), [s.items])
  const [active, setActive] = useState<string | null>(null)
  const items = active ? s.items.filter((i) => i.category === active) : s.items

  return (
    <section id={s.id} className="section bg-bg-alt">
      <div className="container-site">
        <SectionHeading title={s.title} subtitle={s.subtitle} />
        {categories.length > 1 && (
          <div className="mb-8 flex flex-wrap gap-2" role="tablist">
            {[null, ...categories].map((c) => (
              <button
                key={c ?? 'all'}
                type="button"
                onClick={() => setActive(c)}
                className={`border px-4 py-2 text-sm font-semibold transition rounded-theme ${
                  active === c ? 'border-brand bg-brand text-brand-ink' : 'border-line bg-card hover:border-brand'
                }`}
              >
                {c ?? d.all}
              </button>
            ))}
          </div>
        )}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProjectCard key={p.title} p={p} d={d} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Construction: instant estimate → lead                               */
/* ------------------------------------------------------------------ */

function money(n: number, currency: string, locale: string) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(Math.round(n / 100) * 100)
}

export function QuoteCalculator({ section: s, site, d }: SectionProps<QuoteCalculatorSection>) {
  const [work, setWork] = useState(s.workTypes[0].id)
  const [area, setArea] = useState(60)
  const [standard, setStandard] = useState(s.standards.find((x) => x.multiplier === 1)?.id ?? s.standards[0].id)
  const { status, submit } = useLead(site.slug, 'quote')

  const w = s.workTypes.find((x) => x.id === work)!
  const m = s.standards.find((x) => x.id === standard)!.multiplier
  const min = w.pricePerUnit[0] * area * m
  const max = w.pricePerUnit[1] * area * m
  const loc = site.locale === 'pl' ? 'pl-PL' : site.locale === 'de' ? 'de-DE' : 'en-GB'
  const estimate = `${money(min, s.currency, loc)} – ${money(max, s.currency, loc)}`

  return (
    <section id={s.id} className="section">
      <div className="container-site">
        <SectionHeading title={s.title} subtitle={s.subtitle} />
        <div className="grid overflow-hidden border border-line rounded-theme lg:grid-cols-2">
          <div className="space-y-7 bg-card p-6 sm:p-10">
            <div>
              <span className="label">{d.workType}</span>
              <div className="grid gap-2 sm:grid-cols-2">
                {s.workTypes.map((x) => (
                  <button
                    key={x.id}
                    type="button"
                    onClick={() => setWork(x.id)}
                    className={`border px-4 py-3 text-left text-sm font-medium transition rounded-theme ${
                      work === x.id ? 'border-brand bg-brand/10 ring-1 ring-brand' : 'border-line hover:border-brand'
                    }`}
                  >
                    {x.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="q-area" className="label flex justify-between">
                <span>{d.area}</span>
                <span className="font-display text-lg font-bold text-ink">
                  {area} {w.unit}
                </span>
              </label>
              <input
                id="q-area"
                type="range"
                min={5}
                max={400}
                step={5}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full accent-[rgb(var(--c-brand))]"
              />
            </div>
            <div>
              <span className="label">{d.standard}</span>
              <div className="flex gap-2">
                {s.standards.map((x) => (
                  <button
                    key={x.id}
                    type="button"
                    onClick={() => setStandard(x.id)}
                    className={`flex-1 border px-3 py-2.5 text-sm font-semibold transition rounded-theme ${
                      standard === x.id ? 'border-brand bg-brand text-brand-ink' : 'border-line hover:border-brand'
                    }`}
                  >
                    {x.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-accent p-6 text-white sm:p-10">
            <p className="text-sm uppercase tracking-widest text-white/60">{d.estimate}</p>
            <p className="mt-2 font-display text-3xl font-bold text-brand sm:text-4xl" aria-live="polite">
              {estimate}
            </p>
            {s.disclaimer && <p className="mt-3 text-xs text-white/60">{s.disclaimer}</p>}

            {status === 'sent' ? (
              <p className="mt-8 rounded-theme bg-white/10 p-5">{d.sent}</p>
            ) : (
              <form
                className="mt-8 grid gap-3 [&_.field]:border-white/15 [&_.field]:bg-white/5 [&_.field]:text-white [&_.field]:placeholder-white/40"
                onSubmit={(e) => {
                  e.preventDefault()
                  submit(e.currentTarget, { workType: w.label, area: `${area} ${w.unit}`, standard, estimate })
                }}
              >
                <p className="font-semibold">{d.getQuote}</p>
                <input name="name" required placeholder={d.name} className="field" autoComplete="name" />
                <input name="phone" required placeholder={d.phone} className="field" type="tel" autoComplete="tel" />
                <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                <button className="btn-primary mt-1" disabled={status === 'sending'}>
                  {status === 'sending' ? d.sending : d.getQuote}
                </button>
                {status === 'error' && <p className="text-sm text-red-300">{d.error}</p>}
                <p className="text-xs text-white/50">{d.quoteSentNote}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Restaurant: menu with category tabs + dietary filter                 */
/* ------------------------------------------------------------------ */

export function Menu({ section: s, d }: SectionProps<MenuSection>) {
  const [cat, setCat] = useState(0)
  const [diet, setDiet] = useState<'vege' | 'gf' | null>(null)
  const items = s.categories[cat].items.filter((i) => !diet || i.tags?.includes(diet) || (diet === 'vege' && i.tags?.includes('vegan')))

  return (
    <section id={s.id} className="section bg-bg-alt">
      <div className="container-site max-w-4xl">
        <SectionHeading title={s.title} subtitle={s.subtitle} center />
        <div className="mb-4 flex flex-wrap justify-center gap-2">
          {s.categories.map((c, i) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setCat(i)}
              className={`px-5 py-2.5 font-display text-lg transition rounded-theme ${cat === i ? 'bg-brand text-brand-ink' : 'hover:bg-ink/5'}`}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div className="mb-10 flex justify-center gap-2 text-sm">
          {(['vege', 'gf'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setDiet(diet === t ? null : t)}
              className={`rounded-full border px-3 py-1 transition ${diet === t ? 'border-accent bg-accent text-white' : 'border-line text-ink-muted hover:border-accent'}`}
            >
              {d[t]}
            </button>
          ))}
        </div>
        <ul className="grid gap-x-12 gap-y-7 md:grid-cols-2">
          {items.map((i) => (
            <li key={i.name}>
              <div className="flex items-baseline gap-3">
                <h3 className="font-display text-xl font-semibold">{i.name}</h3>
                <span className="flex-1 border-b border-dotted border-ink-muted/40" />
                <span className="whitespace-nowrap font-semibold text-brand">{i.price}</span>
              </div>
              {i.description && <p className="mt-1 text-sm text-ink-muted">{i.description}</p>}
              {i.tags && (
                <p className="mt-2 flex flex-wrap gap-1.5">
                  {i.tags.map((t) => (
                    <span key={t} className={`rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${t === 'chef' ? 'bg-brand text-brand-ink' : 'bg-accent/15 text-accent'}`}>
                      {d[t]}
                    </span>
                  ))}
                </p>
              )}
            </li>
          ))}
        </ul>
        {s.note && <p className="mt-12 text-center text-sm text-ink-muted">{s.note}</p>}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Restaurant: table reservation request                                */
/* ------------------------------------------------------------------ */

function today() {
  return new Date().toISOString().slice(0, 10)
}

export function Reservation({ section: s, site, d }: SectionProps<ReservationSection>) {
  const { status, submit } = useLead(site.slug, 'reservation')
  const b = site.business

  return (
    <section id={s.id} className="section">
      <div className="container-site grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="h2">{s.title}</h2>
          {s.subtitle && <p className="mt-4 text-lg text-ink-muted">{s.subtitle}</p>}
          {b.openingHours && <Hours site={site} d={d} />}
          {b.phone && (
            <a href={telHref(b.phone)} className="mt-8 inline-block font-display text-2xl font-bold text-brand">
              {b.phone}
            </a>
          )}
        </div>
        <div className="border border-line bg-card p-6 sm:p-8 rounded-theme">
          {s.externalUrl ? (
            <a href={s.externalUrl} className="btn-primary w-full" target="_blank" rel="noopener noreferrer">
              {d.bookExternal}
            </a>
          ) : status === 'sent' ? (
            <p className="text-lg">{d.sent}</p>
          ) : (
            <form
              className="grid gap-4 sm:grid-cols-3"
              onSubmit={(e) => {
                e.preventDefault()
                submit(e.currentTarget)
              }}
            >
              <div>
                <label className="label" htmlFor="r-date">
                  {d.date}
                </label>
                <input id="r-date" name="date" type="date" required min={today()} defaultValue={today()} className="field" />
              </div>
              <div>
                <label className="label" htmlFor="r-time">
                  {d.time}
                </label>
                <select id="r-time" name="time" required className="field">
                  {s.slots.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label" htmlFor="r-guests">
                  {d.guests}
                </label>
                <select id="r-guests" name="guests" className="field" defaultValue="2">
                  {Array.from({ length: s.maxGuests }, (_, i) => i + 1).map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-3">
                <label className="label" htmlFor="r-name">
                  {d.name}
                </label>
                <input id="r-name" name="name" required className="field" autoComplete="name" />
              </div>
              <div className="sm:col-span-3">
                <label className="label" htmlFor="r-phone">
                  {d.phone}
                </label>
                <input id="r-phone" name="phone" type="tel" required className="field" autoComplete="tel" />
              </div>
              <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
              <button className="btn-primary sm:col-span-3" disabled={status === 'sending'}>
                {status === 'sending' ? d.sending : d.book}
              </button>
              {status === 'error' && <p className="text-sm text-red-600 sm:col-span-3">{d.error}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export function Hours({ site, d }: { site: SiteConfig; d: Dict }) {
  return (
    <div className="mt-8">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-muted">{d.hours}</h3>
      <dl className="max-w-sm divide-y divide-line">
        {site.business.openingHours?.map((h) => (
          <div key={h.days} className="flex justify-between py-2">
            <dt>{h.days}</dt>
            <dd className="font-semibold">{h.hours}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
