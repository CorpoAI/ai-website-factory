import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Zum goldenen Hirschen | Traditionelle bayerische Küche in München',
    template: '%s | Zum goldenen Hirschen',
  },
  description: 'Genießen Sie traditionelle bayerische Küche in gemütlicher Atmosphäre. Seit 1952 Familientradition in München. Reservieren Sie jetzt Ihren Tisch!',
  metadataBase: new URL('https://zum-goldenen-hirschen.de'),
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'Zum goldenen Hirschen',
    title: 'Zum goldenen Hirschen | Traditionelle bayerische Küche in München',
    description: 'Genießen Sie traditionelle bayerische Küche in gemütlicher Atmosphäre. Seit 1952 Familientradition.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  )
}