export interface SiteConfig {
  template: 'construction' | 'restaurant'
  siteName: string
  tagline: string
  primaryColor: string
  secondaryColor: string
}

export const siteConfig: SiteConfig = {
  template: 'construction',
  siteName: 'My Business',
  tagline: 'Professional Services',
  primaryColor: '#4F46E5', // indigo-600
  secondaryColor: '#7C3AED', // purple-600
}