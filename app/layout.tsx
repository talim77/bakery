import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`

export const metadata: Metadata = {
  title: 'Meetha Moments | Cakes made with love',
  description: 'Freshly baked cakes for every celebration. Choose your flavour, size and design, then send your booking enquiry on WhatsApp.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: assetPath('/icon-light-32x32.png'),
        media: '(prefers-color-scheme: light)',
      },
      {
        url: assetPath('/icon-dark-32x32.png'),
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: assetPath('/icon.svg'),
        type: 'image/svg+xml',
      },
    ],
    apple: assetPath('/apple-icon.png'),
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.VERCEL === '1' && <Analytics />}
      </body>
    </html>
  )
}
