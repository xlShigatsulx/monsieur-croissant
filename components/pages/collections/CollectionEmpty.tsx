'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { pageConfig } from '@/config/pages.config';

export function CollectionEmpty() {
  const t = useTranslations('collection.empty');

  return (
    <div className="text-center py-24 max-w-md mx-auto px-4">
      <div className="w-16 h-16 rounded-full bg-caramel/10 flex items-center justify-center text-caramel mx-auto mb-4 text-2xl">
        🥐
      </div>
      <p className="font-serif italic text-3xl text-mocha font-semibold mb-2">
        {t('title')}
      </p>
      <p className="font-jost text-sm text-mocha/65 mb-6 leading-relaxed">
        {t('subtitle')}
      </p>
      <Link
        href={pageConfig.collections}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-mocha text-cream text-xs font-medium uppercase tracking-wider hover:bg-caramel transition-colors"
      >
        {t('backLink')} →
      </Link>
    </div>
  );
}
