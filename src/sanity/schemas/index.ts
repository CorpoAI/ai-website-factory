import page from './page'
import siteSettings from './siteSettings'
import seo from './seo'
import hero from './hero'
import about from './about'
import services from './services'
import testimonials from './testimonials'
import faq from './faq'
import contact from './contact'
import cta from './cta'

export const schemaTypes = [
  page,
  siteSettings,
  seo,
  hero,
  about,
  services,
  testimonials,
  faq,
  contact,
  cta,
]

export const schema = { types: schemaTypes }