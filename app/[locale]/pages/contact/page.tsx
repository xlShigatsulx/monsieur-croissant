import type { Metadata } from 'next';
import ContactPage from '@/components/pages/contact/ContactPage';

interface ContactProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || 'https://monsieur-croissant.vercel.app';

  const title = isEn
    ? 'Contact & Bakery Location | Monsieur Croissant'
    : 'Контакти та локація пекарні | Monsieur Croissant';

  const description = isEn
    ? 'Find our bakery opening hours, address, phone number, and send us a message. Fresh morning pickup and citywide delivery.'
    : 'Контакти пекарні Monsieur Croissant: адреса, графік роботи, телефон та форма зворотного звʼязку. Завітайте на свіжі круасани та каву.';

  return {
    title,
    description,
    alternates: {
      canonical: isEn ? `${baseUrl}/en/pages/contact` : `${baseUrl}/pages/contact`,
      languages: {
        uk: `${baseUrl}/pages/contact`,
        en: `${baseUrl}/en/pages/contact`,
      },
    },
    openGraph: {
      title,
      description,
      url: isEn ? `${baseUrl}/en/pages/contact` : `${baseUrl}/pages/contact`,
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

export default function Contact() {
  return <ContactPage />;
}
