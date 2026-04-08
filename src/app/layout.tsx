import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Ihre Website',
    template: '%s | Ihre Website',
  },
  description: 'Professionelle Website für Ihr Unternehmen',
  metadataBase: new URL('https://example.com'),
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'Ihre Website',
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