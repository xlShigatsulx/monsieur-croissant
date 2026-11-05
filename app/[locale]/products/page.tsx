import type { Metadata } from 'next';
import { ProductsPage } from '@/components/pages/products/ProductsPage';

interface ProductsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ProductsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || 'https://monsieur-croissant.vercel.app';

  const title = isEn
    ? 'All Pastries & Desserts | Monsieur Croissant'
    : 'Вся свіжа випічка та десерти | Monsieur Croissant';

  const description = isEn
    ? 'Browse our complete catalog of freshly baked French croissants, sourdough baguettes, pain au chocolat, and artisan desserts.'
    : 'Перегляньте повний асортимент ремісничої французької випічки: класичні круасани, хліб на заквасці, десерти та випічка до кави.';

  return {
    title,
    description,
    alternates: {
      canonical: isEn ? `${baseUrl}/en/products` : `${baseUrl}/products`,
      languages: {
        uk: `${baseUrl}/products`,
        en: `${baseUrl}/en/products`,
      },
    },
    openGraph: {
      title,
      description,
      url: isEn ? `${baseUrl}/en/products` : `${baseUrl}/products`,
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
  return <ProductsPage />;
}
