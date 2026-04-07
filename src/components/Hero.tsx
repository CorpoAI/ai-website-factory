interface HeroProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
  backgroundImage?: string
}

export default function Hero({ 
  title = "Professional Services for Your Business",
  subtitle = "We help small and medium businesses establish a strong online presence with modern, responsive websites.",
  ctaText = "Get Started",
  ctaLink = "/contact"
}: HeroProps) {
  return (
    <section className="min-h-[80vh] flex items-center justify-center text-center px-8 py-16 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
        <p className="text-xl mb-8 opacity-90">{subtitle}</p>
        <a 
          href={ctaLink} 
          className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition"
        >
          {ctaText}
        </a>
      </div>
    </section>
  )
}