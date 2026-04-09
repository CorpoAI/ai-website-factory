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
      siteName: 'Ihr Restaurant',
      tagline: 'Kulinarische Highlights',
      email: 'info@ihr-restaurant.de',
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
            title: 'Willkommen in unserem Restaurant',
            subtitle: 'Genießen Sie kulinarische Highlights in gemütlicher Atmosphäre',
            ctaText: 'Tisch reservieren',
            ctaLink: '/reservierung',
          },
          {
            _type: 'about',
            title: 'Über uns',
            content: 'Unser Restaurant bietet seit über 10 Jahren traditionelle deutsche Küche mit modernen Akzenten. Wir legen Wert auf frische, regionale Zutaten und herzliche Gastfreundschaft.',
          },
          {
            _type: 'services',
            title: 'Unsere Speisen',
            items: [
              { title: 'Vorspeisen', description: 'Frische Salate, Suppen und Vorspeisen' },
              { title: 'Hauptgerichte', description: 'Traditionelle deutsche Gerichte und moderne Kreationen' },
              { title: 'Desserts', description: 'Hausgemachte Kuchen und Süßspeisen' },
              { title: 'Getränke', description: 'Ausgewählte Weine, Biere und alkoholfreie Getränke' },
            ],
          },
          {
            _type: 'testimonials',
            title: 'Gästebewertungen',
            items: [
              { name: 'Thomas Weber', role: 'Stammgast', text: 'Wunderbares Essen, sehr freundliches Personal. Immer wieder gerne!' },
              { name: 'Sarah Koch', role: 'Besucherin', text: 'Tolles Ambiente und ausgezeichnete Küche. Sehr zu empfehlen!' },
            ],
          },
          {
            _type: 'faq',
            title: 'Häufige Fragen',
            items: [
              { question: 'Brauche ich eine Reservierung?', answer: 'Wir empfehlen eine Reservierung, besonders am Wochenende.' },
              { question: 'Gibt es vegetarische Optionen?', answer: 'Ja, wir haben mehrere vegetarische Gerichte auf unserer Speisekarte.' },
            ],
          },
          {
            _type: 'contact',
            title: 'Kontakt & Reservierung',
            subtitle: 'Rufen Sie uns an oder schreiben Sie uns eine Nachricht',
          },
          {
            _type: 'cta',
            title: 'Reservieren Sie jetzt',
            subtitle: 'Wir freuen uns auf Ihren Besuch!',
            buttonText: 'Jetzt reservieren',
            buttonLink: '/reservierung',
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