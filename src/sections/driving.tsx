'use client'

import { useEffect, useRef, useState } from 'react'
import type { Dict } from '@/engine/i18n'
import type { CourseItem, CoursesSection, LicenceCostSection, PassRateSection, SiteConfig, TeamSection } from '@/engine/types'
import { useLead } from './lead'
import { Arrow, Icon, Kicker, Picture, Rich, navIndex, type SectionProps } from './ui'

const ENROLL_EVENT = 'site:open-enrollment'
type EnrollDetail = { course?: string; date?: string }

function fmt(n: number, currency: string, locale = 'pl-PL') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency, minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 }).format(n)
}
function fmtDate(iso: string) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' })
}
function coursesOf(site: SiteConfig) {
  const c = site.sections.find((x) => x.type === 'courses')
  return c?.type === 'courses' ? c : undefined
}
export function openEnrollment(detail: EnrollDetail = {}) {
  window.dispatchEvent(new CustomEvent<EnrollDetail>(ENROLL_EVENT, { detail }))
}

/** Category badge styled like a road sign plate. */
function Plate({ code, size = 'md' }: { code: string; size?: 'md' | 'lg' }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center self-start justify-center rounded-[12px] border-[3px] border-white bg-brand font-display text-brand-ink shadow-[0_0_0_2px_rgb(var(--c-brand))] ${
        size === 'lg' ? 'h-20 min-w-20 px-3 text-4xl' : 'h-14 min-w-14 px-2 text-2xl'
      }`}
    >
      {code}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Pass rate vs regional average                                        */
/* ------------------------------------------------------------------ */

function Bar({ value, tone, label, animate }: { value: number; tone: 'brand' | 'muted'; label: string; animate: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-36 shrink-0 text-xs font-medium uppercase tracking-[0.14em] text-inverse-ink/60 sm:w-44">{label}</span>
      <div className="relative h-11 flex-1 overflow-hidden rounded-full bg-inverse-ink/10">
        <div
          className={`absolute inset-y-0 left-0 flex items-center justify-end rounded-full pr-4 font-display text-lg transition-[width] duration-[1400ms] ease-out ${
            tone === 'brand' ? 'bg-accent text-ink' : 'bg-inverse-ink/25 text-inverse-ink'
          }`}
          style={{ width: animate ? `${value}%` : '0%' }}
        >
          {value}%
        </div>
      </div>
    </div>
  )
}

export function PassRate({ section: s, site, d }: SectionProps<PassRateSection>) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.3 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  const best = s.rows.reduce((a, r) => (r.school - r.region > a.school - a.region ? r : a), s.rows[0])

  return (
    <section id={s.id} className="section bg-inverse text-inverse-ink">
      <div className="container-site grid grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Kicker index={navIndex(site, s.id)} label={s.nav} className="!text-inverse-ink/60" />
          <h2 className="h2" data-reveal>
            <Rich text={s.title} />
          </h2>
          {s.subtitle && <p className="mt-6 text-lg text-inverse-ink/70">{s.subtitle}</p>}
          <div className="mt-10 inline-flex items-end gap-4 rounded-theme bg-accent px-6 py-5 text-ink" data-reveal>
            <span className="font-display text-6xl leading-none">+{best.school - best.region}</span>
            <span className="pb-1 text-sm font-semibold leading-tight">
              pkt proc. powyżej
              <br />
              średniej · {best.label.toLowerCase()}
            </span>
          </div>
        </div>
        <div ref={ref} className="lg:col-span-6 lg:col-start-7">
          <p className="mb-8 inline-block rounded-full border border-inverse-ink/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]">{s.period}</p>
          <div className="space-y-10">
            {s.rows.map((r) => (
              <div key={r.label}>
                <h3 className="mb-4 font-body text-xl font-semibold tracking-normal">{r.label}</h3>
                <div className="space-y-2.5">
                  <Bar value={r.school} tone="brand" label={site.business.name} animate={on} />
                  <Bar value={r.region} tone="muted" label={d.region} animate={on} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 border-t border-inverse-ink/15 pt-5 text-xs leading-relaxed text-inverse-ink/55">
            {d.source}:{' '}
            {s.sourceUrl ? (
              <a href={s.sourceUrl} className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">
                {s.source}
              </a>
            ) : (
              s.source
            )}
          </p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Courses with upcoming start dates + enrollment dialog                */
/* ------------------------------------------------------------------ */

function CourseCard({ c, s, d }: { c: CourseItem; s: CoursesSection; d: Dict }) {
  const featured = Boolean(c.badge)
  return (
    <article
      className={`relative flex flex-col rounded-theme border p-7 transition duration-500 hover:-translate-y-1 ${
        featured ? 'border-brand bg-brand text-brand-ink shadow-[0_30px_60px_-30px_rgb(var(--c-brand))]' : 'border-line bg-card'
      }`}
      data-reveal
    >
      {c.badge && <span className="absolute right-6 top-6 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">{c.badge}</span>}
      <Plate code={c.code} />
      <h3 className="mt-6 text-2xl">{c.name}</h3>
      {c.description && <p className={`mt-2 text-[15px] ${featured ? 'text-brand-ink/80' : 'text-ink-muted'}`}>{c.description}</p>}
      <p className="mt-6 font-display text-[clamp(2.2rem,9vw,3rem)] leading-none">
        {fmt(c.price, s.currency)}
      </p>
      {c.installments && <p className={`mt-2 text-sm ${featured ? 'text-brand-ink/75' : 'text-ink-muted'}`}>{d.installments} · od {fmt(Math.ceil(c.price / 3), s.currency)}/{d.perMonth}</p>}
      <ul className="mt-6 space-y-2 text-[15px]">
        {c.includes.map((i) => (
          <li key={i} className="flex gap-2.5">
            <Icon name="check" className={`mt-0.5 h-4 w-4 shrink-0 ${featured ? 'text-accent' : 'text-brand'}`} />
            {i}
          </li>
        ))}
      </ul>
      {c.starts && c.starts.length > 0 && (
        <div className="mt-7">
          <p className={`label mb-3 ${featured ? '!text-brand-ink/70' : ''}`}>{d.nextStarts}</p>
          <div className="flex flex-wrap gap-2">
            {c.starts.map((st) => {
              const last = st.seatsLeft !== undefined && st.seatsLeft <= 3
              return (
                <button
                  key={st.date}
                  type="button"
                  onClick={() => openEnrollment({ course: c.id, date: st.date })}
                  className={`group rounded-full border px-3.5 py-1.5 text-left text-sm transition ${
                    featured ? 'border-brand-ink/30 hover:bg-brand-ink hover:text-brand' : 'border-line hover:border-ink hover:bg-ink hover:text-bg'
                  }`}
                >
                  <strong className="font-semibold">{fmtDate(st.date)}</strong>
                  {st.mode && <span className="opacity-70"> · {st.mode}</span>}
                  {st.seatsLeft !== undefined && (
                    <span className={`ml-1.5 text-xs ${last ? 'font-semibold text-red-500 group-hover:text-current' : 'opacity-60'}`}>
                      {last ? `· ${d.lastSeats}` : `· ${st.seatsLeft} ${d.seatsLeft}`}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => openEnrollment({ course: c.id, date: c.starts?.[0]?.date })}
        className={`btn mt-8 w-full ${featured ? 'bg-accent text-ink hover:brightness-95' : 'bg-ink text-bg hover:opacity-90'}`}
      >
        {d.enroll} <Arrow />
      </button>
    </article>
  )
}

export function Courses({ section: s, site, d }: SectionProps<CoursesSection>) {
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
          {s.subtitle && <p className="text-lg text-ink-muted lg:col-span-4 lg:col-start-9">{s.subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {s.items.map((c) => (
            <CourseCard key={c.id} c={c} s={s} d={d} />
          ))}
        </div>
        {s.extraHourPrice && (
          <p className="mt-8 text-sm text-ink-muted">
            Dodatkowa godzina jazdy: <strong className="text-ink">{fmt(s.extraHourPrice, s.currency)}</strong> · jazdy także w weekendy i wieczorami
          </p>
        )}
      </div>
      <EnrollmentDialog site={site} d={d} />
    </section>
  )
}

function EnrollmentDialog({ site, d }: { site: SiteConfig; d: Dict }) {
  const ref = useRef<HTMLDialogElement>(null)
  const courses = coursesOf(site)
  const [course, setCourse] = useState(courses?.items[0]?.id ?? '')
  const [date, setDate] = useState('')
  const { status, submit } = useLead(site.slug, 'enrollment')

  useEffect(() => {
    const on = (e: Event) => {
      const det = (e as CustomEvent<EnrollDetail>).detail
      const c = det.course ?? courses?.items[0]?.id ?? ''
      setCourse(c)
      setDate(det.date ?? courses?.items.find((x) => x.id === c)?.starts?.[0]?.date ?? '')
      ref.current?.showModal()
    }
    window.addEventListener(ENROLL_EVENT, on)
    return () => window.removeEventListener(ENROLL_EVENT, on)
  }, [courses])

  const current = courses?.items.find((x) => x.id === course)

  return (
    <dialog
      ref={ref}
      className="m-auto w-[min(560px,calc(100vw-24px))] rounded-theme bg-bg p-0 text-ink shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      onClick={(e) => e.target === ref.current && ref.current?.close()}
    >
      <div className="relative p-7 sm:p-9">
        <button type="button" onClick={() => ref.current?.close()} className="absolute right-5 top-5 rounded-full p-2 hover:bg-ink/5" aria-label="Zamknij">
          ✕
        </button>
        {status === 'sent' ? (
          <div className="py-6">
            <p className="font-display text-4xl">Do zobaczenia na placu!</p>
            <p className="mt-4 text-lg text-ink-muted">{d.enrollSent}</p>
          </div>
        ) : (
          <form
            className="grid gap-6"
            onSubmit={(e) => {
              e.preventDefault()
              submit(e.currentTarget, { courseName: current?.name, price: current?.price })
            }}
          >
            <div className="flex items-center gap-4">
              {current && <Plate code={current.code} />}
              <div>
                <p className="label">{d.enroll}</p>
                <p className="font-display text-2xl leading-tight">{current?.name}</p>
              </div>
            </div>
            <div>
              <label className="label" htmlFor="e-course">
                {d.course}
              </label>
              <select
                id="e-course"
                name="course"
                className="field"
                value={course}
                onChange={(e) => {
                  setCourse(e.target.value)
                  setDate(courses?.items.find((x) => x.id === e.target.value)?.starts?.[0]?.date ?? '')
                }}
              >
                {courses?.items.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} — {c.name}
                  </option>
                ))}
              </select>
            </div>
            {current?.starts && current.starts.length > 0 && (
              <fieldset>
                <legend className="label mb-3">{d.chooseDate}</legend>
                <div className="flex flex-wrap gap-2">
                  {current.starts.map((st) => (
                    <label key={st.date} className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition ${date === st.date ? 'border-brand bg-brand text-brand-ink' : 'border-line hover:border-ink'}`}>
                      <input type="radio" name="startDate" value={st.date} checked={date === st.date} onChange={() => setDate(st.date)} className="sr-only" />
                      {fmtDate(st.date)}
                      {st.mode && ` · ${st.mode}`}
                    </label>
                  ))}
                </div>
              </fieldset>
            )}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="e-name">
                  {d.name}
                </label>
                <input id="e-name" name="name" required className="field" autoComplete="name" />
              </div>
              <div>
                <label className="label" htmlFor="e-phone">
                  {d.phone}
                </label>
                <input id="e-phone" name="phone" type="tel" required className="field" autoComplete="tel" />
              </div>
            </div>
            <label className="flex gap-3 text-sm text-ink-muted">
              <input type="checkbox" name="hasPkk" className="mt-0.5 h-4 w-4 accent-[rgb(var(--c-brand))]" />
              Mam już numer PKK (profil kandydata na kierowcę)
            </label>
            <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <button className="btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? d.sending : d.enroll} <Arrow />
            </button>
            {status === 'error' && <p className="text-sm text-red-600">{d.error}</p>}
            <p className="text-xs text-ink-muted">Bez opłat na start — płatność przy pierwszych zajęciach.</p>
          </form>
        )}
      </div>
    </dialog>
  )
}

