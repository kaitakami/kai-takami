import './globals.css'
import type { Metadata } from 'next'
import { Locale, i18n } from '@/i18n.config'

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kai Takami',
  description: 'Engineer. Dev. Builder.'
}

export async function generateStaticParams() {
  return i18n.locales.map((locale: string) => ({ lang: locale }))
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  return (
    <html lang={params.lang}>
      <body className={`${inter.className} max-w-2xl m-auto p-3 py-20`}>
        <main>{children}</main>
      </body>
    </html>
  )
}
