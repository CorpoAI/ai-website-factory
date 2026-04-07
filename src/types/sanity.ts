export interface SEO {
  metaTitle?: string
  metaDescription?: string
  ogImage?: {
    asset: {
      url: string
    }
  }
}

export interface HeroSection {
  _type: 'hero'
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
  backgroundImage?: {
    asset: {
      url: string
    }
  }
}

export interface AboutSection {
  _type: 'about'
  title?: string
  content?: string
}

export interface ServiceItem {
  title: string
  description: string
  icon?: string
}

export interface ServicesSection {
  _type: 'services'
  title?: string
  items?: ServiceItem[]
}

export interface TestimonialItem {
  name: string
  role: string
  text: string
  photo?: {
    asset: {
      url: string
    }
  }
}

export interface TestimonialsSection {
  _type: 'testimonials'
  title?: string
  items?: TestimonialItem[]
}

export interface FAQItem {
  question: string
  answer: string
}

export interface FAQSection {
  _type: 'faq'
  title?: string
  items?: FAQItem[]
}

export interface ContactSection {
  _type: 'contact'
  title?: string
  subtitle?: string
  email?: string
  phone?: string
  address?: string
}

export interface CTASection {
  _type: 'cta'
  title?: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
}

export type PageSection = 
  | HeroSection 
  | AboutSection 
  | ServicesSection 
  | TestimonialsSection 
  | FAQSection 
  | ContactSection 
  | CTASection

export interface Page {
  _id?: string
  title?: string
  slug?: {
    current: string
  }
  sections?: PageSection[]
  seo?: SEO
}

export interface SiteSettings {
  title?: string
  logo?: {
    asset: {
      url: string
    }
  }
  contactEmail?: string
  contactPhone?: string
  address?: string
  socialLinks?: Array<{
    platform: string
    url: string
  }>
  defaultSeo?: SEO
}