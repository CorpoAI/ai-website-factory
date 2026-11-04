import type {
  AboutSection,
  CTASection,
  EventsSection,
  FAQSection,
  FeaturesSection,
  HeroSection,
  MarqueeSection,
  ProcessSection,
  StatsSection,
} from '@/engine/types'
import { ReservationBar } from './interactive'
import { CountUp } from './motion'
import { Arrow, Icon, Kicker, Picture, Rich, Stars, navIndex, telHref, type SectionProps } from './ui'

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export function Hero({ section: s, site, d }: SectionProps<HeroSection>) {
  const rating = site.business.rating
  const variant = s.variant ?? 'image'

  const ratingBlock = rating && (
    <div className="flex items-center gap-3">
      <span className="font-display text-4xl leading-none">{rating.value.toFixed(1).replace('.', ',')}</span>
      <span className="text-xs leading-tight opacity-80">
        <Stars value={rating.value} />
        <br />
        {rating.count} {d.reviews}
        {rating.source && ` · ${rating.source}`}
      </span>
    </div>
  )

  /* Split: editorial headline left, tall photo right (renovation / interiors) */
  if (variant === 'split') {
    return (
      <section className="relative overflow-hidden pt-24 lg:pt-28">
        <div className="container-site grid grid-cols-1 gap-10 pb-16 lg:grid-cols-12 lg:gap-12 lg:pb-24">
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              {s.eyebrow && <p className="eyebrow mb-8 text-ink-muted animate-rise-in">{s.eyebrow}</p>}
              <h1 className="text-[calc(3.2rem*var(--display-scale,1))] sm:text-[calc(4.5rem*var(--display-scale,1))] lg:text-[calc(6.6rem*var(--display-scale,1))] animate-rise-in [animation-delay:120ms]">
                <Rich text={s.title} />
              </h1>
            </div>
            <div className="mt-10 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end animate-rise-in [animation-delay:240ms]">
              {s.subtitle && <p className="max-w-md text-lg leading-relaxed text-ink-muted">{s.subtitle}</p>}
              {ratingBlock}
            </div>
            <div className="mt-10 flex flex-wrap gap-3 animate-rise-in [animation-delay:360ms]">
              {s.primaryCta && (
                <a href={s.primaryCta.href} className="btn-primary">
                  {s.primaryCta.label} <Arrow />
                </a>
              )}
              {s.secondaryCta && (
                <a href={s.secondaryCta.href} className="btn-ghost">
                  {s.secondaryCta.label}
                </a>
              )}
            </div>
          </div>
          <div className="relative lg:col-span-5">
            <div className="grain relative aspect-[4/5] overflow-hidden rounded-theme lg:aspect-auto lg:h-full lg:min-h-[640px]">
              <Picture image={s.image} priority className="animate-slow-zoom" />
            </div>
            {s.highlights && (
              <ul className="absolute -bottom-6 left-6 right-6 grid gap-px bg-line shadow-2xl sm:left-auto sm:w-72">
                {s.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3 bg-card px-5 py-4 text-sm font-medium">
                    <Icon name="check" className="h-4 w-4 text-brand" /> {h}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    )
  }

  /* Image / centered: full-bleed photo with headline over it */
  const centered = variant === 'centered'
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-inverse text-white">
      <div className="grain absolute inset-0 -z-10">
        <Picture image={s.image} priority className="animate-slow-zoom" />
        <div
          className={
            centered
              ? 'absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,.35),rgba(0,0,0,.8))]'
              : 'absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,0,.82)_0%,rgba(0,0,0,.55)_45%,rgba(0,0,0,.15)_100%)]'
          }
        />
      </div>

      <div className={`container-site flex flex-1 flex-col pb-10 pt-32 ${centered ? 'items-center justify-center text-center' : 'justify-end'}`}>
        {s.eyebrow && <p className="eyebrow mb-6 text-white/75 animate-rise-in">{s.eyebrow}</p>}
        <h1
          className={`animate-rise-in [animation-delay:120ms] [&_em]:[filter:var(--hero-em-filter)] ${
            centered ? 'max-w-5xl text-[calc(3.2rem*var(--display-scale,1))] sm:text-[calc(4.5rem*var(--display-scale,1))] lg:text-[calc(7.5rem*var(--display-scale,1))]' : 'max-w-[15ch] text-[calc(3.2rem*var(--display-scale,1))] sm:text-[calc(4.5rem*var(--display-scale,1))] lg:text-[calc(7.5rem*var(--display-scale,1))]'
          }`}
        >
          <Rich text={s.title} />
        </h1>
        <div className={`mt-8 flex flex-col gap-8 animate-rise-in [animation-delay:240ms] ${centered ? 'items-center' : 'lg:flex-row lg:items-end lg:justify-between'}`}>
          <div className={centered ? 'flex flex-col items-center' : ''}>
            {s.subtitle && <p className="max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">{s.subtitle}</p>}
            {!s.reservationBar && (
              <div className={`mt-8 flex flex-wrap gap-3 ${centered ? 'justify-center' : ''}`}>
                {s.primaryCta && (
                  <a href={s.primaryCta.href} className="btn-primary">
                    {s.primaryCta.label} <Arrow />
                  </a>
                )}
                {s.secondaryCta && (
                  <a href={s.secondaryCta.href} className="btn-ghost text-white">
                    {s.secondaryCta.label}
                  </a>
                )}
              </div>
            )}
          </div>
          {!centered && ratingBlock}
        </div>

        {s.reservationBar && (
          <div className="mt-10 w-full max-w-4xl animate-rise-in [animation-delay:360ms]">
            <ReservationBar site={site} d={d} />
            {s.secondaryCta && (
              <a href={s.secondaryCta.href} className="link-underline mt-4 inline-block text-sm text-white/80">
                {s.secondaryCta.label} →
              </a>
            )}
          </div>
        )}
      </div>

      {(s.highlights?.length || (centered && rating)) && (
        <div className="border-t border-white/15">
          <ul className="container-site flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-5 text-[13px] uppercase tracking-[0.14em] text-white/75">
            {centered && rating && (
              <li className="flex items-center gap-2 normal-case tracking-normal">
                <Stars value={rating.value} /> {rating.value.toFixed(1)} · {rating.count} {d.reviews}
              </li>
            )}
            {s.highlights?.map((h) => (
              <li key={h} className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 bg-brand" /> {h}
              </li>
            ))}
            {site.business.phone && (
              <li>
                <a href={telHref(site.business.phone)} className="font-semibold text-white">
                  {site.business.phone}
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Marquee band                                                         */
/* ------------------------------------------------------------------ */

export function Marquee({ section: s }: SectionProps<MarqueeSection>) {
  const row = [...s.items, ...s.items]
  return (
    <section className="overflow-hidden border-y border-ink/10 bg-brand py-5 text-brand-ink" aria-label={s.items.join(', ')}>
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-3xl sm:text-4xl" aria-hidden>
        {[...row, ...row].map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            {t}
            <span className="text-xl">✦</span>
          </span>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Stats — oversized numbers that count up                              */
/* ------------------------------------------------------------------ */

export function Stats({ section: s }: SectionProps<StatsSection>) {
  return (
    <section className="bg-inverse text-inverse-ink">
      <dl className="container-site grid grid-cols-2 lg:grid-cols-4">
        {s.items.map((i, idx) => (
          <div
            key={i.label}
            data-reveal
            style={{ ['--d' as string]: `${idx * 90}ms` }}
            className={`flex flex-col-reverse gap-3 border-inverse-ink/15 py-12 sm:py-16 ${idx % 2 ? 'pl-6 sm:pl-10' : 'pr-6'} ${idx > 0 ? 'lg:border-l lg:pl-10' : ''} ${idx % 2 ? 'border-l' : ''} ${idx > 1 ? 'border-t lg:border-t-0' : ''}`}
          >
            <dt className="text-xs uppercase tracking-[0.18em] text-inverse-ink/60">{i.label}</dt>
            <dd className="font-display text-6xl leading-none text-brand sm:text-7xl lg:text-8xl">
              <CountUp value={i.value} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* About — collage + editorial copy                                     */
/* ------------------------------------------------------------------ */

export function About({ section: s, site }: SectionProps<AboutSection>) {
  return (
    <section id={s.id} className="section overflow-hidden">
      <div className="container-site grid items-center gap-16 lg:grid-cols-12">
        <div className="relative lg:col-span-6" data-reveal>
          <div className="grain relative aspect-[4/5] w-[82%] overflow-hidden rounded-theme">
            <Picture image={s.image} sizes={1000} />
          </div>
          {s.image2 && (
            <div className="grain absolute -bottom-10 right-0 aspect-square w-[46%] overflow-hidden rounded-theme border-[10px] border-bg shadow-2xl">
              <Picture image={s.image2} sizes={700} />
            </div>
          )}
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <Kicker index={navIndex(site, s.id)} label={s.eyebrow ?? s.nav} />
          <h2 className="h2" data-reveal>
            <Rich text={s.title} />
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-muted" data-reveal>
            {s.body.map((p, i) => (
              <p key={i} className={i === 0 ? 'text-xl text-ink' : ''}>
                {p}
              </p>
            ))}
          </div>
          {s.signature && <p className="mt-8 font-display text-2xl italic text-brand">{s.signature}</p>}
          {s.bullets && (
            <ul className="mt-10 grid gap-px border-y border-line sm:grid-cols-3" data-reveal>
              {s.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 py-4 text-sm font-semibold">
                  <Icon name="check" className="h-4 w-4 shrink-0 text-brand" />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Process — timeline                                                    */
/* ------------------------------------------------------------------ */

export function Process({ section: s, site }: SectionProps<ProcessSection>) {
  return (
    <section id={s.id} className="section bg-bg-alt">
      <div className="container-site">
        <div className="mb-16 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <Kicker index={navIndex(site, s.id)} label={s.nav ?? 'Proces'} />
            <h2 className="h2" data-reveal>
              <Rich text={s.title} />
            </h2>
          </div>
        </div>
        <ol className="relative grid gap-10 md:grid-cols-5 md:gap-6">
          <span className="absolute left-0 right-0 top-[27px] hidden h-px bg-ink/20 md:block" aria-hidden />
          {s.steps.map((step, i) => (
            <li key={step.title} className="relative" data-reveal style={{ ['--d' as string]: `${i * 110}ms` }}>
              <span className="relative z-10 mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-ink/20 bg-bg-alt font-display text-xl">
                {i + 1}
              </span>
              <h3 className="font-body text-lg font-semibold normal-case tracking-normal">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Features — "on every occasion" with photos                           */
/* ------------------------------------------------------------------ */

export function Features({ section: s }: SectionProps<FeaturesSection>) {
  return (
    <section id={s.id} className="section bg-inverse text-inverse-ink">
      <div className="container-site">
        <h2 className="h2 mb-14 max-w-3xl" data-reveal>
          <Rich text={s.title} />
        </h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {s.items.map((i, idx) => (
            <article key={i.title} className="group" data-reveal style={{ ['--d' as string]: `${idx * 120}ms` }}>
              <div className="grain relative mb-6 aspect-[4/3] overflow-hidden rounded-theme">
                <Picture image={i.image} label={i.title} sizes={800} className="transition duration-700 group-hover:scale-105" />
              </div>
              <p className="mb-2 font-display text-brand">0{idx + 1}</p>
              <h3 className="text-3xl">{i.title}</h3>
              <p className="mt-3 text-inverse-ink/70">{i.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Events                                                               */
/* ------------------------------------------------------------------ */

export function Events({ section: s, site }: SectionProps<EventsSection>) {
  const booking = site.sections.find((x) => x.type === 'reservation')?.id
  return (
    <section id={s.id} className="section">
      <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Kicker index={navIndex(site, s.id)} label={s.nav} />
          <h2 className="h2" data-reveal>
            <Rich text={s.title} />
          </h2>
        </div>
        <div className="divide-y divide-line border-y border-line lg:col-span-8">
          {s.items.map((e) => {
            const [day, ...rest] = e.date.split(' ')
            return (
              <article key={e.title} className={`group grid grid-cols-[minmax(90px,auto)_1fr] gap-6 py-8 ${booking ? 'sm:grid-cols-[minmax(130px,auto)_1fr_auto]' : 'sm:grid-cols-[minmax(130px,auto)_1fr]'}`} data-reveal>
                <p className="font-display leading-none">
                  <span className="block text-6xl text-brand">{day}</span>
                  <span className="text-sm uppercase tracking-[0.18em] text-ink-muted">{rest.join(' ')}</span>
                </p>
                <div>
                  <h3 className="text-3xl">{e.title}</h3>
                  <p className="mt-2 text-ink-muted">{e.description}</p>
                </div>
                {booking && <a href={`#${booking}`} className="hidden self-center rounded-full border border-line p-4 transition group-hover:border-brand group-hover:bg-brand group-hover:text-brand-ink sm:block" aria-label={e.title}>
                  <Arrow className="h-5 w-5" />
                </a>}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                  */
/* ------------------------------------------------------------------ */

export function FAQ({ section: s, site }: SectionProps<FAQSection>) {
  const phone = site.business.phone
  return (
    <section id={s.id} className="section">
      <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="h2" data-reveal>
            <Rich text={s.title} />
          </h2>
          {phone && (
            <p className="mt-6 text-ink-muted" data-reveal>
              Nie ma tu Twojego pytania?
              <br />
              <a href={telHref(phone)} className="font-semibold text-ink link-underline">
                Zadzwoń: {phone}
              </a>
            </p>
          )}
        </div>
        <div className="border-t border-ink lg:col-span-8">
          {s.items.map((q, i) => (
            <details key={q.question} className="group border-b border-line" data-reveal>
              <summary className="flex cursor-pointer list-none items-start gap-6 py-7 text-xl font-medium sm:text-2xl [&::-webkit-details-marker]:hidden">
                <span className="pt-1 font-display text-sm text-ink-muted">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1">{q.question}</span>
                <span className="relative mt-2 h-4 w-4 shrink-0">
                  <span className="absolute left-0 top-1/2 h-px w-4 bg-current" />
                  <span className="absolute left-1/2 top-0 h-4 w-px bg-current transition group-open:rotate-90 group-open:opacity-0" />
                </span>
              </summary>
              <p className="max-w-2xl pb-8 pl-12 text-lg leading-relaxed text-ink-muted">{q.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* CTA band                                                             */
/* ------------------------------------------------------------------ */

export function CTA({ section: s }: SectionProps<CTASection>) {
  return (
    <section id={s.id} className="bg-brand text-brand-ink">
      <a href={s.cta.href} className="group container-site flex flex-col justify-between gap-8 py-16 sm:py-20 lg:flex-row lg:items-end">
        <div>
          <h2 className="text-5xl sm:text-7xl">
            <Rich text={s.title} />
          </h2>
          {s.subtitle && <p className="mt-4 max-w-xl text-lg opacity-80">{s.subtitle}</p>}
        </div>
        <span className="inline-flex items-center gap-4 text-lg font-semibold">
          {s.cta.label}
          <span className="rounded-full border border-current p-5 transition group-hover:bg-brand-ink group-hover:text-brand">
            <Arrow className="h-6 w-6" />
          </span>
        </span>
      </a>
    </section>
  )
}
