import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { t } from '@/engine/i18n'
import { jsonLd, siteMetadata } from '@/engine/seo'
import { resolveTheme } from '@/engine/theme'
import { DemoBanner, Footer, Header, MobileCallBar } from '@/sections/layout'
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
  const { style, fontsHref } = resolveTheme(site.theme)

  return (
    <div lang={site.locale} style={style as React.CSSProperties} className="min-h-screen bg-bg font-body text-ink">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href={fontsHref} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(site)) }} />
      <DemoBanner site={site} d={d} />
      <Header site={site} d={d} />
      <main>
        <RenderSections site={site} d={d} />
      </main>
      <Footer site={site} d={d} />
      <MobileCallBar site={site} d={d} />
    </div>
  )
}
