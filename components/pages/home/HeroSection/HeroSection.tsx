'use client';

import { useHeroData } from '@/hooks/useHeroData';
import { HeroSkeleton } from './HeroSkeleton';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function HeroSection() {
  const { data, loading } = useHeroData();
  const t = useTranslations('home.hero');

  if (loading) return <HeroSkeleton />;
  if (!data) return null;

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-20 -left-16 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-caramel/15 blur-3xl" />
        <div className="absolute -bottom-28 -right-16 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-caramel-light/25 blur-3xl" />
      </div>

      <div className="animate-caption-up max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <p className="font-cormorant italic text-caramel/80 text-base sm:text-lg font-light tracking-wide mb-2">
          {t('kicker')}
        </p>

        <h1 className="font-cormorant italic text-4xl sm:text-5xl md:text-6xl text-mocha font-semibold leading-tight text-balance mb-4">
          {data.title}
        </h1>

        <div className="w-12 h-px bg-caramel/50 mx-auto mb-6" />

        <p className="text-mocha/70 text-base sm:text-lg leading-relaxed whitespace-pre-line text-balance max-w-md mx-auto mb-8">
          {data.subtitle}
        </p>

        <Link
          href={data.buttonUrl || '/products'}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full
            border border-caramel/40 text-mocha text-sm tracking-wide
            hover:bg-caramel/8 hover:border-caramel active:scale-[0.98]
            transition-all duration-200"
        >
          {data.buttonLabel || t('ctaFallback')}
        </Link>
      </div>
    </div>
  );
}
