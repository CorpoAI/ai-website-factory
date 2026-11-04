import type { Metadata } from 'next'
import { PRESETS } from '@/engine/theme'
import { SITES } from '@/sites'

export const metadata: Metadata = {
  title: 'AI Website Factory — katalog stron',
  robots: { index: false, follow: false },
}

const INDUSTRY_LABEL = { construction: 'Budownictwo', restaurant: 'Restauracje' } as const

/** Internal dashboard: all sites and demos built with the engine. */
export default function FactoryHome() {
  const groups = (Object.keys(INDUSTRY_LABEL) as (keyof typeof INDUSTRY_LABEL)[]).map((industry) => ({
    industry,
    sites: SITES.filter((s) => s.industry === industry),
  }))

  return (
    <main className="container-site py-16">
      <p className="eyebrow mb-3">AI Website Factory</p>
      <h1 className="font-display text-4xl font-bold">Katalog stron i dem</h1>
      <p className="mt-3 max-w-2xl text-ink-muted">
        Każda strona to jeden plik konfiguracyjny w <code className="rounded bg-bg-alt px-1.5 py-0.5 text-sm">src/sites/</code>. Nową dodasz
        poleceniem <code className="rounded bg-bg-alt px-1.5 py-0.5 text-sm">npm run new-site</code>.
      </p>

      {groups.map((g) => (
        <section key={g.industry} className="mt-12">
          <h2 className="mb-4 text-xl font-bold">
            {INDUSTRY_LABEL[g.industry]} <span className="font-normal text-ink-muted">({g.sites.length})</span>
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {g.sites.map((s) => {
              const p = PRESETS[s.theme.preset]
              return (
                <li key={s.slug}>
                  <a href={`/s/${s.slug}`} className="block overflow-hidden rounded-xl border border-line bg-card transition hover:-translate-y-0.5 hover:shadow-lg">
                    <div className="flex h-20 items-end gap-1.5 p-4" style={{ background: p.bg }}>
                      {[s.theme.primary ?? p.brand, s.theme.accent ?? p.accent, p.ink].map((c) => (
                        <span key={c} className="h-6 w-6 rounded-full ring-2 ring-white/60" style={{ background: c }} />
                      ))}
                    </div>
                    <div className="p-4">
                      <p className="font-semibold">{s.business.name}</p>
                      <p className="text-sm text-ink-muted">
                        {s.business.city} · motyw {s.theme.preset} · {s.sections.length} sekcji
                      </p>
                      {s.demo?.isDemo && <span className="mt-2 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">demo</span>}
                    </div>
                  </a>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </main>
  )
}
