import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import { getPage } from '@/lib/sanity'
import { generateMetadata } from '@/components/Seo'

export const metadata = generateMetadata({})

export default async function Home() {
  const page = await getPage('home')

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
      {page.sections?.map((section: any, i: number) => {
        switch (section._type) {
          case 'hero':
            return <Hero key={i} {...section} />
          case 'about':
            return <About key={i} {...section} />
          case 'services':
            return <Services key={i} {...section} />
          case 'testimonials':
            return <Testimonials key={i} {...section} />
          case 'faq':
            return <FAQ key={i} {...section} />
          case 'contact':
            return <Contact key={i} {...section} />
          case 'cta':
            return <CTA key={i} {...section} />
          default:
            return null
        }
      })}
      <Footer />
    </main>
  )
}