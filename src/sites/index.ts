import type { SiteConfig } from '@/engine/types'
import budmax from './budmax-krakow'
import nowak from './nowak-remonty-wroclaw'
import ogien from './ogien-warszawa'
import trattoria from './trattoria-gdansk'
import prawko from './osk-prawko-warszawa'

/**
 * Site registry. `npm run new-site` adds new entries here automatically.
 * (File-based for now; can be swapped for Sanity/DB later behind getSite().)
 */
export const SITES: SiteConfig[] = [
  budmax,
  nowak,
  trattoria,
  ogien,
  prawko,
  // @new-site
]

export function getSite(slug: string) {
  return SITES.find((s) => s.slug === slug)
}

export function getSiteByHost(host: string) {
  const h = host.replace(/^www\./, '').split(':')[0]
  return SITES.find((s) => s.domains?.includes(h))
}
