import type { Metadata } from 'next'
import '@/engine/fonts'
import { PRESETS } from '@/engine/theme'
import type { SiteConfig } from '@/engine/types'
import { SITES } from '@/sites'

export const metadata: Metadata = {
  title: 'AI Website Factory — katalog stron',
  robots: { index: false, follow: false },
}

const INDUSTRY_LABEL = { construction: 'Budownictwo i remonty', restaurant: 'Restauracje', 'driving-school': 'Szkoły jazdy' } as const

function heroImage(s: SiteConfig) {
  const h = s.sections.find((x) => x.type === 'hero')
  return h?.type === 'hero' ? h.image?.src : undefined
}

/** Internal dashboard: all sites and demos built with the engine. */
export default function FactoryHome() {
  const groups = (Object.keys(INDUSTRY_LABEL) as (keyof typeof INDUSTRY_LABEL)[]).map((industry) => ({
    industry,
    sites: SITES.filter((s) => s.industry === industry),
  }))

  return (
    <main className="min-h-screen bg-[#f4f2ed] text-[#141412] [font-family:'Instrument_Sans',system-ui]">
      <div className="container-site py-16 sm:py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5c5a54]">AI Website Factory</p>
        <h1 className="mt-4 max-w-3xl text-5xl leading-[0.95] [font-family:'Instrument_Serif',Georgia,serif] sm:text-7xl">
          Katalog stron <em className="text-[#2f5d50]">i dem.</em>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-[#5c5a54]">
          Każda strona to jeden plik w <code className="bg-black/5 px-1.5 py-0.5 text-[15px]">src/sites/</code>. Nową dodasz poleceniem{' '}
          <code className="bg-black/5 px-1.5 py-0.5 text-[15px]">npm run new-site</code>.
        </p>

        {groups.map((g) => (
          <section key={g.industry} className="mt-20">
            <h2 className="mb-8 flex items-baseline gap-4 border-b border-black/15 pb-4 text-3xl [font-family:'Instrument_Serif',Georgia,serif]">
              {INDUSTRY_LABEL[g.industry]}
              <span className="text-sm text-[#5c5a54] [font-family:'Instrument_Sans',system-ui]">{g.sites.length}</span>
            </h2>
            <ul className="grid gap-8 sm:grid-cols-2">
              {g.sites.map((s) => {
                const p = PRESETS[s.theme.preset]
                const img = heroImage(s)
                return (
                  <li key={s.slug}>
                    <a href={`/s/${s.slug}`} className="group block">
                      <div className="relative aspect-[16/10] overflow-hidden" style={{ background: p.bg }}>
                        {img && <img src={img.replace('w=1600', 'w=900')} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <p className="absolute bottom-5 left-6 text-3xl text-white" style={{ fontFamily: p.fontDisplay, fontWeight: Number(p.displayWeight), textTransform: p.displayCase }}>
                          {s.business.name}
                        </p>
                        {s.demo?.isDemo && <span className="absolute right-4 top-4 bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]">demo</span>}
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="text-[#5c5a54]">
                          {s.business.city} · motyw <strong className="text-[#141412]">{s.theme.preset}</strong> · {s.sections.length} sekcji
                        </span>
                        <span className="flex gap-1.5">
                          {[s.theme.primary ?? p.brand, s.theme.accent ?? p.accent, p.bg].map((c) => (
                            <span key={c} className="h-4 w-4 rounded-full ring-1 ring-black/10" style={{ background: c }} />
                          ))}
                        </span>
                      </div>
                    </a>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </main>
  )
}
