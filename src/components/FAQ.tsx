interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  title?: string
  items?: FAQItem[]
}

const defaultItems: FAQItem[] = [
  { question: "How long does it take to build a website?", answer: "Typically 2-4 weeks depending on complexity. We work efficiently to deliver fast results." },
  { question: "Do you offer ongoing maintenance?", answer: "Yes! We offer monthly maintenance packages to keep your site secure and up-to-date." },
  { question: "Can I edit the content myself?", answer: "Absolutely! We provide an easy-to-use content management system so you can update content anytime." },
  { question: "Do you offer SEO services?", answer: "Yes, we include basic SEO optimization and can provide advanced packages as needed." }
]

export default function FAQ({ 
  title = "Frequently Asked Questions",
  items = defaultItems
}: FAQProps) {
  return (
    <section className="py-20 px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{title}</h2>
        <div className="flex flex-col gap-6">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="p-6 bg-white rounded-lg shadow-sm"
            >
              <h3 className="text-lg font-semibold mb-3 text-gray-800">{item.question}</h3>
              <p className="text-gray-600 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}