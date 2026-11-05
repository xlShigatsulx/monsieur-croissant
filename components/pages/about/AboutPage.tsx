'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { pageConfig } from '@/config/pages.config';

export function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="min-h-screen py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <p className="font-jost text-caramel text-xs sm:text-sm font-medium uppercase tracking-[0.25em] mb-3">
            {t('eyebrow')}
          </p>
          <h1 className="font-cormorant italic text-4xl sm:text-5xl md:text-6xl text-mocha font-light mb-6">
            {t('title')}
          </h1>
          <div className="w-16 h-px bg-caramel/40 mx-auto mb-6" />
          <p className="font-jost text-mocha/70 text-base sm:text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center mb-20 sm:mb-28">
          <div className="relative aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/hero-bakery.webp"
              alt="Monsieur Croissant Craft Bakery"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="font-cormorant italic text-3xl sm:text-4xl text-mocha font-light">
              {t('storyTitle')}
            </h2>
            <p className="font-jost text-sm sm:text-base text-mocha/75 leading-relaxed">
              {t('storyP1')}
            </p>
            <p className="font-jost text-sm sm:text-base text-mocha/75 leading-relaxed">
              {t('storyP2')}
            </p>
            <div className="pt-2">
              <Link
                href={pageConfig.products}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full
                  bg-mocha text-cream text-xs sm:text-sm font-medium uppercase tracking-[0.15em]
                  shadow-[0_4px_20px_rgba(58,35,24,0.15)]
                  hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(58,35,24,0.22)]
                  active:translate-y-0 transition-all duration-300"
              >
                Наші вироби
              </Link>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="border-t border-caramel/15 pt-16 sm:pt-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-white/60 rounded-2xl p-6 sm:p-8 border border-caramel/10 flex flex-col gap-3">
              <span className="font-cormorant italic text-3xl text-caramel">01</span>
              <h3 className="font-cormorant italic text-2xl text-mocha">
                {t('values.craft')}
              </h3>
              <p className="font-jost text-sm text-mocha/70 leading-relaxed">
                {t('values.craftDesc')}
              </p>
            </div>

            <div className="bg-white/60 rounded-2xl p-6 sm:p-8 border border-caramel/10 flex flex-col gap-3">
              <span className="font-cormorant italic text-3xl text-caramel">02</span>
              <h3 className="font-cormorant italic text-2xl text-mocha">
                {t('values.natural')}
              </h3>
              <p className="font-jost text-sm text-mocha/70 leading-relaxed">
                {t('values.naturalDesc')}
              </p>
            </div>

            <div className="bg-white/60 rounded-2xl p-6 sm:p-8 border border-caramel/10 flex flex-col gap-3">
              <span className="font-cormorant italic text-3xl text-caramel">03</span>
              <h3 className="font-cormorant italic text-2xl text-mocha">
                {t('values.fresh')}
              </h3>
              <p className="font-jost text-sm text-mocha/70 leading-relaxed">
                {t('values.freshDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
