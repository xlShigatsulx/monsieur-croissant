import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { ApolloClientProvider } from '@/lib/apollo/provider'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Месьє Круасан',
  description: 'Випічка на живій заквасці',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ua'>
      <body className={`${montserrat.variable} font-sans`}>
        <ApolloClientProvider>{children}</ApolloClientProvider>
      </body>
    </html>
  )
}
