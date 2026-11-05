import type { Metadata } from 'next';
import { CartPage } from '@/components/pages/cart/CartPage';

interface CartPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: CartPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return {
    title: isEn
      ? 'Shopping Cart | Monsieur Croissant'
      : 'Кошик замовлення | Monsieur Croissant',
    description: isEn
      ? 'Review your selected pastries, specify quantities, and proceed to secure checkout.'
      : 'Перегляньте вибрані вироби, змініть кількість та оформіть замовлення зі свіжою доставкою.',
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function Page() {
  return <CartPage />;
}
