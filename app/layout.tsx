import type { Metadata } from 'next'
import { Cormorant, Jost } from 'next/font/google'
import './globals.css'
import { ApolloClientProvider } from '@/lib/apollo/provider'
import { AuthProvider } from '@/context/AuthContext'
import { Header } from '@/components/layout/Header/Header'
import { CartProvider } from '@/context/CartContext'

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
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
    <html
      lang='ua'
      className={`${cormorant.variable} ${jost.variable}`}
      data-scroll-behavior='smooth'
    >
      <body>
        <ApolloClientProvider>
          <AuthProvider>
            <CartProvider>
              <Header />
              {children}
            </CartProvider>
          </AuthProvider>
        </ApolloClientProvider>
      </body>
    </html>
  )
}
