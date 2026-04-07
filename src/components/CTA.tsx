interface CTAProps {
  title?: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
}

export default function CTA({ 
  title = "Ready to Grow Your Business?",
  subtitle = "Let's create a website that helps you attract more customers and grow your business.",
  buttonText = "Start Your Project",
  buttonLink = "/contact"
}: CTAProps) {
  return (
    <section className="py-20 px-8 bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
        <p className="text-xl mb-8 opacity-90">{subtitle}</p>
        <a 
          href={buttonLink} 
          className="inline-block px-10 py-4 bg-white text-indigo-600 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition"
        >
          {buttonText}
        </a>
      </div>
    </section>
  )
}