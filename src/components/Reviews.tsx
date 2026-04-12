interface Review {
  name: string
  date: string
  rating: number
  text: string
  source?: string
}

interface ReviewsProps {
  title?: string
  averageRating?: number
  totalReviews?: number
  reviews?: Review[]
}

const defaultReviews: Review[] = [
  { name: 'Thomas W.', date: 'März 2026', rating: 5, text: 'Die beste Schweinshaxe in ganz München! Knusprig außen, zart innen — und die Knödel sind hausgemacht. Das Bier kalt, die Bedienung freundlich. Wie jedes Mal ein Genuss.', source: 'Google' },
  { name: 'Sarah K.', date: 'Februar 2026', rating: 5, text: 'Authentische bayerische Küche in traumhafter Atmosphäre. Der Kaiserschmarrn ist der beste, den ich je gegessen habe. Absolute Empfehlung!', source: 'Google' },
  { name: 'Michael S.', date: 'Januar 2026', rating: 4, text: 'Wir kommen jede Woche mit der Familie. Die Kinder lieben den Kaiserschmarrn, ich die Schweinshaxe. Großartiges Preis-Leistungs-Verhältnis.', source: 'Google' },
  { name: 'Anna B.', date: 'Dezember 2025', rating: 5, text: 'Als Köchin schätze ich die Qualität der Zutaten und die handwerkliche Kunst. Der Forellenmousse ist ein Traum! Jeder Teller zeigt, dass hier jemand mit Leidenschaft kocht.', source: 'Google' },
  { name: 'Hans-Peter M.', date: 'November 2025', rating: 5, text: 'Klassisches bayerisches Restaurant mit Charme. Die Brezen sind ein Traum und das Augustiner vom Fass unvergleichlich. Personal ist aufmerksam und professionell.', source: 'Google' },
]

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className={`w-5 h-5 ${star <= rating ? 'text-amber-400' : 'text-stone-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Reviews({
  title = " Gästebewertungen",
  averageRating = 4.8,
  totalReviews = 247,
  reviews = defaultReviews
}: ReviewsProps) {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-amber-700 uppercase tracking-[0.2em] text-xs font-semibold">Bewertungen</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mt-2 mb-4 text-stone-900">{title}</h2>
          <div className="w-12 h-0.5 bg-amber-600 mx-auto mb-6" />
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-5xl font-serif font-bold text-stone-900">{averageRating}</span>
              <div className="text-left">
                <Stars rating={5} />
                <span className="text-sm text-stone-500">{totalReviews} Bewertungen</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 6).map((review, i) => (
            <div key={i} className="bg-white border border-stone-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <Stars rating={review.rating} />
                <span className="text-xs text-stone-400">{review.source === 'Google' ? 'Google' : 'Bewertung'}</span>
              </div>
              <p className="text-stone-700 leading-relaxed mb-4 text-sm">{review.text}</p>
              <div className="flex items-center gap-3 pt-3 border-t border-stone-100">
                <div className="w-9 h-9 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-serif font-bold text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <span className="font-semibold text-stone-900 text-sm">{review.name}</span>
                  <span className="text-stone-400 text-xs block">{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <span className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-600 font-medium transition-colors cursor-pointer">
            Alle {totalReviews} Bewertungen auf Google ansehen
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </span>
        </div>
      </div>
    </section>
  )
}