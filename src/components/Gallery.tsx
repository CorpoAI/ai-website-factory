const galleryItems = [
  { alt: 'Gemütlicher Gastraum mit Holzbalkendecke', caption: 'Unser Gastraum', gradient: 'from-amber-900 via-amber-800 to-stone-900', icon: '🏠', size: 'large' },
  { alt: 'Knusprige Schweinshaxe mit Kartoffelknödeln', caption: 'Schweinshaxe — unser Signature', gradient: 'from-amber-700 to-amber-900', icon: '🍖', size: 'normal' },
  { alt: 'Hausgemachter Apfelstrudel mit Vanillesoße', caption: 'Apfelstrudel Dessert', gradient: 'from-yellow-700 to-amber-800', icon: '🍰', size: 'normal' },
  { alt: 'Biergarten im Sommer mit Kastanienbäumen', caption: 'Unser Biergarten', gradient: 'from-green-800 to-stone-800', icon: '🍻', size: 'normal' },
  { alt: 'Küchenchef Thomas Huber in der Küche', caption: 'Küchenchef Thomas Huber', gradient: 'from-stone-700 to-stone-900', icon: '👨‍🍳', size: 'normal' },
  { alt: 'Frische bayerische Forelle aus dem See', caption: 'Forelle Müllerin Art', gradient: 'from-sky-800 to-stone-800', icon: '🐟', size: 'large' },
]

export default function Gallery({ title = "Einblicke" }: { title?: string }) {
  return (
    <section className="py-24 px-6 bg-stone-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-amber-700 uppercase tracking-[0.2em] text-xs font-semibold">Galerie</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mt-2 mb-4 text-stone-900">{title}</h2>
          <div className="w-12 h-0.5 bg-amber-600 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <div 
              key={i} 
              className={`${item.size === 'large' ? 'md:col-span-2 lg:col-span-2' : ''} aspect-[4/3] overflow-hidden rounded-xl relative group cursor-pointer`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-105`}>
                <span className="text-7xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</span>
                <p className="text-white font-serif text-xl font-semibold">{item.caption}</p>
                <p className="text-white/60 text-sm mt-1">{item.alt}</p>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}