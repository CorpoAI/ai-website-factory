import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import { getPage } from '@/lib/sanity'

interface Section {
  _type: string
  title?: string
  subtitle?: string
  content?: string
  ctaText?: string
  ctaLink?: string
  buttonText?: string
  buttonLink?: string
  items?: Array<{
    title?: string
    description?: string
    text?: string
    name?: string
    role?: string
    question?: string
    answer?: string
  }>
  email?: string
  phone?: string
  address?: string
}

function renderSection(section: Section) {
  switch (section._type) {
    case 'hero':
      return (
        <Hero
          title={section.title}
          subtitle={section.subtitle}
          ctaText={section.ctaText}
          ctaLink={section.ctaLink}
        />
      )
    case 'about':
      return <About title={section.title} content={section.content} />
    case 'services':
      return <Services title={section.title} services={section.items as any} />
    case 'testimonials':
      return <Testimonials title={section.title} testimonials={section.items as any} />
    case 'faq':
      return <FAQ title={section.title} items={section.items as any} />
    case 'contact':
      return (
        <Contact
          title={section.title}
          subtitle={section.subtitle}
          email={section.email}
          phone={section.phone}
          address={section.address}
        />
      )
    case 'cta':
      return (
        <CTA
          title={section.title}
          subtitle={section.subtitle}
          buttonText={section.buttonText}
          buttonLink={section.buttonLink}
        />
      )
    default:
      return null
  }
}

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const page = await getPage(params.slug)

  if (!page) {
    return (
      <main>
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <FAQ />
        <Contact />
        <CTA />
        <Footer />
      </main>
    )
  }

  return (
    <main>
      {page.sections?.map((section: Section, index: number) => (
        <div key={index}>{renderSection(section)}</div>
      ))}
      <Footer />
    </main>
  )
}