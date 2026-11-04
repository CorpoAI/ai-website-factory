import { NextResponse, type NextRequest } from 'next/server'
import { getSiteByHost } from '@/sites'

/**
 * Multi-tenant routing: when a request comes in on a client's own domain
 * (listed in `domains` of its site config), serve that site at "/".
 * On the factory domain (or localhost) everything works as usual:
 * dashboard at "/", sites at "/s/<slug>".
 */
export function middleware(req: NextRequest) {
  const site = getSiteByHost(req.headers.get('host') ?? '')
  if (site && req.nextUrl.pathname === '/') {
    const url = req.nextUrl.clone()
    url.pathname = `/s/${site.slug}`
    return NextResponse.rewrite(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/'],
}
