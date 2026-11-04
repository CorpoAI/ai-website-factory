'use client'

import { useMemo, useState } from 'react'
import type { FirstStepsSection, FuneralCostSection, Obituary, ObituariesSection } from '@/engine/types'
import { useLead } from './lead'
import { Arrow, Icon, Kicker, Rich, navIndex, telHref, type SectionProps } from './ui'

function fmt(n: number, currency: string) {
  return new Intl.NumberFormat('pl-PL', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n)
}

/* ------------------------------------------------------------------ */
/* First steps — "what to do when someone dies"                         */
/* ------------------------------------------------------------------ */

export function FirstSteps({ section: s, site, d }: SectionProps<FirstStepsSection>) {
  const [tab, setTab] = useState(s.scenarios[0]?.id)
  const sc = s.scenarios.find((x) => x.id === tab) ?? s.scenarios[0]
  const { status, submit } = useLead(site.slug, 'contact')
  const phone = site.business.phone

  return (
    <section id={s.id} className="section">
      <div className="container-site grid grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Kicker index={navIndex(site, s.id)} label={s.nav} />
          <h2 className="h2" data-reveal>
            <Rich text={s.title} />
          </h2>
          {s.subtitle && <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">{s.subtitle}</p>}

          <div className="mt-10 flex flex-wrap gap-2" role="tablist">
            {s.scenarios.map((x) => (
              <button
                key={x.id}
                type="button"
                role="tab"
                aria-selected={tab === x.id}
                onClick={() => setTab(x.id)}
                className={`rounded-full border px-5 py-2.5 text-sm font-medium transition ${tab === x.id ? 'border-brand bg-brand text-brand-ink' : 'border-line hover:border-ink/40'}`}
              >
                {x.label}
              </button>
            ))}
          </div>

          <ol key={tab} className="mt-10 border-l border-line">
            {sc.steps.map((st, i) => (
              <li key={st.title} className="relative pb-10 pl-10 last:pb-0 animate-rise-in" style={{ animationDelay: `${i * 70}ms` }}>
                <span className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-bg font-display text-base text-brand">{i + 1}</span>
                <h3 className="font-body text-lg font-semibold tracking-normal">{st.title}</h3>
                <p className="mt-1.5 max-w-xl leading-relaxed text-ink-muted">{st.description}</p>
              </li>
            ))}
          </ol>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="rounded-theme bg-inverse p-8 text-inverse-ink lg:sticky lg:top-24">
            <p className="label !text-inverse-ink/60">{d.call24}</p>
            {phone && (
              <a href={telHref(phone)} className="mt-4 block font-display text-4xl leading-tight tabular-nums">
                {phone}
              </a>
            )}
            {site.business.serviceArea && <p className="mt-3 text-sm text-inverse-ink/65">{site.business.serviceArea}</p>}
            {s.reassurance && <p className="mt-6 border-t border-inverse-ink/15 pt-6 leading-relaxed text-inverse-ink/80">{s.reassurance}</p>}

            {status === 'sent' ? (
              <p className="mt-8 border-l-2 border-accent pl-4">{d.callbackSent}</p>
            ) : (
              <form
                className="mt-8 grid gap-4 [&_.field]:border-inverse-ink/25 [&_.field]:text-inverse-ink [&_.field]:placeholder:text-inverse-ink/45"
                onSubmit={(e) => {
                  e.preventDefault()
                  submit(e.currentTarget, { request: 'callback' })
                }}
              >
                <p className="text-sm font-semibold">{d.callback}</p>
                <input name="name" required placeholder={d.name} className="field !text-base" autoComplete="name" />
                <input name="phone" required type="tel" placeholder={d.phone} className="field !text-base" autoComplete="tel" />
                <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                <button className="btn mt-2 bg-inverse-ink text-inverse hover:opacity-90" disabled={status === 'sending'}>
                  {status === 'sending' ? d.sending : d.callback}
                </button>
                {status === 'error' && <p className="text-sm text-red-300">{d.error}</p>}
              </form>
            )}
          </div>
        </aside>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Obituaries & funeral schedule                                         */
/* ------------------------------------------------------------------ */

function seed(name: string) {
  let h = 0
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) % 997
  return 12 + (h % 60)
}

function Candle({ lit }: { lit: boolean }) {
  return (
    <svg viewBox="0 0 24 32" className="h-7 w-5" aria-hidden>
      {lit && (
        <path d="M12 2c2.2 3 3 5 3 6.6A3 3 0 0 1 12 11.5 3 3 0 0 1 9 8.6C9 7 9.8 5 12 2z" fill="rgb(var(--c-accent))" className="origin-bottom animate-flicker" />
      )}
      <rect x="11.4" y="11" width="1.2" height="3" fill="currentColor" opacity=".6" />
      <rect x="7" y="14" width="10" height="16" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

function ObituaryCard({ o, d }: { o: Obituary; d: SectionProps<ObituariesSection>['d'] }) {
  const [lit, setLit] = useState(false)
  const base = useMemo(() => seed(o.name), [o.name])
  return (
    <article className="flex flex-col border border-line bg-card p-7" data-reveal>
      <span className="mb-5 h-px w-10 bg-accent" />
      <h3 className="text-[1.9rem] leading-tight">{o.name}</h3>
      <p className="mt-1 text-sm text-ink-muted">
        {o.age && <>{o.age} · </>}zm. {o.died}
      </p>
      <dl className="mt-6 space-y-1 border-t border-line pt-5 text-[15px]">
        <dt className="label">{d.ceremony}</dt>
        <dd className="font-semibold">
          {o.ceremony.date}, godz. {o.ceremony.time}
        </dd>
        <dd className="text-ink-muted">{o.ceremony.place}</dd>
      </dl>
      {o.note && <p className="mt-4 text-sm italic text-ink-muted">{o.note}</p>}
      <button
        type="button"
        onClick={() => setLit(true)}
        disabled={lit}
        className={`mt-auto flex items-center gap-3 pt-7 text-sm transition ${lit ? 'text-ink' : 'text-ink-muted hover:text-ink'}`}
      >
        <Candle lit={lit} />
        <span>
          {lit ? 'Znicz zapalony' : d.candle} · {base + (lit ? 1 : 0)} {d.candles}
        </span>
      </button>
    </article>
  )
}

export function Obituaries({ section: s, site, d }: SectionProps<ObituariesSection>) {
  const [q, setQ] = useState('')
  const items = s.items.filter((o) => o.name.toLowerCase().includes(q.trim().toLowerCase()))
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
          <label className="flex w-full max-w-xs items-center gap-3 border-b border-ink/30 pb-2">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink-muted" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span className="sr-only">{d.search}</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Imię lub nazwisko" className="w-full bg-transparent outline-none placeholder:text-ink-muted/60" />
          </label>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((o) => (
            <ObituaryCard key={o.name} o={o} d={d} />
          ))}
          {items.length === 0 && <p className="text-ink-muted">Brak wyników.</p>}
        </div>
        {s.note && <p className="mt-10 text-sm text-ink-muted">{s.note}</p>}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Funeral cost estimate with ZUS allowance                             */
/* ------------------------------------------------------------------ */

export function FuneralCost({ section: s, site, d }: SectionProps<FuneralCostSection>) {
  const [type, setType] = useState(s.types[0].id)
  const [extras, setExtras] = useState<string[]>([])
  const t = s.types.find((x) => x.id === type)!
  const extrasSum = s.extras.filter((e) => extras.includes(e.id)).reduce((a, e) => a + e.price, 0)
  const total = t.base + extrasSum
  const allowance = s.allowance?.amount ?? 0
  const diff = total - allowance

  return (
    <section id={s.id} className="section">
      <div className="container-site">
        <div className="mb-14 max-w-3xl">
          <Kicker index={navIndex(site, s.id)} label={s.nav} />
          <h2 className="h2" data-reveal>
            <Rich text={s.title} />
          </h2>
          {s.subtitle && <p className="mt-5 text-lg leading-relaxed text-ink-muted">{s.subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-7">
            <fieldset>
              <legend className="label mb-4">{d.funeralType}</legend>
              <div className="grid grid-cols-1 gap-3">
                {s.types.map((x) => (
                  <label
                    key={x.id}
                    className={`flex cursor-pointer gap-5 border p-6 transition ${type === x.id ? 'border-brand bg-card ring-1 ring-brand' : 'border-line hover:border-ink/30'}`}
                  >
                    <input type="radio" name="funeral-type" value={x.id} checked={type === x.id} onChange={() => setType(x.id)} className="mt-1.5 h-4 w-4 shrink-0 accent-[rgb(var(--c-brand))]" />
                    <span className="flex-1">
                      <span className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="font-display text-2xl">{x.label}</span>
                        <span className="text-sm text-ink-muted">od {fmt(x.base, s.currency)}</span>
                      </span>
                      <span className="mt-1 block text-[15px] text-ink-muted">{x.description}</span>
                      {type === x.id && (
                        <span className="mt-4 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
                          {x.includes.map((i) => (
                            <span key={i} className="flex gap-2">
                              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                              {i}
                            </span>
                          ))}
                        </span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="label mb-4">{d.extras}</legend>
              <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                {s.extras.map((e) => (
                  <label key={e.id} className="flex cursor-pointer items-center justify-between gap-4 border-b border-line py-3.5">
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={extras.includes(e.id)}
                        onChange={(ev) => setExtras(ev.target.checked ? [...extras, e.id] : extras.filter((x) => x !== e.id))}
                        className="h-4 w-4 accent-[rgb(var(--c-brand))]"
                      />
                      {e.label}
                    </span>
                    <span className="text-sm tabular-nums text-ink-muted">+{fmt(e.price, s.currency)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-theme border border-line bg-card p-8 lg:sticky lg:top-24">
              <dl className="space-y-3 text-[15px]">
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-muted">{t.label}</dt>
                  <dd className="tabular-nums">{fmt(t.base, s.currency)}</dd>
                </div>
                {extrasSum > 0 && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-muted">{d.extras}</dt>
                    <dd className="tabular-nums">{fmt(extrasSum, s.currency)}</dd>
                  </div>
                )}
                {s.allowance && (
                  <div className="flex justify-between gap-4 border-t border-line pt-3">
                    <dt className="text-ink-muted">− {s.allowance.label}</dt>
                    <dd className="tabular-nums text-brand">−{fmt(allowance, s.currency)}</dd>
                  </div>
                )}
              </dl>
              <p className="label mt-8">{diff > 0 ? d.toPay : d.remaining}</p>
              <p className="mt-2 font-display text-[clamp(2.6rem,9vw,3.6rem)] leading-none tabular-nums" aria-live="polite">
                {fmt(Math.abs(diff), s.currency)}
              </p>
              {s.allowance?.note && <p className="mt-5 text-sm leading-relaxed text-ink-muted">{s.allowance.note}</p>}
              <a href="#kontakt" className="btn-primary mt-8 w-full">
                Porozmawiajmy o szczegółach <Arrow />
              </a>
              {s.note && <p className="mt-5 text-xs leading-relaxed text-ink-muted">{s.note}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
