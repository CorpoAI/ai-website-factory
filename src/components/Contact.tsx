interface ContactProps {
  title?: string
  subtitle?: string
  email?: string
  phone?: string
  address?: string
}

export default function Contact({ 
  title = "Contact Us",
  subtitle = "Ready to get started? Get in touch today!",
  email = "contact@yourbusiness.com",
  phone = "+48 123 456 789",
  address = "Warsaw, Poland"
}: ContactProps) {
  return (
    <section className="py-20 px-8 max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">{title}</h2>
      <p className="text-xl text-gray-500 text-center mb-12">{subtitle}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-8">
          <h3 className="text-lg font-semibold mb-2 text-indigo-600">Email</h3>
          <p className="text-gray-600">{email}</p>
        </div>
        <div className="p-8">
          <h3 className="text-lg font-semibold mb-2 text-indigo-600">Phone</h3>
          <p className="text-gray-600">{phone}</p>
        </div>
        <div className="p-8">
          <h3 className="text-lg font-semibold mb-2 text-indigo-600">Address</h3>
          <p className="text-gray-600">{address}</p>
        </div>
      </div>
    </section>
  )
}