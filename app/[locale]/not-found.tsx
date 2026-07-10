import '@/app/globals.css';
import { useTranslations } from 'next-intl';
import { NotFoundView } from '@/components/layout/NotFoundView';

export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <NotFoundView
      title={t('title')}
      subtitle={t('subtitle')}
      homeLabel={t('home')}
    />
  );
}
