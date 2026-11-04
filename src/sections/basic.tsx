import type {
  AboutSection,
  CTASection,
  EventsSection,
  FAQSection,
  FeaturesSection,
  GallerySection,
  HeroSection,
  ProcessSection,
  ServicesSection,
  StatsSection,
  TestimonialsSection,
} from '@/engine/types'
import { Icon, Picture, SectionHeading, Stars, type SectionProps } from './ui'

export function Hero({ section: s, site, d }: SectionProps<HeroSection>) {
  const rating = site.business.rating
  const variant = s.variant ?? 'image'

  const content = (
    <>
      {s.eyebrow && <p className={`eyebrow mb-4 ${variant === 'image' ? '!text-white/80' : ''}`}>{s.eyebrow}</p>}
      <h1 className="font-display text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">{s.title}</h1>
      {s.subtitle && <p className={`mt-6 max-w-xl text-lg sm:text-xl ${variant === 'image' ? 'text-white/85' : 'text-ink-muted'}`}>{s.subtitle}</p>}
      <div className="mt-8 flex flex-wrap gap-3">
        {s.primaryCta && (
          <a href={s.primaryCta.href} className="btn-primary text-base">
            {s.primaryCta.label}
          </a>
        )}
        {s.secondaryCta && (
          <a href={s.secondaryCta.href} className="btn-ghost text-base">
            {s.secondaryCta.label}
          </a>
        )}
      </div>
      {(s.highlights?.length || rating) && (
        <ul className={`mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm ${variant === 'image' ? 'text-white/85' : 'text-ink-muted'}`}>
          {rating && (
            <li className="flex items-center gap-2">
              <Stars value={rating.value} />
              <span>
                <strong>{rating.value.toFixed(1)}</strong> · {rating.count} {d.reviews} {rating.source && `(${rating.source})`}
              </span>
            </li>
          )}
          {s.highlights?.map((h) => (
            <li key={h} className="flex items-center gap-2">
              <Icon name="check" className="h-4 w-4 text-brand" />
              {h}
            </li>
          ))}
        </ul>
      )}
    </>
  )

  if (variant === 'split') {
    return (
      <section className="container-site grid items-center gap-10 py-12 sm:py-20 lg:grid-cols-2">
        <div>{content}</div>
        <div className="aspect-[4/3] overflow-hidden rounded-theme">
          <Picture image={s.image} />
        </div>
      </section>
    )
  }
  if (variant === 'centered') {
    return (
      <section className="container-site py-20 text-center sm:py-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center [&>div]:justify-center [&>p]:mx-auto [&>ul]:justify-center">{content}</div>
      </section>
    )
  }
  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden text-white">
      <div className="absolute inset-0 -z-10">
        <Picture image={s.image} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
      </div>
      <div className="container-site flex min-h-[88vh] flex-col justify-center py-24">
        <div className="max-w-3xl">{content}</div>
      </div>
    </section>
  )
}

