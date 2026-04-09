interface Testimonial {
  name: string
  role: string
  text: string
}

interface TestimonialsProps {
  title?: string
  testimonials?: Testimonial[]
}

const defaultTestimonials: Testimonial[] = [
  { name: "John Smith", role: "Business Owner", text: "Our new website has transformed our business. We've seen a 50% increase in leads since launch!" },
  { name: "Maria Garcia", role: "Clinic Manager", text: "Professional, responsive, and delivered exactly what we needed. Highly recommended!" },
  { name: "Thomas Müller", role: "Restaurant Owner", text: "The team understood our needs perfectly. Our online reservations have doubled." }
]

export default function Testimonials({ 
  title = "What Our Clients Say",
  testimonials = defaultTestimonials
}: TestimonialsProps) {
  const items = testimonials?.length ? testimonials : defaultTestimonials
  return (
    <section className="py-20 px-8 max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((testimonial, index) => (
          <div 
            key={index} 
            className="p-8 bg-gray-50 rounded-xl border-l-4 border-indigo-500"
          >
            <p className="text-base leading-relaxed mb-6 italic">&quot;{testimonial.text}&quot;</p>
            <div>
              <strong className="block text-lg">{testimonial.name}</strong>
              <span className="text-gray-500">{testimonial.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}