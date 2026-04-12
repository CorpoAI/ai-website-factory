interface FooterProps {
  name?: string
  address?: string
  phone?: string
  email?: string
  hours?: Array<{ day: string; time: string }>
}

const defaultHours = [
  { day: 'Mo–Fr', time: '11:30 – 22:00' },
  { day: 'Sa–So', time: '10:00 – 23:00' },
]

export default function Footer({ 
  name = "Zum goldenen Hirschen",
  address = "Hauptstraße 42, 80331 München",
  phone = "+49 89 123 4567",
  email = "info@zum-goldenen-hirschen.de",
  hours = defaultHours
}: FooterProps) {
  return (
    <footer className="bg-stone-950 text-stone-300">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">{name}</h3>
            <p className="text-stone-400 leading-relaxed mb-6">
              Traditionelle bayerische Küche in gemütlicher Atmosphäre. Seit 1952 Familientradition in München.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-stone-800 rounded-lg flex items-center justify-center hover:bg-amber-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-stone-800 rounded-lg flex items-center justify-center hover:bg-amber-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-amber-400 font-serif font-semibold text-lg mb-4">Öffnungszeiten</h4>
            <div className="space-y-2 text-sm">
              {hours.map((h, i) => (
                <div key={i} className="flex justify-between gap-4">
                  <span className="text-stone-400">{h.day}</span>
                  <span className="text-stone-200 font-medium tabular-nums">{h.time}</span>
                </div>
              ))}
              <p className="text-amber-400/80 text-xs mt-3 pt-3 border-t border-stone-800">Feiertage: Nach Vereinbarung</p>
            </div>
          </div>

          <div>
            <h4 className="text-amber-400 font-serif font-semibold text-lg mb-4">Kontakt</h4>
            <div className="space-y-3 text-sm">
              <p className="text-stone-300">{address}</p>
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="block text-stone-200 hover:text-amber-400 transition-colors">{phone}</a>
              <a href={`mailto:${email}`} className="block text-stone-200 hover:text-amber-400 transition-colors">{email}</a>
              <p className="text-stone-500 text-xs pt-2">15 kostenlose Parkplätze hinter dem Restaurant</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-stone-800 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone-500 text-sm">&copy; {new Date().getFullYear()} {name}. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6 text-sm text-stone-500">
            <a href="#" className="hover:text-stone-300 transition-colors">Impressum</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Datenschutz</a>
            <a href="#" className="hover:text-stone-300 transition-colors">AGB</a>
          </div>
        </div>
      </div>
    </footer>
  )
}