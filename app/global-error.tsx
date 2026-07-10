'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ErrorView } from '@/components/layout/ErrorView';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('error');
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorView
      title={t('title')}
      subtitle={t('subtitle')}
      resetLabel={t('reset')}
      homeLabel={t('home')}
      onReset={reset}
    />
  );
}