/* ------------------------------------------------------------------ */
/* Total licence cost calculator                                        */
/* ------------------------------------------------------------------ */

export function LicenceCost({ section: s, site, d }: SectionProps<LicenceCostSection>) {
  const courses = coursesOf(site)
  const [course, setCourse] = useState(s.defaultCourse ?? courses?.items[0]?.id ?? '')
  const [extra, setExtra] = useState(0)
  const [attempts, setAttempts] = useState(1)
  const c = courses?.items.find((x) => x.id === course)
  const hour = courses?.extraHourPrice ?? 0

  const lines = [
    { label: `${d.course}: ${c?.name ?? ''}`, amount: c?.price ?? 0 },
    ...(extra ? [{ label: `${d.extraHours}: ${extra} × ${fmt(hour, s.currency)}`, amount: extra * hour }] : []),
    ...s.fees.map((f) => ({ label: f.perAttempt && attempts > 1 ? `${f.label} × ${attempts}` : f.label, amount: f.amount * (f.perAttempt ? attempts : 1) })),
  ]
  const total = lines.reduce((a, l) => a + l.amount, 0)

  return (
    <section id={s.id} className="section bg-bg-alt">
      <div className="container-site">
        <div className="mb-14 max-w-3xl">
          <Kicker index={navIndex(site, s.id)} label={s.nav} />
          <h2 className="h2" data-reveal>
            <Rich text={s.title} />
          </h2>
          {s.subtitle && <p className="mt-5 text-lg text-ink-muted">{s.subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="space-y-10 rounded-theme bg-card p-6 sm:p-10 lg:col-span-7">
            <fieldset>
              <legend className="label mb-4">{d.course}</legend>
              <div className="flex flex-wrap gap-2">
                {courses?.items.map((x) => (
                  <button
                    key={x.id}
                    type="button"
                    onClick={() => setCourse(x.id)}
                    aria-pressed={course === x.id}
                    className={`flex items-center gap-3 rounded-full border py-1.5 pl-1.5 pr-4 text-sm font-semibold transition ${course === x.id ? 'border-brand bg-brand/10' : 'border-line hover:border-ink'}`}
                  >
                    <span className={`flex h-8 min-w-8 items-center justify-center rounded-full px-2 font-display text-xs ${course === x.id ? 'bg-brand text-brand-ink' : 'bg-ink/5'}`}>{x.code}</span>
                    {x.name}
                  </button>
                ))}
              </div>
            </fieldset>
            <div>
              <div className="mb-3 flex items-baseline justify-between">
                <label htmlFor="lc-extra" className="label">
                  {d.extraHours}
                </label>
                <span className="font-display text-3xl">{extra} h</span>
              </div>
              <input id="lc-extra" type="range" min={0} max={20} value={extra} onChange={(e) => setExtra(Number(e.target.value))} className="w-full accent-[rgb(var(--c-brand))]" />
              <p className="mt-2 text-sm text-ink-muted">Średnio kursanci dobierają 4–8 godzin przed egzaminem.</p>
            </div>
            <fieldset>
              <legend className="label mb-4">{d.attempts}</legend>
              <div className="grid grid-cols-3 overflow-hidden rounded-theme border border-ink">
                {[1, 2, 3].map((n) => (
                  <button key={n} type="button" onClick={() => setAttempts(n)} aria-pressed={attempts === n} className={`py-3 font-display text-lg transition ${n > 1 ? 'border-l border-ink' : ''} ${attempts === n ? 'bg-ink text-bg' : 'hover:bg-ink/5'}`}>
                    {n}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-sm text-ink-muted">Średnia krajowa to ok. 1,7 podejścia na placu — u nas mniej (patrz zdawalność).</p>
            </fieldset>
          </div>

          <div className="flex flex-col rounded-theme bg-inverse p-6 text-inverse-ink sm:p-10 lg:col-span-5">
            <p className="label !text-inverse-ink/55">{d.total}</p>
            <p className="mt-3 font-display text-[clamp(2.2rem,10vw,3.75rem)] leading-none text-accent" aria-live="polite">
              {fmt(total, s.currency)}
            </p>
            <dl className="mt-8 divide-y divide-inverse-ink/10 border-y border-inverse-ink/10 text-sm">
              {lines.map((l) => (
                <div key={l.label} className="flex justify-between gap-6 py-3">
                  <dt className="text-inverse-ink/70">{l.label}</dt>
                  <dd className="whitespace-nowrap font-semibold tabular-nums">{fmt(l.amount, s.currency)}</dd>
                </div>
              ))}
            </dl>
            {s.note && <p className="mt-5 text-xs leading-relaxed text-inverse-ink/50">{s.note}</p>}
            <button type="button" onClick={() => openEnrollment({ course })} className="btn mt-auto bg-accent pt-4 text-ink hover:brightness-95 max-lg:mt-8 lg:mt-10">
              {d.enroll} na {c?.code} <Arrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Team (instructors) + fleet                                           */
/* ------------------------------------------------------------------ */

export function Team({ section: s, site }: SectionProps<TeamSection>) {
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
          {s.subtitle && <p className="text-lg text-ink-muted lg:col-span-4 lg:col-start-9">{s.subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {s.members.map((m, i) => (
            <article key={m.name} className="group" data-reveal style={{ ['--d' as string]: `${i * 90}ms` }}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-theme bg-bg-alt">
                <Picture image={m.photo} label={m.name} sizes={600} className="grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                {m.facts && (
                  <ul className="absolute inset-x-3 bottom-3 flex flex-wrap gap-1.5">
                    {m.facts.map((f) => (
                      <li key={f} className="rounded-full bg-bg/90 px-2.5 py-1 text-[11px] font-semibold backdrop-blur">
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <h3 className="mt-4 text-xl">{m.name}</h3>
              <p className="text-sm text-ink-muted">{m.role}</p>
              {m.bio && <p className="mt-2 text-[15px] text-ink-muted">{m.bio}</p>}
            </article>
          ))}
        </div>
        {s.fleet && (
          <div className="mt-20">
            <p className="label mb-6">Nasza flota</p>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {s.fleet.map((f) => (
                <article key={f.name} className="overflow-hidden rounded-theme border border-line bg-card" data-reveal>
                  <div className="aspect-[16/10] overflow-hidden">
                    <Picture image={f.image} label={f.name} sizes={800} />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg">{f.name}</h3>
                    <p className="mt-1 text-sm text-ink-muted">{f.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
