import type { Metadata } from 'next';
import HomePage from '@/components/pages/home/HomePage';

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomeProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || 'https://monsieur-croissant.vercel.app';

  const title = isEn
    ? 'Monsieur Croissant — Artisan French Bakery & Sourdough'
    : 'Monsieur Croissant — Французька пекарня на живій заквасці';

  const description = isEn
    ? 'Freshly baked French croissants, artisanal sourdough bread, and delicate patisserie every morning. Traditional recipes, 100% natural ingredients.'
    : 'Свіжа французька випічка, ремісничі круасани та хліб щоранку. Традиційні рецепти та натуральні інгредієнти.';

  return {
    title,
    description,
    alternates: {
      canonical: isEn ? `${baseUrl}/en` : baseUrl,
      languages: {
        uk: baseUrl,
        en: `${baseUrl}/en`,
      },
    },
    openGraph: {
      title,
      description,
      url: isEn ? `${baseUrl}/en` : baseUrl,
      siteName: 'Monsieur Croissant',
      locale: isEn ? 'en_US' : 'uk_UA',
      type: 'website',
      images: [
        {
          url: '/images/hero-bakery.webp',
          width: 1200,
          height: 630,
          alt: 'Monsieur Croissant Artisan Bakery',
        },
      ],
    },
  };
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  const isEn = locale === 'en';
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || 'https://monsieur-croissant.vercel.app';

  const bakeryJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    name: 'Monsieur Croissant',
    description: isEn
      ? 'Artisan French bakery specializing in sourdough croissants and pastries.'
      : 'Реміснича французька пекарня на живій заквасці.',
    url: isEn ? `${baseUrl}/en` : baseUrl,
    image: `${baseUrl}/images/hero-bakery.webp`,
    priceRange: '₴₴',
    servesCuisine: ['French', 'Bakery', 'Coffee'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kyiv',
      addressCountry: 'UA',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '08:00',
        closes: '20:00',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bakeryJsonLd) }}
      />
      <HomePage />
    </>
  );
}
