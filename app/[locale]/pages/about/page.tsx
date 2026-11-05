import type { Metadata } from 'next';
import { AboutPage } from '@/components/pages/about/AboutPage';

export const metadata: Metadata = {
  title: 'Про пекарню | Monsieur Croissant',
  description:
    'Історія крафтової пекарні Monsieur Croissant. Традиції французького хлібопечення на живій заквасці.',
};

export default function About() {
  return <AboutPage />;
}
