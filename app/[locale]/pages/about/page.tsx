import type { Metadata } from 'next';
import { AboutPage } from '@/components/pages/about/AboutPage';

interface AboutProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AboutProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || 'https://monsieur-croissant.vercel.app';

  const title = isEn
    ? 'Our Story & Philosophy | Monsieur Croissant'
    : 'Про пекарню | Monsieur Croissant';

  const description = isEn
    ? 'Discover the story behind Monsieur Croissant. French artisan baking heritage, wild Levain sourdough, and pure cultured butter.'
    : 'Історія крафтової пекарні Monsieur Croissant. Традиції французького хлібопечення на живій заквасці та 100% натуральні інгредієнти.';

  return {
    title,
    description,
    alternates: {
      canonical: isEn ? `${baseUrl}/en/pages/about` : `${baseUrl}/pages/about`,
      languages: {
        uk: `${baseUrl}/pages/about`,
        en: `${baseUrl}/en/pages/about`,
      },
    },
    openGraph: {
      title,
      description,
      url: isEn ? `${baseUrl}/en/pages/about` : `${baseUrl}/pages/about`,
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

export default function About() {
  return <AboutPage />;
}
