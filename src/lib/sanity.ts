// Sanity client configuration
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2024-01-01'

export const client = createClient({
  projectId: projectId || 'demo',
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlForImage(source: any): any {
  if (!source || !source.asset) {
    return { width: () => ({ height: () => ({ url: () => '' }) }), url: () => '' }
  }
  return builder.image(source)
}

// Helper to fetch pages by slug
export async function getPage(slug: string) {
  return client.fetch(
    `*[_type == "page" && slug.current == $slug][0]`,
    { slug }
  )
}

// Helper to fetch site settings
export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]`)
}

// Helper to fetch all pages
export async function getAllPages() {
  return client.fetch(`*[_type == "page"]{ "slug": slug.current, title }`)
}

// Helper to fetch posts
export async function getPosts() {
  return client.fetch(`*[_type == "post"] | order(publishedAt desc)`)
}

// Helper to fetch single post
export async function getPost(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug }
  )
}