import { Metadata } from 'next'
import { getSiteSettings } from '@/lib/sanity'

interface SeoProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export async function generateMetadata(props: SeoProps): Promise<Metadata> {
  const siteSettings = await getSiteSettings()
  
  const title = props.title 
    ? `${props.title} | ${siteSettings?.siteName || 'Website'}`
    : siteSettings?.siteName || 'Website'
    
  const description = props.description || siteSettings?.tagline || ''
  const url = props.url || 'https://example.com'
  const image = props.image || '/og-image.png'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: siteSettings?.siteName || 'Website',
      images: [{ url: image }],
      locale: 'de_DE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}