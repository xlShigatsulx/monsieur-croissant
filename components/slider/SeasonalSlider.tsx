import { useTranslations } from 'next-intl';
import { SectionHeading } from '../ui/SectionHeading';
import ProductSlider from './ProductSlider';

export function SeasonalSlider() {
  const t = useTranslations('home.seasonal');

  return (
    <section className="py-14 sm:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />
      </div>

      <div className="flex flex-col items-center px-4 sm:px-6">
        <ProductSlider />
      </div>
    </section>
  );
}
