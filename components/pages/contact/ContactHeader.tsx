import { useTranslations } from 'next-intl';

export function ContactHeader() {
  const t = useTranslations('contact');

  return (
    <div className="text-center mb-8">
      <p className="font-serif italic text-caramel text-lg font-medium mb-2">
        {t('subtitle')}
      </p>
      <h1 className="font-serif italic text-4xl sm:text-5xl text-mocha font-semibold">
        {t('title')}
      </h1>
      <div className="w-12 h-px bg-caramel/50 mx-auto mt-6" />
    </div>
  );
}
