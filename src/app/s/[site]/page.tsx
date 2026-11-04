import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import '@/engine/fonts'
import { t } from '@/engine/i18n'
import { jsonLd, siteMetadata } from '@/engine/seo'
import { resolveTheme } from '@/engine/theme'
import { Footer, Header, MobileBar } from '@/sections/layout'
import { RevealObserver } from '@/sections/motion'
import { RenderSections } from '@/sections/registry'
import { SITES, getSite } from '@/sites'

export const dynamicParams = false

export function generateStaticParams() {
  return SITES.map((s) => ({ site: s.slug }))
}

export function generateMetadata({ params }: { params: { site: string } }): Metadata {
  const site = getSite(params.site)
  return site ? siteMetadata(site) : {}
}

export default function SitePage({ params }: { params: { site: string } }) {
  const site = getSite(params.site)
  if (!site) notFound()

  const d = t(site.locale)
  const { style } = resolveTheme(site.theme)
  const first = site.sections[0]
  // Transparent header only over full-bleed photo heroes
  const overlay = first?.type === 'hero' && (first.variant ?? 'image') !== 'split'

  return (
    <div data-site-root lang={site.locale} style={style as React.CSSProperties} className="min-h-screen bg-bg font-body text-ink">
      <link rel="preconnect" href="https://images.unsplash.com" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(site)) }} />
      <Header site={site} d={d} overlay={overlay} />
      <main>
        <RenderSections site={site} d={d} />
      </main>
      <Footer site={site} d={d} />
      <MobileBar site={site} d={d} />
      <RevealObserver />
    </div>
  )
}
