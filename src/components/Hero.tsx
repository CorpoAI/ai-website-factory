interface HeroProps {
  name?: string
  tagline?: string
  established?: string
  ctaText?: string
  ctaLink?: string
}

export default function Hero({ 
  name = "Zum goldenen Hirschen",
  tagline = "Traditionelle bayerische Küche seit 1952",
  established = "Seit 1952",
  ctaText = "Tisch reservieren",
  ctaLink = "#reservierung"
}: HeroProps) {
  return (
    <header className="relative min-h-[92vh] flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900" />
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(180,83,9,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(146,64,14,0.1) 0%, transparent 40%)' }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M40 0L40 80M0 40L80 40\' stroke=\'%23fff\' stroke-width=\'0.5\'/%3E%3C/svg%3E")' }} />
      <div className="relative z-10 text-center max-w-4xl px-6">
        <div className="mb-8">
          <div className="inline-flex items-center gap-3 border border-amber-400/40 rounded-full px-6 py-2 mb-8">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
            <span className="text-amber-200 text-sm tracking-[0.25em] uppercase font-light">{established}</span>
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-[1.1] tracking-tight">
          {name}
        </h1>
        <div className="flex items-center justify-center gap-4 my-8">
          <div className="h-px w-16 bg-amber-400/60" />
          <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <div className="h-px w-16 bg-amber-400/60" />
        </div>
        <p className="text-xl md:text-2xl font-light text-stone-200 max-w-2xl mx-auto mb-12 leading-relaxed">
          {tagline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={ctaLink} className="inline-flex items-center justify-center px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-semibold text-lg transition-all hover:shadow-lg hover:shadow-amber-600/25">
            {ctaText}
          </a>
          <a href="#speisekarte" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 hover:border-amber-400/60 text-white rounded-lg font-semibold text-lg transition-all hover:bg-white/5">
            Speisekarte
          </a>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-amber-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </header>
  )
}