'use client'

import { useState } from 'react'

interface Dish {
  name: string
  description: string
  price: string
  allergens?: string[]
  dietary?: string[]
  highlight?: boolean
}

interface MenuCategory {
  id: string
  name: string
  icon: string
  dishes: Dish[]
}

interface SpeisekarteProps {
  title?: string
  categories?: MenuCategory[]
  allergenLegend?: Record<string, string>
}

const defaultCategories: MenuCategory[] = [
  {
    id: 'vorspeisen',
    name: 'Vorspeisen',
    icon: '🥗',
    dishes: [
      { name: 'Bayerische Brotzeitplatte', description: 'Auswahl an regionalen Käsen, Wurstspezialitäten, Obazda und Butter mit Brezen', price: '14,50', allergens: ['A', 'G', 'L'], dietary: [] },
      { name: 'Kartoffelsuppe', description: 'Hausgemachte Kartoffelsuppe mit Speckstippe und frischen Kräutern', price: '8,90', allergens: ['C', 'G', 'L'], dietary: [] },
      { name: 'Gemüsesalat mit gebratenem Ziegenkäse', description: 'Frischer saisonaler Salat mit warmem Ziegenkäse und Walnuss-Vinaigrette', price: '13,80', allergens: ['A', 'G', 'H', 'N'], dietary: ['vegetarisch'] },
      { name: 'Forellenmousse', description: 'Zarte Forellenmousse auf Kräuterbrot mit Kapern und Zwiebeln', price: '12,50', allergens: ['A', 'D', 'G'], dietary: [] },
    ]
  },
  {
    id: 'hauptgerichte',
    name: 'Hauptgerichte',
    icon: '🍖',
    dishes: [
      { name: 'Schweinshaxe', description: 'Knusprige Schweinshaxe mit Kartoffelknödeln und Rotkraut — unser Signature-Gericht', price: '22,90', allergens: ['A', 'C', 'G'], highlight: true },
      { name: 'Wiener Schnitzel', description: 'Zartes Kalbsschnitzel mit Pommes frites und Preiselbeeren', price: '24,50', allergens: ['A', 'C', 'G', 'H'], dietary: [] },
      { name: 'Kaiserschmarrn', description: 'Flauschiger Kaiserschmarrn mit Zwetschgenröster — süßes Hauptgericht', price: '12,90', allergens: ['A', 'C', 'G', 'H'], dietary: ['vegetarisch'] },
      { name: 'Forelle Müllerin Art', description: 'Frische Forelle aus bayerischem See, gebraten mit Mandelbutter und Petersilienkartoffeln', price: '21,80', allergens: ['A', 'D', 'G', 'N'], dietary: [] },
      { name: 'Rinderschmorbraten', description: 'Zarter Rinderschmorbraten mit Semmelknödeln und dunkler Biersoße', price: '19,90', allergens: ['A', 'C', 'G', 'L'], dietary: [] },
    ]
  },
  {
    id: 'beilagen',
    name: 'Beilaten & Suppen',
    icon: '🥬',
    dishes: [
      { name: 'Kartoffelknödel', description: 'Hausgemachte Kartoffelknödel nach Omas Rezept', price: '4,50', allergens: ['C', 'G'], dietary: ['vegan'] },
      { name: 'Semmelknödel', description: 'Traditionelle bayerische Semmelknödel', price: '4,50', allergens: ['A', 'C', 'G'], dietary: ['vegetarisch'] },
      { name: 'Rotkraut', description: 'Süß-saures Rotkraut mit Apfel und Gewürzen', price: '3,90', allergens: [], dietary: ['vegan'] },
      { name: 'Brezen', description: 'Frische Laugenbrezen mit Butter', price: '3,50', allergens: ['A', 'G'], dietary: ['vegan'] },
    ]
  },
  {
    id: 'desserts',
    name: 'Desserts',
    icon: '🍰',
    dishes: [
      { name: 'Apfelstrudel', description: 'Hausgemachter Apfelstrudel mit Vanillesoße und Schlagobers', price: '9,80', allergens: ['A', 'C', 'G', 'H'], dietary: ['vegetarisch'] },
      { name: 'Bayerische Creme', description: 'Klassische bayerische Creme mit Himbeerspiegel', price: '8,50', allergens: ['A', 'G', 'H'], dietary: ['vegetarisch'] },
      { name: 'Crème Brûlée', description: 'Französische Vanillecrème mit karamellisierter Zuckerkruste', price: '8,90', allergens: ['A', 'C', 'G', 'H'], dietary: ['vegetarisch'] },
    ]
  },
  {
    id: 'getraenke',
    name: 'Getränke',
    icon: '🍻',
    dishes: [
      { name: 'Hofbräuhaus Helles', description: '0,5L helles Exportbier — frisch vom Fass', price: '4,90', allergens: ['A'], dietary: ['vegan'] },
      { name: 'Augustiner Edelstoff', description: '0,5L vollmundiges Helles — Münchens Lieblingsbier', price: '5,20', allergens: ['A'], dietary: ['vegan'] },
      { name: 'Hauswein Offen', description: 'Tägliche Weinauswahl rot/weiß — 0,2L Glass', price: '5,50', allergens: ['K'], dietary: ['vegan'] },
      { name: 'Apfelschorle', description: 'Natürliche Apfelschorle — 0,4L', price: '3,80', allergens: [], dietary: ['vegan'] },
    ]
  },
]

