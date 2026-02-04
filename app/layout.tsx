import type { Metadata, Viewport } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | SR Houses',
    default: 'SR Houses',
  },
  description: 'Luxury holiday homes by Sommer Riebenbauer',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://sr-houses.com',
  ),
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#000',
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
