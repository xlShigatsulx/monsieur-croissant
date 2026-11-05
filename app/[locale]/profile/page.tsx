import type { Metadata } from 'next';
import { ProfilePage } from '@/components/pages/profile/ProfilePage';

interface ProfileProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ProfileProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return {
    title: isEn
      ? 'Customer Account | Monsieur Croissant'
      : 'Особистий кабінет | Monsieur Croissant',
    description: isEn
      ? 'Manage your customer account and view your bakery order history.'
      : 'Керуйте обліковим записом та переглядайте історію замовлень у пекарні Monsieur Croissant.',
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function Profile() {
  return <ProfilePage />;
}
