'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { Dict } from '@/engine/i18n'
import type {
  GallerySection,
  MenuSection,
  ProjectItem,
  ProjectsSection,
  QuoteCalculatorSection,
  ReservationSection,
  ServicesSection,
  SiteConfig,
  TestimonialsSection,
} from '@/engine/types'
import { useLead } from './lead'
import { Arrow, Icon, Kicker, Picture, Rich, Stars, navIndex, telHref, type SectionProps } from './ui'

/* ------------------------------------------------------------------ */
/* Services — numbered editorial rows, image preview follows hover       */
/* ------------------------------------------------------------------ */

export function Services({ section: s, site }: SectionProps<ServicesSection>) {
  const [active, setActive] = useState(0)
  const withImages = s.items.some((i) => i.image)
  return (
    <section id={s.id} className="section">
      <div className="container-site">
        <div className="mb-14 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Kicker index={navIndex(site, s.id)} label={s.nav} />
            <h2 className="h2" data-reveal>
              <Rich text={s.title} />
            </h2>
          </div>
          {s.subtitle && (
            <p className="text-lg text-ink-muted lg:col-span-4 lg:col-start-9" data-reveal>
              {s.subtitle}
            </p>
          )}
        </div>
        <div className={`grid gap-12 ${withImages ? 'lg:grid-cols-12' : ''}`}>
          <ol className={`border-t border-ink ${withImages ? 'lg:col-span-7' : ''}`}>
            {s.items.map((i, idx) => (
              <li
                key={i.title}
                onMouseEnter={() => setActive(idx)}
                onFocus={() => setActive(idx)}
                className="group grid cursor-default grid-cols-[48px_1fr] gap-x-4 border-b border-line py-7 transition-colors sm:grid-cols-[64px_1fr_auto]"
                data-reveal
              >
                <span className={`font-display text-lg transition ${active === idx ? 'text-brand' : 'text-ink-muted'}`}>{String(idx + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-3xl transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl">{i.title}</h3>
                  <p className="mt-2 max-w-lg text-ink-muted">{i.description}</p>
                </div>
                {i.priceFrom && <p className="col-start-2 mt-3 whitespace-nowrap text-sm font-semibold sm:col-start-3 sm:mt-2 sm:text-right">{i.priceFrom}</p>}
              </li>
            ))}
          </ol>
          {withImages && (
            <div className="hidden lg:col-span-5 lg:block">
              <div className="grain sticky top-24 aspect-[4/5] overflow-hidden rounded-theme">
                {s.items.map((i, idx) => (
                  <div key={i.title} className={`absolute inset-0 transition-all duration-700 ${active === idx ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}>
                    <Picture image={i.image} label={i.title} sizes={900} />
                  </div>
                ))}
                <p className="absolute bottom-5 left-5 z-10 bg-bg px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]">{s.items[active]?.title}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Projects — mosaic + before/after comparison slider                   */
/* ------------------------------------------------------------------ */

function BeforeAfter({ before, after, d }: { before: ProjectItem['before']; after: ProjectItem['image']; d: Dict }) {
  const [pos, setPos] = useState(50)
  return (
    <div className="relative h-full w-full select-none">
      <Picture image={after} sizes={1200} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Picture image={before} sizes={1200} className="grayscale" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 w-px bg-white" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-xl">⇆</span>
      </div>
      <span className="absolute left-4 top-4 bg-black/60 px-2 py-1 text-[11px] font-semibold uppercase tracking-widest text-white">{d.before}</span>
      <span className="absolute right-4 top-4 bg-black/60 px-2 py-1 text-[11px] font-semibold uppercase tracking-widest text-white">{d.after}</span>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`${d.before} / ${d.after}`}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  )
}

const MOSAIC = ['md:col-span-4 md:row-span-2', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2']

export function Projects({ section: s, site, d }: SectionProps<ProjectsSection>) {
  const categories = useMemo(() => Array.from(new Set(s.items.map((i) => i.category))), [s.items])
  const [active, setActive] = useState<string | null>(null)
  const items = active ? s.items.filter((i) => i.category === active) : s.items
  const comparison = s.items.find((i) => i.before && i.image)

  return (
    <section id={s.id} className="section bg-bg-alt">
      <div className="container-site">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <Kicker index={navIndex(site, s.id)} label={s.nav} />
            <h2 className="h2" data-reveal>
              <Rich text={s.title} />
            </h2>
            {s.subtitle && <p className="mt-5 text-lg text-ink-muted">{s.subtitle}</p>}
          </div>
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold uppercase tracking-[0.14em]" role="tablist">
              {[null, ...categories].map((c) => (
                <button
                  key={c ?? 'all'}
                  type="button"
                  role="tab"
                  aria-selected={active === c}
                  onClick={() => setActive(c)}
                  className={`border-b-2 pb-1 transition ${active === c ? 'border-brand text-ink' : 'border-transparent text-ink-muted hover:text-ink'}`}
                >
                  {c ?? d.all}
                  <sup className="ml-1 text-[10px] text-ink-muted">{c ? s.items.filter((i) => i.category === c).length : s.items.length}</sup>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid auto-rows-[260px] gap-4 md:grid-cols-6 md:auto-rows-[300px]">
          {items.map((p, idx) => (
            <article key={p.title} className={`group relative overflow-hidden rounded-theme ${active ? 'md:col-span-2' : MOSAIC[idx % MOSAIC.length]}`}>
              <div className="grain absolute inset-0">
                <Picture image={p.image} label={p.category} sizes={idx === 0 && !active ? 1400 : 800} className="transition duration-[1200ms] group-hover:scale-105" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  {[p.category, p.location, p.year].filter(Boolean).join(' · ')}
                </p>
                <h3 className={`mt-2 ${idx === 0 && !active ? 'text-3xl sm:text-5xl' : 'text-2xl'}`}>{p.title}</h3>
                {p.facts && (
                  <ul className="mt-3 flex max-h-0 flex-wrap gap-x-4 gap-y-1 overflow-hidden text-sm text-white/85 opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">
                    {p.facts.map((f) => (
                      <li key={f}>— {f}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>

        {comparison && !active && (
          <div className="mt-16 grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-4 text-brand">
                {d.before} / {d.after}
              </p>
              <h3 className="text-4xl">{comparison.title}</h3>
              {comparison.description && <p className="mt-4 text-ink-muted">{comparison.description}</p>}
              <p className="mt-6 text-sm text-ink-muted">Przeciągnij suwak, aby porównać.</p>
            </div>
            <div className="aspect-[16/10] overflow-hidden rounded-theme lg:col-span-8">
              <BeforeAfter before={comparison.before} after={comparison.image} d={d} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Quote calculator — value first, contact second                       */
/* ------------------------------------------------------------------ */

function money(n: number, currency: string, locale: string) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(Math.round(n / 1000) * 1000)
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
  const presets = w.unit.startsWith('m') ? [20, 50, 80, 120, 160] : [10, 25, 50]

  return (
    <section id={s.id} className="section">
      <div className="container-site">
        <div className="mb-14 max-w-3xl">
          <Kicker index={navIndex(site, s.id)} label={s.nav} />
          <h2 className="h2" data-reveal>
            <Rich text={s.title} />
          </h2>
          {s.subtitle && <p className="mt-5 text-lg text-ink-muted">{s.subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-theme bg-line lg:grid-cols-12">
          <div className="space-y-12 bg-card p-6 sm:p-10 lg:col-span-7">
            {/* Step 1 */}
            <fieldset>
              <legend className="label mb-5 flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-[11px] text-bg">1</span>
                {d.workType}
              </legend>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {s.workTypes.map((x) => (
                  <button
                    key={x.id}
                    type="button"
                    onClick={() => setWork(x.id)}
                    aria-pressed={work === x.id}
                    className={`group relative flex min-h-[88px] items-end overflow-hidden rounded-theme border p-4 text-left transition ${
                      work === x.id ? 'border-brand ring-2 ring-brand' : 'border-line hover:border-ink/40'
                    }`}
                  >
                    {x.image && (
                      <span className="absolute inset-0">
                        <Picture image={x.image} sizes={500} className={`transition duration-700 ${work === x.id ? 'scale-105' : 'grayscale group-hover:grayscale-0'}`} />
                        <span className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />
                      </span>
                    )}
                    <span className={`relative text-[15px] font-semibold ${x.image ? 'text-white' : ''}`}>{x.label}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Step 2 */}
            <fieldset>
              <legend className="label mb-5 flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-[11px] text-bg">2</span>
                {d.area}
              </legend>
              <div className="flex items-end gap-4">
                <label htmlFor="q-area-n" className="sr-only">
                  {d.area}
                </label>
                <input
                  id="q-area-n"
                  type="number"
                  min={1}
                  max={2000}
                  value={area}
                  onChange={(e) => setArea(Math.max(1, Math.min(2000, Number(e.target.value) || 1)))}
                  className="w-40 border-0 border-b-2 border-ink bg-transparent p-0 font-display text-7xl leading-none outline-none focus:border-brand"
                />
                <span className="pb-2 text-xl text-ink-muted">{w.unit}</span>
              </div>
              <input
                type="range"
                min={5}
                max={400}
                step={5}
                value={Math.min(area, 400)}
                onChange={(e) => setArea(Number(e.target.value))}
                aria-label={d.area}
                className="mt-6 w-full accent-[rgb(var(--c-brand))]"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {presets.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setArea(p)}
                    className={`rounded-full border px-3 py-1 text-sm transition ${area === p ? 'border-ink bg-ink text-bg' : 'border-line hover:border-ink'}`}
                  >
                    {p} {w.unit}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Step 3 */}
            <fieldset>
              <legend className="label mb-5 flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-[11px] text-bg">3</span>
                {d.standard}
              </legend>
              <div className="grid grid-cols-3 border border-ink rounded-theme">
                {s.standards.map((x, i) => (
                  <button
                    key={x.id}
                    type="button"
                    onClick={() => setStandard(x.id)}
                    aria-pressed={standard === x.id}
                    className={`px-3 py-4 text-sm font-semibold transition ${i > 0 ? 'border-l border-ink' : ''} ${standard === x.id ? 'bg-ink text-bg' : 'hover:bg-ink/5'}`}
                  >
                    {x.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="relative flex flex-col bg-inverse p-6 text-inverse-ink sm:p-10 lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <p className="label !text-inverse-ink/60">{d.estimate}</p>
              <p className="mt-4 font-display text-5xl leading-[0.95] text-brand sm:text-6xl" aria-live="polite">
                {estimate}
              </p>
              <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-inverse-ink/15 py-5 text-sm">
                <div>
                  <dt className="text-inverse-ink/55">{w.label}</dt>
                  <dd className="mt-1 font-semibold">
                    {area} {w.unit} · {s.standards.find((x) => x.id === standard)?.label}
                  </dd>
                </div>
                {w.duration && (
                  <div>
                    <dt className="text-inverse-ink/55">Czas realizacji</dt>
                    <dd className="mt-1 font-semibold">{w.duration}</dd>
                  </div>
                )}
              </dl>
              {s.disclaimer && <p className="mt-4 text-xs leading-relaxed text-inverse-ink/50">{s.disclaimer}</p>}

              {status === 'sent' ? (
                <p className="mt-10 border-l-2 border-brand pl-5 text-lg">{d.sent}</p>
              ) : (
                <form
                  className="mt-10 grid gap-5 [&_.field]:border-inverse-ink/25 [&_.field]:text-inverse-ink [&_.field]:placeholder:text-inverse-ink/40"
                  onSubmit={(e) => {
                    e.preventDefault()
                    submit(e.currentTarget, { workType: w.label, area: `${area} ${w.unit}`, standard, estimate })
                  }}
                >
                  <p className="text-xl font-semibold">{d.getQuote}</p>
                  <input name="name" required placeholder={d.name} className="field" autoComplete="name" />
                  <input name="phone" required placeholder={d.phone} className="field" type="tel" autoComplete="tel" />
                  <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                  <button className="btn-primary mt-2 w-full" disabled={status === 'sending'}>
                    {status === 'sending' ? d.sending : d.getQuote} <Arrow />
                  </button>
                  {status === 'error' && <p className="text-sm text-red-300">{d.error}</p>}
                  <p className="text-xs text-inverse-ink/50">{d.quoteSentNote}</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Testimonials — one large quote at a time                             */
/* ------------------------------------------------------------------ */

export function Testimonials({ section: s, site, d }: SectionProps<TestimonialsSection>) {
  const [i, setI] = useState(0)
  const rating = site.business.rating
  const t = s.items[i]
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % s.items.length), 8000)
    return () => clearInterval(id)
  }, [s.items.length])

  return (
    <section id={s.id} className="section bg-bg-alt">
      <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="flex flex-col justify-between gap-10 lg:col-span-4">
          <div>
            <Kicker index={navIndex(site, s.id)} label={s.nav} />
            <h2 className="text-4xl sm:text-5xl" data-reveal>
              <Rich text={s.title} />
            </h2>
          </div>
          {rating && (
            <div data-reveal>
              <p className="font-display text-[7rem] leading-none">{rating.value.toFixed(1).replace('.', ',')}</p>
              <p className="mt-2 flex items-center gap-3 text-sm text-ink-muted">
                <span className="text-brand">
                  <Stars value={rating.value} className="h-4 w-4" />
                </span>
                {rating.count} {d.reviews}
                {rating.source && ` · ${rating.source}`}
              </p>
            </div>
          )}
        </div>
        <figure className="flex flex-col justify-between lg:col-span-7 lg:col-start-6" aria-live="polite">
          <span className="font-display text-[8rem] leading-[0.6] text-brand" aria-hidden>
            “
          </span>
          <blockquote key={i} className="animate-rise-in font-display text-3xl leading-[1.2] sm:text-[2.6rem] [text-transform:none]">
            {t.text}
          </blockquote>
          <figcaption className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-6">
            <div>
              <p className="font-semibold">{t.author}</p>
              <p className="text-sm text-ink-muted">{[t.context, t.date].filter(Boolean).join(' · ')}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm tabular-nums text-ink-muted">
                {String(i + 1).padStart(2, '0')} / {String(s.items.length).padStart(2, '0')}
              </span>
              <button type="button" onClick={() => setI((i - 1 + s.items.length) % s.items.length)} className="rounded-full border border-line p-3 transition hover:border-ink" aria-label="Poprzednia opinia">
                <Arrow className="h-4 w-4 rotate-180" />
              </button>
              <button type="button" onClick={() => setI((i + 1) % s.items.length)} className="rounded-full border border-ink bg-ink p-3 text-bg transition hover:opacity-80" aria-label="Następna opinia">
                <Arrow className="h-4 w-4" />
              </button>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Gallery — horizontal, draggable strip                                */
/* ------------------------------------------------------------------ */

const STRIP_W = ['w-[78vw] sm:w-[520px]', 'w-[62vw] sm:w-[340px]', 'w-[70vw] sm:w-[440px]', 'w-[62vw] sm:w-[320px]', 'w-[78vw] sm:w-[560px]']

export function Gallery({ section: s, site }: SectionProps<GallerySection>) {
  const ref = useRef<HTMLDivElement>(null)
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 480, behavior: 'smooth' })
  return (
    <section id={s.id} className="section overflow-hidden">
      <div className="container-site mb-10 flex items-end justify-between gap-6">
        <div>
          <Kicker index={navIndex(site, s.id)} label={s.nav} />
          <h2 className="h2" data-reveal>
            <Rich text={s.title} />
          </h2>
        </div>
        <div className="hidden gap-3 sm:flex">
          <button type="button" onClick={() => scroll(-1)} className="rounded-full border border-line p-4 transition hover:border-ink" aria-label="Wstecz">
            <Arrow className="h-5 w-5 rotate-180" />
          </button>
          <button type="button" onClick={() => scroll(1)} className="rounded-full border border-ink bg-ink p-4 text-bg" aria-label="Dalej">
            <Arrow className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div ref={ref} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:px-8 lg:px-[max(3rem,calc((100vw-1320px)/2+3rem))]">
        {s.images.map((img, i) => (
          <figure key={i} className={`grain relative h-[56vh] max-h-[560px] min-h-[320px] shrink-0 snap-start overflow-hidden rounded-theme ${STRIP_W[i % STRIP_W.length]}`}>
            <Picture image={img} sizes={1100} />
            {img.alt && <figcaption className="absolute bottom-4 left-4 bg-bg/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-ink">{img.alt}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Menu — sticky categories, chef's picks with photos, diet filter       */
/* ------------------------------------------------------------------ */

export function Menu({ section: s, site, d }: SectionProps<MenuSection>) {
  const [cat, setCat] = useState(0)
  const [diet, setDiet] = useState<'vege' | 'gf' | null>(null)
  const picks = s.categories.flatMap((c) => c.items).filter((i) => i.image).slice(0, 3)
  const items = s.categories[cat].items.filter((i) => !diet || i.tags?.includes(diet) || (diet === 'vege' && i.tags?.includes('vegan')))

  return (
    <section id={s.id} className="section bg-bg-alt">
      <div className="container-site">
        <div className="mb-14 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Kicker index={navIndex(site, s.id)} label={s.nav} />
            <h2 className="text-6xl sm:text-8xl lg:text-9xl" data-reveal>
              <Rich text={s.title} />
            </h2>
          </div>
          {s.subtitle && <p className="text-lg text-ink-muted lg:col-span-4 lg:col-start-9">{s.subtitle}</p>}
        </div>

        {picks.length > 0 && (
          <div className="mb-20 grid gap-4 sm:grid-cols-3">
            {picks.map((p, i) => (
              <article key={p.name} className="group" data-reveal style={{ ['--d' as string]: `${i * 120}ms` }}>
                <div className="grain relative aspect-[4/5] overflow-hidden rounded-theme">
                  <Picture image={p.image} label={p.name} sizes={700} className="transition duration-[1200ms] group-hover:scale-105" />
                  <span className="absolute left-4 top-4 bg-brand px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-ink">{d.chef}</span>
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="text-2xl">{p.name}</h3>
                  <span className="font-display text-xl text-brand">{p.price}</span>
                </div>
                {p.description && <p className="mt-1 text-sm text-ink-muted">{p.description}</p>}
              </article>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <nav className="flex gap-2 overflow-x-auto no-scrollbar lg:col-span-3 lg:flex-col lg:gap-0" aria-label={s.title}>
            {s.categories.map((c, i) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setCat(i)}
                className={`group flex shrink-0 items-center gap-3 whitespace-nowrap border-ink/10 py-3 text-left font-display text-2xl transition lg:border-b lg:text-3xl ${
                  cat === i ? 'text-ink' : 'text-ink-muted/60 hover:text-ink'
                } max-lg:rounded-full max-lg:border max-lg:px-5 max-lg:py-2 max-lg:text-lg ${cat === i ? 'max-lg:border-ink max-lg:bg-ink max-lg:text-bg' : ''}`}
              >
                <span className={`hidden h-px bg-brand transition-all lg:block ${cat === i ? 'w-8' : 'w-0 group-hover:w-4'}`} />
                {c.name}
              </button>
            ))}
            <div className="mt-8 hidden flex-wrap gap-2 lg:flex">
              {(['vege', 'gf'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setDiet(diet === t ? null : t)}
                  aria-pressed={diet === t}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] transition ${diet === t ? 'border-accent bg-accent text-white' : 'border-ink/20 text-ink-muted hover:border-accent'}`}
                >
                  {d[t]}
                </button>
              ))}
            </div>
          </nav>

          <ul key={cat + (diet ?? '')} className="grid gap-x-14 gap-y-9 md:grid-cols-2 lg:col-span-9">
            {items.map((i, idx) => (
              <li key={i.name} className="animate-rise-in" style={{ animationDelay: `${idx * 60}ms` }}>
                <div className="flex items-baseline gap-3">
                  <h3 className="text-2xl sm:text-[1.7rem]">{i.name}</h3>
                  <span className="mb-1.5 flex-1 border-b border-dotted border-ink/30" />
                  <span className="whitespace-nowrap font-display text-xl text-brand">{i.price}</span>
                </div>
                {i.description && <p className="mt-1.5 text-[15px] text-ink-muted">{i.description}</p>}
                {i.tags && (
                  <p className="mt-2 flex flex-wrap gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                    {i.tags.map((t) => (
                      <span key={t} className={t === 'chef' ? 'text-brand' : ''}>
                        {t === 'chef' ? '★ ' : '• '}
                        {d[t]}
                      </span>
                    ))}
                  </p>
                )}
              </li>
            ))}
            {items.length === 0 && <li className="text-ink-muted">—</li>}
          </ul>
        </div>
        {s.note && <p className="mt-16 border-t border-ink/10 pt-6 text-sm text-ink-muted">{s.note}</p>}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Reservation — hero bar + full form share state via a DOM event        */
/* ------------------------------------------------------------------ */

type Prefill = { date: string; time: string; guests: string }
const PREFILL_EVENT = 'site:prefill-reservation'

function today() {
  const t = new Date()
  t.setMinutes(t.getMinutes() - t.getTimezoneOffset())
  return t.toISOString().slice(0, 10)
}

function slotsOf(site: SiteConfig) {
  const r = site.sections.find((x) => x.type === 'reservation')
  return r?.type === 'reservation' ? r : undefined
}

export function ReservationBar({ site, d }: { site: SiteConfig; d: Dict }) {
  const r = slotsOf(site)
  if (!r) return null
  const target = r.id ?? 'rezerwacja'
  return (
    <form
      className="grid grid-cols-2 gap-px overflow-hidden rounded-theme bg-white/15 text-left text-white backdrop-blur-md sm:grid-cols-[1fr_1fr_1fr_auto]"
      onSubmit={(e) => {
        e.preventDefault()
        const f = new FormData(e.currentTarget)
        window.dispatchEvent(new CustomEvent<Prefill>(PREFILL_EVENT, { detail: { date: String(f.get('date')), time: String(f.get('time')), guests: String(f.get('guests')) } }))
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
      }}
    >
      {[
        { name: 'date', label: d.date, el: <input name="date" type="date" min={today()} defaultValue={today()} className="w-full bg-transparent text-lg outline-none [color-scheme:dark]" /> },
        {
          name: 'time',
          label: d.time,
          el: (
            <select name="time" className="w-full bg-transparent text-lg outline-none [&>option]:text-black" defaultValue={r.slots[Math.floor(r.slots.length / 2)]}>
              {r.slots.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          ),
        },
        {
          name: 'guests',
          label: d.guests,
          el: (
            <select name="guests" defaultValue="2" className="w-full bg-transparent text-lg outline-none [&>option]:text-black">
              {Array.from({ length: r.maxGuests }, (_, i) => i + 1).map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          ),
        },
      ].map((f) => (
        <label key={f.name} className="bg-black/35 px-5 py-3.5">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">{f.label}</span>
          {f.el}
        </label>
      ))}
      <button className="bg-brand px-8 py-4 font-semibold text-brand-ink transition hover:brightness-110">{d.book}</button>
    </form>
  )
}

export function Reservation({ section: s, site, d }: SectionProps<ReservationSection>) {
  const { status, submit } = useLead(site.slug, 'reservation')
  const b = site.business
  const [v, setV] = useState<Prefill>({ date: today(), time: s.slots[Math.floor(s.slots.length / 2)], guests: '2' })

  useEffect(() => {
    const on = (e: Event) => setV((e as CustomEvent<Prefill>).detail)
    window.addEventListener(PREFILL_EVENT, on)
    return () => window.removeEventListener(PREFILL_EVENT, on)
  }, [])

  return (
    <section id={s.id} className="section bg-inverse text-inverse-ink">
      <div className="container-site grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Kicker index={navIndex(site, s.id)} label={s.nav} className="!text-inverse-ink/60" />
          <h2 className="h2" data-reveal>
            <Rich text={s.title} />
          </h2>
          {s.subtitle && <p className="mt-6 text-lg text-inverse-ink/70">{s.subtitle}</p>}
          {b.openingHours && <Hours site={site} d={d} inverse />}
          {b.phone && (
            <a href={telHref(b.phone)} className="mt-10 inline-block font-display text-4xl text-brand link-underline">
              {b.phone}
            </a>
          )}
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          {s.externalUrl ? (
            <a href={s.externalUrl} className="btn-primary w-full" target="_blank" rel="noopener noreferrer">
              {d.bookExternal}
            </a>
          ) : status === 'sent' ? (
            <div className="border-l-2 border-brand py-6 pl-8">
              <p className="font-display text-4xl">Do zobaczenia!</p>
              <p className="mt-3 text-lg text-inverse-ink/75">{d.sent}</p>
            </div>
          ) : (
            <form
              className="grid gap-x-8 gap-y-8 sm:grid-cols-3 [&_.field]:border-inverse-ink/25 [&_.field]:text-inverse-ink [&_.label]:text-inverse-ink/55"
              onSubmit={(e) => {
                e.preventDefault()
                submit(e.currentTarget)
              }}
            >
              <div>
                <label className="label" htmlFor="r-date">
                  {d.date}
                </label>
                <input id="r-date" name="date" type="date" required min={today()} value={v.date} onChange={(e) => setV({ ...v, date: e.target.value })} className="field [color-scheme:dark]" />
              </div>
              <div>
                <label className="label" htmlFor="r-time">
                  {d.time}
                </label>
                <select id="r-time" name="time" required className="field [&>option]:text-black" value={v.time} onChange={(e) => setV({ ...v, time: e.target.value })}>
                  {s.slots.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label" htmlFor="r-guests">
                  {d.guests}
                </label>
                <select id="r-guests" name="guests" className="field [&>option]:text-black" value={v.guests} onChange={(e) => setV({ ...v, guests: e.target.value })}>
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
                {status === 'sending' ? d.sending : d.book} <Arrow />
              </button>
              {status === 'error' && <p className="text-sm text-red-300 sm:col-span-3">{d.error}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export function Hours({ site, d, inverse }: { site: SiteConfig; d: Dict; inverse?: boolean }) {
  return (
    <div className="mt-10">
      <h3 className={`label mb-4 ${inverse ? '!text-inverse-ink/55' : ''}`}>{d.hours}</h3>
      <dl className={`max-w-sm divide-y ${inverse ? 'divide-inverse-ink/15' : 'divide-line'}`}>
        {site.business.openingHours?.map((h) => (
          <div key={h.days} className="flex justify-between py-2.5">
            <dt className={inverse ? 'text-inverse-ink/70' : 'text-ink-muted'}>{h.days}</dt>
            <dd className="font-semibold tabular-nums">{h.hours}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export { Icon }
