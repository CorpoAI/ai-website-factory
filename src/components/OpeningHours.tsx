'use client'

interface OpeningHour {
  day: string
  hours: string
  isToday?: boolean
}

interface OpeningHoursProps {
  title?: string
  hours?: OpeningHour[]
  currentlyOpen?: boolean
  phone?: string
  address?: string
}

export default function OpeningHours({
  title = "Öffnungszeiten",
  hours,
  currentlyOpen = false,
  phone = "+49 89 123 4567",
  address = "Hauptstraße 42, 80331 München"
}: OpeningHoursProps) {
  const defaultHours: OpeningHour[] = [
    { day: 'Montag', hours: '11:30 – 22:00', isToday: false },
    { day: 'Dienstag', hours: '11:30 – 22:00', isToday: false },
    { day: 'Mittwoch', hours: '11:30 – 22:00', isToday: false },
    { day: 'Donnerstag', hours: '11:30 – 22:00', isToday: false },
    { day: 'Freitag', hours: '11:30 – 23:00', isToday: false },
    { day: 'Samstag', hours: '10:00 – 23:00', isToday: false },
    { day: 'Sonntag', hours: '10:00 – 22:00', isToday: false },
  ]

  const displayHours = hours || defaultHours
  const isOpen = currentlyOpen

  return (
    <section className="py-24 px-6 bg-stone-900 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-amber-400 uppercase tracking-[0.2em] text-xs font-semibold">Besuchen Sie uns</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mt-2 mb-4">{title}</h2>
          <div className="w-12 h-0.5 bg-amber-500 mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 ${isOpen ? 'bg-green-900/50 border border-green-500/30' : 'bg-red-900/50 border border-red-500/30'}`}>
              <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
              <span className={`text-sm font-medium ${isOpen ? 'text-green-300' : 'text-red-300'}`}>
                {isOpen ? 'Jetzt geöffnet' : 'Derzeit geschlossen'}
              </span>
            </div>

            <div className="space-y-0">
              {displayHours.map((item, i) => (
                <div key={i} className={`flex justify-between items-center py-3 border-b border-stone-700/50 ${item.isToday ? 'text-amber-300' : 'text-stone-300'}`}>
                  <span className={`font-medium ${item.isToday ? 'font-bold' : ''}`}>
                    {item.day}
                    {item.isToday && <span className="ml-2 text-xs text-amber-400">Heute</span>}
                  </span>
                  <span className={`tabular-nums ${item.isToday ? 'text-amber-300 font-semibold' : ''}`}>{item.hours}</span>
                </div>
              ))}
            </div>

            <p className="text-stone-400 text-sm mt-4">
              Feiertage: Nach Vereinbarung — bitte rufen Sie uns an.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-amber-400 font-serif text-lg font-semibold mb-3">Adresse</h3>
              <p className="text-stone-300 leading-relaxed">{address}</p>
              <div className="mt-4 rounded-xl overflow-hidden bg-stone-800 h-40 flex items-center justify-center border border-stone-700">
                <div className="text-center">
                  <svg className="w-8 h-8 text-stone-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-stone-500 text-xs">Karte wird geladen...</p>
                  <p className="text-stone-400 text-sm mt-1">15 kostenlose Parkplätze hinter dem Restaurant</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-amber-400 font-serif text-lg font-semibold mb-3">Telefon</h3>
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-stone-200 hover:text-amber-400 text-xl font-serif transition-colors">
                {phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}