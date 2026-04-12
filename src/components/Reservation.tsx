'use client'

import { useState } from 'react'

interface ReservationProps {
  title?: string
  subtitle?: string
  phone?: string
}

export default function Reservation({
  title = "Tisch reservieren",
  subtitle = "Sichern Sie sich Ihren Tisch für ein unvergessliches Essen",
  phone = "+49 89 123 4567"
}: ReservationProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '18:00',
    guests: '2',
    occasion: '',
    seating: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'success'>('idle')

  const timeSlots = [
    '11:30', '12:00', '12:30', '13:00', '13:30',
    '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00'
  ]

  const occasions = [
    { value: '', label: 'Keine besondere Anlass' },
    { value: 'geburdstag', label: 'Geburtstag' },
    { value: 'geschaeftlich', label: 'Geschäftsessen' },
    { value: 'jubilaeum', label: 'Jubiläum' },
    { value: 'date', label: 'Romantisches Dinner' },
    { value: 'familie', label: 'Familienfeier' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <section id="reservierung" className="py-24 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Vielen Dank!</h2>
          <p className="text-stone-600 text-lg mb-6">Ihre Reservierungsanfrage wurde gesendet. Wir bestätigen Sie in Kürze telefonisch oder per E-Mail.</p>
          <p className="text-stone-500">Für dringende Anfragen rufen Sie uns an: <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-amber-700 font-semibold hover:underline">{phone}</a></p>
        </div>
      </section>
    )
  }

  return (
    <section id="reservierung" className="py-24 px-6 bg-amber-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-amber-700 uppercase tracking-[0.2em] text-xs font-semibold">Reservierung</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mt-2 mb-4 text-stone-900">{title}</h2>
          <div className="w-12 h-0.5 bg-amber-600 mx-auto mb-6" />
          <p className="text-stone-600 max-w-xl mx-auto">{subtitle}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-stone-700 mb-1.5">Name *</label>
                <input type="text" id="name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-stone-50" placeholder="Ihr vollständiger Name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-stone-700 mb-1.5">E-Mail *</label>
                <input type="email" id="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-stone-50" placeholder="name@beispiel.de" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="date" className="block text-sm font-semibold text-stone-700 mb-1.5">Datum *</label>
                <input type="date" id="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-stone-50" />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-semibold text-stone-700 mb-1.5">Uhrzeit *</label>
                <select id="time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-stone-50">
                  {timeSlots.map(t => <option key={t} value={t}>{t} Uhr</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="guests" className="block text-sm font-semibold text-stone-700 mb-1.5">Personen *</label>
                <select id="guests" value={formData.guests} onChange={e => setFormData({...formData, guests: e.target.value})} className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-stone-50">
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'Personen'}</option>)}
                  <option value="9+">9+ (bitte Nachricht)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="occasion" className="block text-sm font-semibold text-stone-700 mb-1.5">Anlass</label>
                <select id="occasion" value={formData.occasion} onChange={e => setFormData({...formData, occasion: e.target.value})} className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-stone-50">
                  {occasions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="seating" className="block text-sm font-semibold text-stone-700 mb-1.5">Sitzplatz</label>
                <select id="seating" value={formData.seating} onChange={e => setFormData({...formData, seating: e.target.value})} className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-stone-50">
                  <option value="">Keine Präferenz</option>
                  <option value="innen">Im Innenbereich</option>
                  <option value="aussen">Im Außenbereich (Biergarten)</option>
                  <option value="ruhig">Am ruhigen Platz</option>
                  <option value="bar">An der Bar</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-stone-700 mb-1.5">Besondere Wünsche</label>
              <textarea id="message" rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-stone-50" placeholder="Allergien, Kinderstuhl, spezielle Wünsche..." />
            </div>

            <button type="submit" className="w-full bg-amber-700 hover:bg-amber-600 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all hover:shadow-lg">
              Reservierung anfragen
            </button>

            <p className="text-center text-stone-400 text-sm">
              Oder rufen Sie uns direkt an: <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-amber-700 font-semibold hover:underline">{phone}</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}