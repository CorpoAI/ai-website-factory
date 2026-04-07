// Sanity client configuration
import { createClient } from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

// Helper to fetch pages by slug
export async function getPage(slug: string) {
  return client.fetch(
    `*[_type == "page" && slug.current == $slug][0]`,
    { slug }
  )
}

// Helper to fetch site settings
export async function getSiteSettings() {
  return client.fetch(
    `*[_type == "siteSettings"][0]`
  )
}

// Helper to fetch all pages
export async function getAllPages() {
  return client.fetch(
    `*[_type == "page"]{ "slug": slug.current, title }`
  )
}