export function Stats({ section: s }: SectionProps<StatsSection>) {
  return (
    <section className="bg-accent text-white">
      <dl className="container-site grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
        {s.items.map((i) => (
          <div key={i.label} className="flex flex-col-reverse text-center md:text-left">
            <dt className="text-sm text-white/70">{i.label}</dt>
            <dd className="font-display text-3xl font-bold text-brand sm:text-4xl">{i.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function About({ section: s }: SectionProps<AboutSection>) {
  return (
    <section id={s.id} className="section">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2">
        <div className="aspect-[4/5] max-h-[560px] overflow-hidden rounded-theme">
          <Picture image={s.image} label={s.image?.alt} />
        </div>
        <div>
          <h2 className="h2 mb-6">{s.title}</h2>
          <div className="space-y-4 text-lg leading-relaxed text-ink-muted">
            {s.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {s.bullets && (
            <ul className="mt-8 flex flex-wrap gap-2">
              {s.bullets.map((b) => (
                <li key={b} className="rounded-full border border-line bg-card px-4 py-2 text-sm font-medium">
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

export function Services({ section: s }: SectionProps<ServicesSection>) {
  return (
    <section id={s.id} className="section">
      <div className="container-site">
        <SectionHeading title={s.title} subtitle={s.subtitle} />
        <div className="grid gap-px overflow-hidden border border-line bg-line rounded-theme sm:grid-cols-2 lg:grid-cols-3">
          {s.items.map((i) => (
            <article key={i.title} className="flex flex-col bg-card p-7">
              {i.icon && (
                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center bg-brand/15 text-brand rounded-theme">
                  <Icon name={i.icon} />
                </span>
              )}
              <h3 className="text-xl font-bold">{i.title}</h3>
              <p className="mt-2 flex-1 text-ink-muted">{i.description}</p>
              {i.priceFrom && <p className="mt-4 text-sm font-semibold text-brand">{i.priceFrom}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Process({ section: s }: SectionProps<ProcessSection>) {
  return (
    <section id={s.id} className="section bg-bg-alt">
      <div className="container-site">
        <SectionHeading title={s.title} />
        <ol className="grid gap-6 md:grid-cols-5">
          {s.steps.map((step, i) => (
            <li key={step.title} className="relative">
              <span className="font-display text-5xl font-bold text-brand/40">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Features({ section: s }: SectionProps<FeaturesSection>) {
  return (
    <section id={s.id} className="section bg-bg-alt">
      <div className="container-site">
        <SectionHeading title={s.title} center />
        <div className="grid gap-6 md:grid-cols-3">
          {s.items.map((i) => (
            <article key={i.title} className="border border-line bg-card p-8 text-center rounded-theme">
              {i.icon && (
                <span className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand text-brand-ink">
                  <Icon name={i.icon} />
                </span>
              )}
              <h3 className="text-xl font-bold">{i.title}</h3>
              <p className="mt-2 text-ink-muted">{i.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Gallery({ section: s }: SectionProps<GallerySection>) {
  return (
    <section id={s.id} className="section">
      <div className="container-site">
        <SectionHeading title={s.title} />
        <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4">
          {s.images.map((img, i) => (
            <div key={i} className={`overflow-hidden rounded-theme ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
              <Picture image={img} className="transition duration-500 hover:scale-105" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Testimonials({ section: s, site, d }: SectionProps<TestimonialsSection>) {
  const rating = site.business.rating
  return (
    <section id={s.id} className="section bg-bg-alt">
      <div className="container-site">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className="h2">{s.title}</h2>
          {rating && (
            <div className="flex items-center gap-3">
              <span className="font-display text-4xl font-bold">{rating.value.toFixed(1)}</span>
              <div>
                <Stars value={rating.value} />
                <p className="text-sm text-ink-muted">
                  {rating.count} {d.reviews}
                  {rating.source && ` · ${rating.source}`}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {s.items.map((i) => (
            <figure key={i.author + i.text.slice(0, 12)} className="flex flex-col border border-line bg-card p-7 rounded-theme">
              {i.rating && <Stars value={i.rating} />}
              <blockquote className="mt-4 flex-1 leading-relaxed">„{i.text}”</blockquote>
              <figcaption className="mt-6 text-sm">
                <strong>{i.author}</strong>
                {(i.context || i.date) && <span className="text-ink-muted"> · {i.context ?? i.date}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Events({ section: s }: SectionProps<EventsSection>) {
  return (
    <section id={s.id} className="section">
      <div className="container-site">
        <SectionHeading title={s.title} />
        <div className="divide-y divide-line border-y border-line">
          {s.items.map((e) => (
            <article key={e.title} className="grid gap-2 py-6 sm:grid-cols-[180px_1fr]">
              <p className="font-semibold text-brand">{e.date}</p>
              <div>
                <h3 className="text-xl font-bold">{e.title}</h3>
                <p className="mt-1 text-ink-muted">{e.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FAQ({ section: s }: SectionProps<FAQSection>) {
  return (
    <section id={s.id} className="section">
      <div className="container-site grid gap-10 lg:grid-cols-[1fr_2fr]">
        <h2 className="h2">{s.title}</h2>
        <div className="divide-y divide-line border-y border-line">
          {s.items.map((q) => (
            <details key={q.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                {q.question}
                <span className="text-2xl text-brand transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-ink-muted">{q.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CTA({ section: s }: SectionProps<CTASection>) {
  return (
    <section id={s.id} className="bg-brand text-brand-ink">
      <div className="container-site flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
        <div>
          <h2 className="h2">{s.title}</h2>
          {s.subtitle && <p className="mt-2 text-lg opacity-85">{s.subtitle}</p>}
        </div>
        <a href={s.cta.href} className="btn bg-ink text-bg hover:opacity-90">
          {s.cta.label}
        </a>
      </div>
    </section>
  )
}
