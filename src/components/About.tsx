interface AboutProps {
  title?: string
  content?: string
  stats?: Array<{ value: string; label: string }>
}

export default function About({ 
  title = "Unsere Geschichte",
  content = "Seit 1952",
  stats
}: AboutProps) {
  const defaultStats = [
    { value: '70+', label: 'Jahre Tradition' },
    { value: '3', label: 'Generationen' },
    { value: '100%', label: 'Regionale Zutaten' },
  ]
  const displayStats = stats || defaultStats

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-amber-700 uppercase tracking-[0.2em] text-xs font-semibold">Ueber uns</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mt-2 mb-6 text-stone-900">{title}</h2>
          <div className="w-12 h-0.5 bg-amber-600 mx-auto" />
        </div>
        <p className="text-lg leading-relaxed text-stone-600 max-w-3xl mx-auto text-center mb-16">
          {content}
        </p>
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {displayStats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-bold text-amber-700">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-stone-500 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}