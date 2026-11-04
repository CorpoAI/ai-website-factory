import type { ComponentType } from 'react'
import type { Dict } from '@/engine/i18n'
import type { PlacedSection, SectionType, SiteConfig } from '@/engine/types'
import { About, CTA, Events, FAQ, Features, Hero, Marquee, Process, Stats } from './basic'
import { Gallery, Menu, Projects, QuoteCalculator, Reservation, Services, Testimonials } from './interactive'
import { Contact } from './layout'

/**
 * Section registry: `type` in config → React component.
 * Adding a new section type = add it to `Section` union in engine/types.ts,
 * write the component, register it here. TypeScript enforces completeness.
 */
const REGISTRY: Record<SectionType, ComponentType<{ section: any; site: SiteConfig; d: Dict }>> = {
  hero: Hero,
  marquee: Marquee,
  stats: Stats,
  about: About,
  services: Services,
  process: Process,
  projects: Projects,
  quoteCalculator: QuoteCalculator,
  menu: Menu,
  reservation: Reservation,
  gallery: Gallery,
  testimonials: Testimonials,
  features: Features,
  events: Events,
  faq: FAQ,
  cta: CTA,
  contact: Contact,
}

export function RenderSections({ site, d }: { site: SiteConfig; d: Dict }) {
  return (
    <>
      {site.sections.map((section: PlacedSection, i) => {
        const Component = REGISTRY[section.type]
        return <Component key={`${section.type}-${i}`} section={section} site={site} d={d} />
      })}
    </>
  )
}
