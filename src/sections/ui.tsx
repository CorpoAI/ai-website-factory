import type { Dict } from '@/engine/i18n'
import type { IconName, ImageRef, SiteConfig } from '@/engine/types'

export interface SectionProps<T> {
  section: T & { id?: string }
  site: SiteConfig
  d: Dict
}

/* Lucide-style 24px stroke icons, kept inline so there is no icon dependency. */
const ICONS: Record<IconName, string> = {
  home: 'M3 10.5 12 3l9 7.5M5 9v11h14V9M10 20v-6h4v6',
  hammer: 'M14 6l4 4M3 21l9-9M12 4l3-1 6 6-1 3-3 1-6-6z',
  roof: 'M2 12 12 4l10 8M4 11v9h16v-9M9 20v-5h6v5',
  paint: 'M4 4h13v5H4zM17 6h3v6h-8v3M11 15h2v6h-2z',
  bolt: 'M13 2 4 14h7l-1 8 9-12h-7z',
  drop: 'M12 3s7 7.5 7 12a7 7 0 0 1-14 0c0-4.5 7-12 7-12z',
  ruler: 'M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2',
  shield: 'M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6zM9 12l2 2 4-4',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  leaf: 'M5 19C5 10 11 4 20 4c0 9-6 15-15 15zM5 19l8-8',
  star: 'M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z',
  chef: 'M7 14v6h10v-6M6 14a4 4 0 0 1-.5-8A5 5 0 0 1 12 3a5 5 0 0 1 6.5 3A4 4 0 0 1 18 14z',
  wine: 'M8 3h8l-.5 6a3.5 3.5 0 0 1-7 0zM12 13v8M8 21h8',
  truck: 'M2 6h12v10H2zM14 10h4l4 4v2h-8M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  users: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21v-1a6 6 0 0 1 12 0v1M16 3.5a4 4 0 0 1 0 7.5M22 21v-1a6 6 0 0 0-4-5.6',
  check: 'M4 12l5 5L20 6',
  key: 'M15 9a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM14 12l7 7M18 16l2-2',
  sun: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
}

export function Icon({ name, className = 'h-6 w-6' }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={ICONS[name]} />
    </svg>
  )
}

export function Stars({ value, className = 'h-4 w-4' }: { value: number; className?: string }) {
  return (
    <span className="inline-flex gap-0.5 text-brand" aria-label={`${value}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className={className} fill={i <= Math.round(value) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5}>
          <path d={ICONS.star} />
        </svg>
      ))}
    </span>
  )
}

/**
 * Image with a designed fallback. Demos for prospects often start without
 * photos; the placeholder keeps the layout honest and on-brand until real
 * images (from the prospect's old site / Google profile) are dropped in.
 */
export function Picture({ image, className = '', label }: { image?: ImageRef; className?: string; label?: string }) {
  if (image?.src) {
    return <img src={image.src} alt={image.alt ?? ''} className={`h-full w-full object-cover ${className}`} loading="lazy" />
  }
  const text = label ?? image?.alt
  return (
    <div
      className={`relative flex h-full w-full items-end overflow-hidden bg-gradient-to-br from-brand/80 via-accent/80 to-ink/90 ${className}`}
      role="img"
      aria-label={text ?? ''}
    >
      <svg className="absolute inset-0 h-full w-full opacity-[0.12]" aria-hidden>
        <defs>
          <pattern id="pp" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
            <line x1="0" y1="0" x2="0" y2="22" stroke="white" strokeWidth="6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pp)" />
      </svg>
      {text && <span className="relative m-3 rounded-full bg-black/35 px-3 py-1 text-xs font-medium text-white backdrop-blur">{text}</span>}
    </div>
  )
}

export function SectionHeading({ eyebrow, title, subtitle, center }: { eyebrow?: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={`mb-10 max-w-2xl sm:mb-14 ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="h2">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-ink-muted">{subtitle}</p>}
    </div>
  )
}

export function telHref(phone?: string) {
  return phone ? `tel:${phone.replace(/[^+\d]/g, '')}` : undefined
}
