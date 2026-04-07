interface Service {
  title: string
  description: string
  icon?: string
}

interface ServicesProps {
  title?: string
  services?: Service[]
}

const defaultServices: Service[] = [
  { title: "Web Development", description: "Custom websites built with modern technologies for optimal performance." },
  { title: "UI/UX Design", description: "Beautiful, intuitive designs that engage your visitors and convert customers." },
  { title: "SEO Optimization", description: "Improve your visibility in search engines and attract more potential customers." },
  { title: "Maintenance", description: "Ongoing support to keep your website secure, fast, and up-to-date." }
]

export default function Services({ 
  title = "Our Services",
  services = defaultServices
}: ServicesProps) {
  return (
    <section className="py-20 px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-4 text-indigo-600">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}