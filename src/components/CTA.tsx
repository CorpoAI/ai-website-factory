interface CTAProps {
  title?: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
  phone?: string
}

export default function CTA({ 
  title = "Reservieren Sie jetzt Ihren Tisch",
  subtitle = "Ob für ein romantisches Dinner, ein Geschäftsessen oder einen Familienausflug — wir freuen uns auf Sie.",
  buttonText = "Online reservieren",
  buttonLink = "#reservierung",
  phone = "+49 89 123 4567"
}: CTAProps) {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-amber-800 via-amber-900 to-stone-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\'/%3E%3C/g%3E%3C/svg%3E")' }} />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">{title}</h2>
        <div className="w-16 h-0.5 bg-amber-400 mx-auto mb-8" />
        <p className="text-xl text-amber-100/90 font-light leading-relaxed mb-10 max-w-xl mx-auto">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={buttonLink} className="inline-flex items-center justify-center px-10 py-4 bg-white text-amber-900 rounded-xl font-semibold text-lg hover:bg-amber-50 transition-all hover:shadow-lg">
            {buttonText}
          </a>
          <a href={`tel:${phone.replace(/\s/g, '')}`} className="inline-flex items-center justify-center px-10 py-4 border-2 border-white/40 hover:border-white text-white rounded-xl font-semibold text-lg transition-all hover:bg-white/10">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            Anrufen
          </a>
        </div>
      </div>
    </section>
  )
}