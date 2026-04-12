'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  title?: string
  items?: FAQItem[]
}

const defaultItems: FAQItem[] = [
  { question: "Brauche ich eine Reservierung?", answer: "Wir empfehlen eine Reservierung, besonders am Wochenende und an Feiertagen. Rufen Sie uns an unter +49 89 123 4567 oder nutzen Sie unser Online-Reservierungsformular." },
  { question: "Gibt es vegetarische und vegane Optionen?", answer: "Ja! Unsere Speisekarte enthält mehrere vegetarische und vegane Gerichte, darunter Käsespätzle, Gemüsepfanne und frische Salate. Allergene und Ernährungsmerkmale sind bei jedem Gericht gekennzeichnet." },
  { question: "Sind Hunde erlaubt?", answer: "Im Außenbereich (Biergarten) sind Hunde willkommen. Im Innenbereich bitten wir um Verständnis, dass wir nur Assistenzhunde erlauben." },
  { question: "Gibt es Parkplätze?", answer: "Direkt hinter dem Restaurant befinden sich 15 kostenlose Parkplätze für unsere Gäste. In der Umgebung gibt es zusätzlich Straßenparkplätze." },
  { question: "Können Sie Allergene berücksichtigen?", answer: "Alle Allergene sind in unserer Speisekarte gekennzeichnet. Bitte informieren Sie uns bei der Reservierung über Allergien oder Unverträglichkeiten — wir passen unsere Gerichte gerne an." },
  { question: "Bieten Sie auch Catering an?", answer: "Ja, wir bieten Catering für private und geschäftliche Veranstaltungen an. Kontaktieren Sie uns unter info@zum-goldenen-hirschen.de für ein individuelles Angebot." },
]

export default function FAQ({
  title = "Häufige Fragen",
  items = defaultItems
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 px-6 bg-stone-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-amber-700 uppercase tracking-[0.2em] text-xs font-semibold">FAQ</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mt-2 mb-4 text-stone-900">{title}</h2>
          <div className="w-12 h-0.5 bg-amber-600 mx-auto" />
        </div>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="border border-stone-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-stone-50 transition-colors"
              >
                <span className="font-semibold text-stone-900 pr-4">{item.question}</span>
                <svg className={`w-5 h-5 text-amber-600 shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
