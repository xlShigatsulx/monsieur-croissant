import type { Metadata } from 'next';
import { Playfair_Display, Manrope } from 'next/font/google';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ApolloClientProvider } from '@/lib/apollo/provider';
import { AuthProvider } from '@/context/AuthContext';
import { Header } from '@/components/layout/Header/Header';
import { CartProvider } from '@/context/CartContext';
import { Footer } from '@/components/layout/Footer/Footer';
import { CartDrawer } from '@/components/pages/cart/CartDrawer';

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

const appUrl =
  process.env.NEXT_PUBLIC_APP_URL || 'https://monsieur-croissant.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: 'Monsieur Croissant — Французька пекарня на живій заквасці',
    template: '%s',
  },
  description:
    'Свіжа французька випічка, ремісничі круасани та хліб щоранку. Традиційні рецепти та натуральні інгредієнти.',
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    siteName: 'Monsieur Croissant',
    title: 'Monsieur Croissant — Французька пекарня на живій заквасці',
    description:
      'Свіжа французька випічка, ремісничі круасани та хліб щоранку.',
    images: [
      {
        url: '/images/hero-bakery.webp',
        width: 1200,
        height: 630,
        alt: 'Monsieur Croissant Bakery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Monsieur Croissant — Французька пекарня',
    description:
      'Свіжа французька випічка, ремісничі круасани та хліб щоранку.',
    images: ['/images/hero-bakery.webp'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${manrope.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen flex flex-col bg-cream text-mocha">
        <NextIntlClientProvider messages={messages}>
          <ApolloClientProvider>
            <AuthProvider>
              <CartProvider>
                <Header />
                <main className="flex-1 flex flex-col">{children}</main>
                <Footer />
                <CartDrawer />
              </CartProvider>
            </AuthProvider>
          </ApolloClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
