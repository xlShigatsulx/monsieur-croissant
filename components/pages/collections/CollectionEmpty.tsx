import { useTranslations } from 'next-intl';

export function CollectionEmpty() {
  const t = useTranslations('collection.empty');

  return (
    <div className="text-center py-24">
      <p className="font-serif italic text-3xl text-mocha/70 font-semibold mb-3">
        {t('title')}
      </p>
      <p className="font-jost text-xs tracking-[0.15em] uppercase text-mocha/60 font-medium">
        {t('subtitle')}
      </p>
    </div>
  );
}
