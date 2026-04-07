interface AboutProps {
  title?: string
  content?: string
}

export default function About({ 
  title = "About Us",
  content = "We are a professional team dedicated to helping small and medium businesses succeed online. With years of experience in web development and design, we create beautiful, functional websites that help our clients grow their business."
}: AboutProps) {
  return (
    <section className="py-20 px-8 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{title}</h2>
      <p className="text-lg leading-relaxed text-center text-gray-600 max-w-2xl mx-auto">
        {content}
      </p>
    </section>
  )
}