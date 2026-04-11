#!/usr/bin/env node
/**
 * Seed script - Pre-load template data into Sanity
 * Run: node scripts/seed.js construction
 *       node scripts/seed.js restaurant
 */

const { createClient } = require('@sanity/client')
const args = process.argv.slice(2)

if (args.length === 0) {
  console.error('Usage: node seed.js <template>')
  console.error('Templates: construction, restaurant')
  process.exit(1)
}

const template = args[0]
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId) {
  console.error('Error: NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_PROJECT_ID required')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const templates = {
  construction: {
    siteSettings: {
      _type: 'siteSettings',
      _id: 'siteSettings',
      siteName: 'Ihre Baufirma',
      tagline: 'Professionelle Bauleistungen',
      email: 'info@ihre-baufirma.de',
      phone: '+49 123 456 789',
      address: 'Musterstraße 1, 12345 Musterstadt',
    },
    pages: [
      {
        _type: 'page',
        _id: 'page-home',
        title: 'Startseite',
        slug: { _type: 'slug', current: 'home' },
        sections: [
          {
            _type: 'hero',
            title: 'Ihr Partner für professionelle Bauleistungen',
            subtitle: 'Wir bieten hochwertige Handwerksleistungen mit jahrelanger Erfahrung und garantierter Qualität.',
            ctaText: 'Kostenloses Angebot anfordern',
            ctaLink: '/kontakt',
          },
          {
            _type: 'about',
            title: 'Über uns',
            content: 'Mit über 15 Jahren Erfahrung im Bauhandwerk stehen wir für Zuverlässigkeit und Qualität. Unser Team besteht aus zertifizierten Fachleuten, die jedes Projekt mit Präzision und Engagement umsetzen.',
          },
          {
            _type: 'services',
            title: 'Unsere Leistungen',
            items: [
              { title: 'Renovierung', description: 'Komplette Renovierung von Wohn- und Geschäftsräumen' },
              { title: 'Dachdeckung', description: 'Dachsanierung und Neueindeckung mit hochwertigen Materialien' },
              { title: 'Fassaden', description: 'Wärmedämmung und Fassadenverkleidung' },
              { title: 'Innenausbau', description: 'Trockenbau, Fliesenleger und Malerarbeiten' },
            ],
          },
          {
            _type: 'testimonials',
            title: 'Kundenstimmen',
            items: [
              { name: 'Michael Schmidt', role: 'Hausbesitzer', text: 'Exakte Arbeit, pünktlich und sauber. Sehr zu empfehlen!' },
              { name: 'Anna Müller', role: 'Geschäftsführerin', text: 'Professionelle Abwicklung unseres Bürogebäudes. Top Ergebnis.' },
            ],
          },
          {
            _type: 'faq',
            title: 'Häufige Fragen',
            items: [
              { question: 'Wie lange dauert eine Renovierung?', answer: 'Dauer hängt vom Umfang ab. Kleinere Arbeiten 1-3 Tage, größere Projekte 2-4 Wochen.' },
              { question: 'Geben Sie Garantie auf Ihre Arbeit?', answer: 'Ja, wir bieten 5 Jahre Garantie auf alle unsere Leistungen.' },
            ],
          },
          {
            _type: 'contact',
            title: 'Kontaktieren Sie uns',
            subtitle: 'Rufen Sie uns an oder schreiben Sie uns eine Nachricht',
          },
          {
            _type: 'cta',
            title: 'Bereit für Ihr Projekt?',
            subtitle: 'Wir erstellen Ihnen gerne ein unverbindliches Angebot',
            buttonText: 'Jetzt anfragen',
            buttonLink: '/kontakt',
          },
        ],
      },
    ],
  },
  restaurant: {
    siteSettings: {
      _type: 'siteSettings',
      _id: 'siteSettings',
      siteName: 'Zum goldenen Hirschen',
      tagline: 'Traditionelle deutsche Küche mit Herz',
      email: 'info@zum-goldenen-hirschen.de',
      phone: '+49 89 123 4567',
      address: 'Hauptstraße 42, 80331 München',
    },
    pages: [
      {
        _type: 'page',
        _id: 'page-home',
        title: 'Startseite',
        slug: { _type: 'slug', current: 'home' },
        sections: [
          {
            _type: 'hero',
            title: 'Willkommen im Goldenen Hirschen',
            subtitle: 'Genießen Sie traditionelle bayerische Küche in gemütlicher Atmosphäre. Seit 1952 Familientradition.',
            ctaText: 'Jetzt reservieren',
            ctaLink: '#reservierung',
          },
          {
            _type: 'about',
            title: 'Unsere Geschichte',
            content: 'Das Restaurant "Zum goldenen Hirschen" wird seit 1952 von der Familie Huber geführt. In drei Generationen haben wir uns der traditionellen bayerischen Küche verschrieben – mit regionalen Zutaten, hausgemachten Rezepten und herzlicher Gastfreundschaft. Unser Küchenchef Thomas Huber setzt auf saisonale Produkte aus Bayern und schafft so Gerichte, die Gaumen und Herz erfreuen.',
          },
          {
            _type: 'services',
            title: 'Unsere Speisekarte',
            items: [
              { title: 'Vorspeisen', description: 'Frische bayerische Brotzeiten, hausgemachte Suppen und Salate' },
              { title: 'Hauptgerichte', description: 'Schweinshaxe, Wiener Schnitzel, Kaiserschmarrn und mehr' },
              { title: ' Fisch & Meeresfrüchte', description: 'Frische Forelle aus bayerischen Seen, Lachs vom Grill' },
              { title: 'Desserts', description: 'Apfelstrudel, Bayerische Creme, Crème Brûlée' },
              { title: 'Getränke', description: 'Hausauswahl bayerischer Biere, Weine und alkoholfreie Getränke' },
              { title: 'Vegetarisch', description: 'Käsespätzle, Gemüsepfanne, Salatvariationen' },
            ],
          },
          {
            _type: 'testimonials',
            title: 'Gästebewertungen',
            items: [
              { name: 'Thomas Weber', role: 'Stammgast', text: 'Die beste Schweinshaxe in ganz München! Immer wieder ein Genuss.' },
              { name: 'Sarah Koch', role: 'Food-Bloggerin', text: 'Authentische bayerische Küche in traumhafter Atmosphäre. Absolute Empfehlung!' },
              { name: 'Michael Schmidt', role: 'Familienvater', text: 'Wir kommen jede Woche mit der Familie. Die Kinder lieben den Kaiserschmarrn!' },
              { name: 'Anna Bauer', role: 'Regionale Köchin', text: 'Als Köchin schätze ich die Qualität der Zutaten und die handwerkliche Kunst.' },
            ],
          },
          {
            _type: 'faq',
            title: 'Häufige Fragen',
            items: [
              { question: 'Brauche ich eine Reservierung?', answer: 'Wir empfehlen eine Reservierung, besonders am Wochenende und Feiertagen. Rufen Sie uns an oder nutzen Sie unser Online-Formular.' },
              { question: 'Gibt es vegetarische Optionen?', answer: 'Ja! Unsere Speisekarte enthält mehrere vegetarische Gerichte, darunter unsere berühmten Käsespätzle.' },
              { question: 'Sind Hunde erlaubt?', answer: 'Im Außenbereich sind Hunde willkommen. Im Innenbereich bitten wir um Verständnis, dass wir nur Assistenzhunde erlauben.' },
              { question: 'Gibt es Parkplätze?', answer: 'Direkt hinter dem Restaurant befinden sich 15 kostenlose Parkplätze für unsere Gäste.' },
              { question: 'Können Sie Allergene berücksichtigen?', answer: 'Ja, informieren Sie uns bitte bei der Reservierung über Allergien oder Unverträglichkeiten.' },
            ],
          },
          {
            _type: 'gallery',
            title: 'Einblicke in unser Haus',
            images: [
              { _type: 'image', asset: { _type: 'reference', _ref: 'demo-1' }, alt: 'Restaurant Interior', caption: 'Unser gemütlicher Gastraum' },
              { _type: 'image', asset: { _type: 'reference', _ref: 'demo-2' }, alt: 'Terrasse', caption: 'Terrasse im Sommer' },
              { _type: 'image', asset: { _type: 'reference', _ref: 'demo-3' }, alt: 'Schweinshaxe', caption: 'Unsere berühmte Schweinshaxe' },
            ],
          },
          {
            _type: 'contact',
            title: 'Kontakt & Reservierung',
            subtitle: 'Wir freuen uns auf Ihren Besuch!',
          },
          {
            _type: 'cta',
            title: 'Reservieren Sie jetzt',
            subtitle: 'Damit wir Ihnen den besten Tisch reservieren können',
            buttonText: 'Online reservieren',
            buttonLink: '#reservierung',
          },
        ],
      },
    ],
  },
}

async function seed() {
  const data = templates[template]
  if (!data) {
    console.error(`Unknown template: ${template}`)
    console.error(`Available: ${Object.keys(templates).join(', ')}`)
    process.exit(1)
  }

  console.log(`Seeding ${template} template...`)

  try {
    console.log('Creating site settings...')
    await client.createIfNotExists(data.siteSettings)

    for (const page of data.pages) {
      console.log(`Creating page: ${page.title}...`)
      await client.createIfNotExists(page)
    }

    console.log('✓ Seed completed successfully!')
    console.log('')
    console.log('Next steps:')
    console.log('1. Go to Sanity Studio to customize the content')
    console.log('2. Update brand colors in tailwind.config.js')
    console.log('3. Deploy to Vercel')
  } catch (error) {
    console.error('Seed failed:', error.message)
    process.exit(1)
  }
}

seed()