import { useTranslations } from 'next-intl';

export function CollectionEmpty() {
  const t = useTranslations('collection.empty');

  return (
    <div className="text-center py-24">
      <p className="font-cormorant italic text-3xl text-mocha/30 font-light mb-3">
        {t('title')}
      </p>
      <p className="font-jost text-[11px] tracking-[0.2em] uppercase text-mocha/30">
        {t('subtitle')}
      </p>
    </div>
  );
}
