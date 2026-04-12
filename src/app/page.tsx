import Hero from '@/components/Hero'
import About from '@/components/About'
import Speisekarte from '@/components/Speisekarte'
import OpeningHours from '@/components/OpeningHours'
import Gallery from '@/components/Gallery'
import Reviews from '@/components/Reviews'
import FAQ from '@/components/FAQ'
import Reservation from '@/components/Reservation'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Hero
        name="Zum goldenen Hirschen"
        tagline="Traditionelle bayerische K\u00fcche in gem\u00fctlicher Atmosph\u00e4re. Seit 1952 Familientradition in M\u00fcnchen."
        established="Seit 1952"
        ctaText="Tisch reservieren"
        ctaLink="#reservierung"
      />
      <About
        title="Unsere Geschichte"
        content="Das Restaurant \u201eZum goldenen Hirschen\u201c wird seit 1952 von der Familie Huber gef\u00fchrt. In drei Generationen haben wir uns der traditionellen bayerischen K\u00fcche verschrieben \u2013 mit regionalen Zutaten, hausgemachten Rezepten und herzlicher Gastfreundschaft. Unser K\u00fcchenchef Thomas Huber setzt auf saisonale Produkte aus Bayern und schafft so Gerichte, die Gaumen und Herz erfreuen."
        stats={[
          { value: '70+', label: 'Jahre Tradition' },
          { value: '3', label: 'Generationen' },
          { value: '100%', label: 'Regionale Zutaten' },
        ]}
      />
      <Speisekarte title="Unsere Speisekarte" />
      <OpeningHours
        currentlyOpen={false}
        phone="+49 89 123 4567"
        address="Hauptstra\u00dfe 42, 80331 M\u00fcnchen"
      />
      <Gallery title="Einblicke" />
      <Reviews
        title="G\u00e4stebewertungen"
        averageRating={4.8}
        totalReviews={247}
      />
      <Reservation
        title="Tisch reservieren"
        subtitle="Sichern Sie sich Ihren Tisch f\u00fcr ein unvergessliches Essen"
        phone="+49 89 123 4567"
      />
      <FAQ />
      <CTA
        title="Reservieren Sie jetzt Ihren Tisch"
        subtitle="Ob f\u00fcr ein romantisches Dinner, ein Gesch\u00e4ftessen oder einen Familienausflug \u2014 wir freuen uns auf Sie."
        buttonText="Online reservieren"
        buttonLink="#reservierung"
        phone="+49 89 123 4567"
      />
      <Footer
        name="Zum goldenen Hirschen"
        address="Hauptstra\u00dfe 42, 80331 M\u00fcnchen"
        phone="+49 89 123 4567"
        email="info@zum-goldenen-hirschen.de"
      />
    </main>
  )
}