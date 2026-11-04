import type { Metadata } from 'next'
import type { SiteConfig } from './types'

export function siteMetadata(site: SiteConfig): Metadata {
  const b = site.business
  const hero = site.sections.find((s) => s.type === 'hero')
  const title = site.seo?.title ?? `${b.name} — ${b.tagline ?? b.city}`
  const description =
    site.seo?.description ?? (hero?.type === 'hero' ? hero.subtitle : undefined) ?? `${b.name}, ${b.city}`
  return {
    title,
    description,
    openGraph: { title, description, locale: site.locale, type: 'website', siteName: b.name },
    // Prospect demos must never be indexed — they are private previews.
    robots: site.demo?.isDemo ? { index: false, follow: false } : undefined,
  }
}

/** schema.org LocalBusiness subtype — helps Google show hours, rating, map pin. */
export function jsonLd(site: SiteConfig) {
  const b = site.business
  const type = site.industry === 'restaurant' ? 'Restaurant' : 'GeneralContractor'
  const menu = site.sections.find((s) => s.type === 'menu')
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name: b.name,
    description: b.tagline,
    telephone: b.phone,
    email: b.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: b.street,
      postalCode: b.postalCode,
      addressLocality: b.city,
      addressCountry: b.country ?? 'PL',
    },
    areaServed: b.serviceArea,
    openingHours: b.openingHours?.map((h) => `${h.days} ${h.hours}`),
    aggregateRating: b.rating
      ? { '@type': 'AggregateRating', ratingValue: b.rating.value, reviewCount: b.rating.count }
      : undefined,
    sameAs: b.social?.map((s) => s.url),
    ...(menu ? { hasMenu: '#menu', servesCuisine: undefined, acceptsReservations: true } : {}),
  }
}
