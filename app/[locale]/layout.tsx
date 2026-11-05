import type { Metadata } from 'next';
import { Cormorant, Jost } from 'next/font/google';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ApolloClientProvider } from '@/lib/apollo/provider';
import { AuthProvider } from '@/context/AuthContext';
import { Header } from '@/components/layout/Header/Header';
import { CartProvider } from '@/context/CartContext';
import { Footer } from '@/components/layout/Footer/Footer';

const cormorant = Cormorant({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
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
      className={`${cormorant.variable} ${jost.variable}`}
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
              </CartProvider>
            </AuthProvider>
          </ApolloClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
