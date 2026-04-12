export interface SiteConfig {
  template: 'construction' | 'restaurant'
  siteName: string
  tagline: string
  primaryColor: string
  secondaryColor: string
}

export const siteConfig: SiteConfig = {
  template: 'restaurant',
  siteName: 'Zum goldenen Hirschen',
  tagline: 'Traditionelle bayerische Küche mit Herz',
  primaryColor: '#d97706',
  secondaryColor: '#92400e',
}