import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Website Factory',
  description: 'Silnik stron dla małych i średnich firm',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Per-site language is set on the site wrapper (`lang` attribute) in /s/[site].
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  )
}
