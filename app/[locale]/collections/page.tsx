import type { Metadata } from 'next';
import { CollectionsPage } from '@/components/pages/collections/CollectionsPage';

interface CollectionsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: CollectionsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || 'https://monsieur-croissant.vercel.app';

  const title = isEn
    ? 'Bakery Collections | Monsieur Croissant'
    : 'Колекції випічки та хліба | Monsieur Croissant';

  const description = isEn
    ? 'Discover our artisan collections: classic French croissants, wild sourdough breads, seasonal tarts, and gourmet breakfast boxes.'
    : 'Оберіть улюблені колекції: ремісничі круасани, хліб на заквасці, ранкові сети та вишукані десерти від пекарні Monsieur Croissant.';

  return {
    title,
    description,
    alternates: {
      canonical: isEn ? `${baseUrl}/en/collections` : `${baseUrl}/collections`,
      languages: {
        uk: `${baseUrl}/collections`,
        en: `${baseUrl}/en/collections`,
      },
    },
    openGraph: {
      title,
      description,
      url: isEn ? `${baseUrl}/en/collections` : `${baseUrl}/collections`,
      siteName: 'Monsieur Croissant',
      locale: isEn ? 'en_US' : 'uk_UA',
      type: 'website',
      images: [
        {
          url: '/images/hero-bakery.webp',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export default function Page() {
  return <CollectionsPage />;
}
