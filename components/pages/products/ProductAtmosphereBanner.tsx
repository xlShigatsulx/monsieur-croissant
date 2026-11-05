'use client';

import { Link } from '@/i18n/navigation';
import { pageConfig } from '@/config/pages.config';
import { useTranslations } from 'next-intl';

export function ProductAtmosphereBanner() {
  const t = useTranslations('product.banner');

  return (
    <section className="mt-20 sm:mt-24 mb-6">
      <div className="relative overflow-hidden rounded-3xl bg-mocha text-cream p-8 sm:p-12 md:p-16 text-center shadow-xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-0 opacity-15"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 50%, rgba(250, 235, 215, 0.4) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <span className="font-serif italic text-caramel-light text-2xl mb-2">
            Monsieur Croissant
          </span>
          <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 text-cream">
            {t('title')}
          </h2>
          <p className="font-jost text-sm sm:text-base text-cream/80 max-w-lg mb-8 leading-relaxed">
            {t('subtitle')}
          </p>
          <Link
            href={pageConfig.about}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full
              bg-cream text-mocha text-xs sm:text-sm font-medium uppercase tracking-[0.15em]
              hover:bg-caramel hover:text-cream transition-all duration-300 shadow-md"
          >
            {t('button')}
          </Link>
        </div>
      </div>
    </section>
  );
}