const defaultAllergenLegend: Record<string, string> = {
  'A': 'Glutenhaltige Getreide',
  'B': 'Krebstiere',
  'C': 'Eier',
  'D': 'Fische',
  'E': 'Erdnüsse',
  'F': 'Soja',
  'G': 'Milch/Milcherzeugnisse',
  'H': 'Schalenfrüchte',
  'K': 'Schwefeldioxid/Sulfite',
  'L': 'Sellerie',
  'M': 'Senf',
  'N': 'Sesam',
}

const dietaryLabels: Record<string, { label: string; color: string }> = {
  'vegetarisch': { label: 'Vegetarisch', color: 'bg-green-100 text-green-800 border-green-200' },
  'vegan': { label: 'Vegan', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  'glutenfrei': { label: 'Glutenfrei', color: 'bg-amber-100 text-amber-800 border-amber-200' },
}

export default function Speisekarte({ 
  title = "Unsere Speisekarte",
  categories = defaultCategories,
  allergenLegend = defaultAllergenLegend
}: SpeisekarteProps) {
  const [activeCategory, setActiveCategory] = useState('vorspeisen')

  return (
    <section id="speisekarte" className="py-24 px-6 bg-stone-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-amber-700 uppercase tracking-[0.2em] text-xs font-semibold">Speisekarte</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mt-2 mb-4 text-stone-900">{title}</h2>
          <div className="w-12 h-0.5 bg-amber-600 mx-auto mb-6" />
          <p className="text-stone-500 text-sm">Alle Preise in Euro inkl. MwSt. Allergene sind gekennzeichnet.</p>
        </div>

        <nav className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-amber-700 text-white shadow-md'
                  : 'bg-white text-stone-600 hover:bg-amber-50 border border-stone-200'
              }`}
            >
              <span className="mr-1.5">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </nav>

        {categories.filter(cat => cat.id === activeCategory).map((cat) => (
          <div key={cat.id} className="space-y-0">
            {cat.dishes.map((dish, i) => (
              <div key={i} className={`${dish.highlight ? 'bg-amber-50 border border-amber-200 rounded-xl p-6 my-2' : 'py-5 border-b border-stone-200 last:border-b-0'}`}>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-serif font-semibold text-stone-900">{dish.name}</h3>
                      {dish.highlight && (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-amber-600 text-white rounded">Empfehlung</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      {dish.dietary?.map((d) => (
                        <span key={d} className={`px-2 py-0.5 text-xs font-medium rounded border ${dietaryLabels[d]?.color || 'bg-stone-100 text-stone-600 border-stone-200'}`}>
                          {dietaryLabels[d]?.label || d}
                        </span>
                      ))}
                    </div>
                    <p className="text-stone-500 mt-2 text-sm leading-relaxed">{dish.description}</p>
                    {dish.allergens && dish.allergens.length > 0 && (
                      <p className="text-xs text-stone-400 mt-1.5">
                        Allergene: {dish.allergens.map(a => `${a} ${allergenLegend[a] || a}`).join(' · ')}
                      </p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xl font-serif font-semibold text-stone-900">{dish.price} &euro;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        <div className="mt-12 p-5 bg-white rounded-xl border border-stone-200">
          <h4 className="text-sm font-semibold text-stone-700 mb-3">Allergenkennzeichnung</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1 text-xs text-stone-500">
            {Object.entries(allergenLegend).map(([code, name]) => (
              <span key={code}><strong className="text-stone-700">{code}</strong> — {name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}