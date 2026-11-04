/**
 * AI Website Factory — engine contract.
 *
 * One `SiteConfig` = one complete website (a paying client or a prospect demo).
 * Everything a site needs lives in this object: business data, theme, and an
 * ordered list of sections. Industry templates provide defaults, so a new
 * prospect demo usually only needs `business` + a few content overrides.
 */

export type Locale = 'pl' | 'de' | 'en'
export type Industry = 'construction' | 'restaurant'

/** An image is optional everywhere — sections fall back to a styled placeholder. */
export interface ImageRef {
  src?: string
  alt?: string
}

export interface OpeningHours {
  /** e.g. "Pon–Pt" / "Mo–Fr" */
  days: string
  /** e.g. "08:00–17:00" or "nieczynne" */
  hours: string
}

export interface BusinessInfo {
  name: string
  /** Short claim under the name, used in header/footer and SEO */
  tagline?: string
  logo?: ImageRef
  phone?: string
  email?: string
  street?: string
  postalCode?: string
  city: string
  /** ISO country code for JSON-LD, default PL */
  country?: string
  /** Tax ID shown in footer (NIP / USt-IdNr.) */
  taxId?: string
  /** Free-text service area, e.g. "Kraków i 50 km wokół" */
  serviceArea?: string
  openingHours?: OpeningHours[]
  /** Google Maps embed query or full embed URL */
  mapQuery?: string
  social?: { platform: 'facebook' | 'instagram' | 'linkedin' | 'youtube' | 'tiktok' | 'google'; url: string }[]
  /** Aggregate rating shown in hero/badges (e.g. from Google) */
  rating?: { value: number; count: number; source?: string }
}

export type ThemePreset = 'industrial' | 'modern-build' | 'bistro' | 'fine-dining'

export interface ThemeConfig {
  preset: ThemePreset
  /** Optional brand color override (hex). Taken from prospect's logo/old site. */
  primary?: string
  accent?: string
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

export interface HeroSection {
  type: 'hero'
  variant?: 'image' | 'split' | 'centered'
  eyebrow?: string
  title: string
  subtitle?: string
  image?: ImageRef
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  /** Small trust bullets under CTA, e.g. "Gwarancja 5 lat" */
  highlights?: string[]
}

export interface StatsSection {
  type: 'stats'
  items: { value: string; label: string }[]
}

export interface AboutSection {
  type: 'about'
  title: string
  body: string[]
  image?: ImageRef
  bullets?: string[]
}

export interface ServicesSection {
  type: 'services'
  title: string
  subtitle?: string
  items: { title: string; description: string; icon?: IconName; priceFrom?: string }[]
}

export interface ProcessSection {
  type: 'process'
  title: string
  steps: { title: string; description: string }[]
}

export interface ProjectItem {
  title: string
  category: string
  location?: string
  year?: string
  /** e.g. "180 m²", "4 miesiące" */
  facts?: string[]
  description?: string
  image?: ImageRef
  /** Optional before/after pair for renovations */
  before?: ImageRef
}

export interface ProjectsSection {
  type: 'projects'
  title: string
  subtitle?: string
  items: ProjectItem[]
}

export interface QuoteOption {
  id: string
  label: string
  /** PLN/EUR per unit, [min, max] for the "standard" finish */
  pricePerUnit: [number, number]
  unit: string
}

export interface QuoteCalculatorSection {
  type: 'quoteCalculator'
  title: string
  subtitle?: string
  currency: 'PLN' | 'EUR'
  workTypes: QuoteOption[]
  /** Multipliers applied to base price */
  standards: { id: string; label: string; multiplier: number }[]
  disclaimer?: string
}

export interface MenuItem {
  name: string
  description?: string
  price: string
  tags?: ('vege' | 'vegan' | 'gf' | 'spicy' | 'new' | 'chef')[]
  image?: ImageRef
}

export interface MenuSection {
  type: 'menu'
  title: string
  subtitle?: string
  categories: { name: string; items: MenuItem[] }[]
  note?: string
}

export interface ReservationSection {
  type: 'reservation'
  title: string
  subtitle?: string
  /** Bookable time slots */
  slots: string[]
  maxGuests: number
  /** Optional external booking URL — if set, shows link instead of form */
  externalUrl?: string
}

export interface GallerySection {
  type: 'gallery'
  title: string
  images: ImageRef[]
}

export interface TestimonialsSection {
  type: 'testimonials'
  title: string
  items: { author: string; text: string; rating?: number; context?: string; date?: string }[]
}

export interface FeaturesSection {
  type: 'features'
  title: string
  items: { title: string; description: string; icon?: IconName }[]
}

export interface EventsSection {
  type: 'events'
  title: string
  items: { title: string; date: string; description: string }[]
}

export interface FAQSection {
  type: 'faq'
  title: string
  items: { question: string; answer: string }[]
}

export interface CTASection {
  type: 'cta'
  title: string
  subtitle?: string
  cta: { label: string; href: string }
}

export interface ContactSection {
  type: 'contact'
  title: string
  subtitle?: string
  /** Show contact form (sends to /api/lead) */
  form?: boolean
  map?: boolean
}

export type Section =
  | HeroSection
  | StatsSection
  | AboutSection
  | ServicesSection
  | ProcessSection
  | ProjectsSection
  | QuoteCalculatorSection
  | MenuSection
  | ReservationSection
  | GallerySection
  | TestimonialsSection
  | FeaturesSection
  | EventsSection
  | FAQSection
  | CTASection
  | ContactSection

export type SectionType = Section['type']

/** Section with an anchor id — used by navigation. */
export type PlacedSection = Section & { id?: string; nav?: string }

export type IconName =
  | 'home'
  | 'hammer'
  | 'roof'
  | 'paint'
  | 'bolt'
  | 'drop'
  | 'ruler'
  | 'shield'
  | 'clock'
  | 'leaf'
  | 'star'
  | 'chef'
  | 'wine'
  | 'truck'
  | 'users'
  | 'check'
  | 'key'
  | 'sun'

export interface DemoInfo {
  /** Prospect demo: shows banner + noindex */
  isDemo: boolean
  /** Name of the agency shown in the banner */
  preparedBy?: string
  /** Contact link for the prospect to reply */
  contactHref?: string
  /** Internal note about the prospect (not rendered) */
  note?: string
}

export interface SiteConfig {
  slug: string
  industry: Industry
  locale: Locale
  /** Hostnames that map to this site in production (middleware) */
  domains?: string[]
  business: BusinessInfo
  theme: ThemeConfig
  seo?: { title?: string; description?: string }
  sections: PlacedSection[]
  demo?: DemoInfo
}

/**
 * What an author writes in `sites/*.ts`. Sections are optional — when omitted,
 * the industry template's default section list is used.
 */
export type SiteInput = Omit<SiteConfig, 'sections' | 'theme'> & {
  theme?: Partial<ThemeConfig>
  sections?: PlacedSection[]
  /** Patch individual default sections by type without rewriting the list */
  overrides?: Partial<{ [K in SectionType]: Partial<Extract<Section, { type: K }>> }>
  /** Remove default sections by type */
  hide?: SectionType[]
}
