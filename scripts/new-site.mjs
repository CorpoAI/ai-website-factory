#!/usr/bin/env node
/**
 * Scaffold a new site/demo from an industry template.
 *
 *   npm run new-site -- <construction|restaurant> <slug> "<Business name>" "<City>"
 *
 * Creates src/sites/<slug>.ts and registers it in src/sites/index.ts.
 * Then fill in real data (phone, address, services, menu, photos…).
 */
import fs from 'node:fs'
import path from 'node:path'

const [industry, slug, name, city] = process.argv.slice(2)
const INDUSTRIES = ['construction', 'restaurant']
if (!INDUSTRIES.includes(industry) || !slug || !name || !city) {
  console.error('Usage: npm run new-site -- <construction|restaurant> <slug> "<Business name>" "<City>"')
  process.exit(1)
}
if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error('slug: only lowercase letters, digits and "-"')
  process.exit(1)
}

const sitesDir = path.join(process.cwd(), 'src/sites')
const file = path.join(sitesDir, `${slug}.ts`)
if (fs.existsSync(file)) {
  console.error(`${file} already exists`)
  process.exit(1)
}

const preset = industry === 'construction' ? 'industrial' : 'bistro'
const q = (s) => JSON.stringify(s).replace(/^"|"$/g, '').replace(/'/g, "\\'")
fs.writeFileSync(
  file,
  `import { defineSite } from '@/engine/defineSite'

export default defineSite({
  slug: '${slug}',
  industry: '${industry}',
  locale: 'pl',
  business: {
    name: '${q(name)}',
    tagline: '',
    phone: '',
    email: '',
    street: '',
    postalCode: '',
    city: '${q(city)}',
    // rating: { value: 4.8, count: 100, source: 'Google' },
    // openingHours: [{ days: 'Pon–Pt', hours: '8:00–16:00' }],
  },
  theme: { preset: '${preset}' /* , primary: '#hex z logo klienta' */ },
  // overrides: { hero: { title: '…' } },   // zmiana wybranych sekcji szablonu
  // hide: ['stats'],                        // ukrycie sekcji szablonu
  demo: { isDemo: true, preparedBy: 'AI Website Factory' },
})
`,
)

const indexFile = path.join(sitesDir, 'index.ts')
const ident = 'site_' + slug.replace(/-/g, '_')
let idx = fs.readFileSync(indexFile, 'utf8')
idx = idx.replace(/(import type .*\n)/, `$1import ${ident} from './${slug}'\n`)
idx = idx.replace('  // @new-site', `  ${ident},\n  // @new-site`)
fs.writeFileSync(indexFile, idx)

console.log(`Created src/sites/${slug}.ts → http://localhost:3000/s/${slug}`)
