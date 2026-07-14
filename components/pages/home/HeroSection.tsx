'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useHeroData } from '@/hooks/useHeroData';

export function HeroSection() {
  const { data, loading } = useHeroData();
  const t = useTranslations('home.hero');

  if (loading) return <HeroSkeleton />;
  if (!data) return null;

  return (
    <header className="relative overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-20 md:pt-16 md:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-20 -left-16 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-caramel/15 blur-3xl" />
        <div className="absolute -bottom-28 -right-16 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-caramel-light/25 blur-3xl" />
      </div>

      <div
        className="animate-caption-up max-w-6xl mx-auto px-4 sm:px-6
          grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-12"
      >
        <div className="text-center md:text-left">
          <p className="font-jost text-caramel text-xs sm:text-sm font-medium uppercase tracking-[0.25em] mb-3">
            {t('kicker')}
          </p>

          <h1
            className="font-cormorant italic text-mocha font-semibold leading-[1.05] text-balance mb-5
            text-4xl sm:text-5xl md:text-5xl lg:text-6xl"
          >
            {data.title}
          </h1>

          <div className="w-12 h-px bg-caramel/50 mx-auto md:mx-0 mb-6" />

          <p
            className="italic text-mocha/70 text-base sm:text-lg leading-relaxed whitespace-pre-line text-balance
            max-w-md mx-auto md:mx-0 mb-9"
          >
            {data.subtitle}
          </p>

          <Link
            href={data.buttonUrl || '/products'}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg
              bg-mocha text-cream text-xs sm:text-sm font-medium uppercase tracking-[0.1em]
              shadow-[0_4px_20px_rgba(58,35,24,0.15)]
              hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(58,35,24,0.22)]
              active:translate-y-0 transition-all duration-300"
          >
            {data.buttonLabel || t('ctaFallback')}
          </Link>
        </div>

        <div className="relative max-w-sm mx-auto md:max-w-none">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/hero-bakery.png"
              alt={t('imageAlt')}
              width={1376}
              height={768}
              priority
              sizes="(max-width: 768px) 90vw, 500px"
              className="w-full h-full object-cover"
            />
          </div>

          <div
            className="absolute -bottom-5 -left-5 sm:-bottom-6 sm:-left-6
              w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-caramel
              flex items-center justify-center text-center p-3 sm:p-4
              shadow-lg"
          >
            <span className="font-jost text-cream text-[9px] sm:text-[11px] uppercase tracking-[0.15em] leading-tight">
              {t('badge')}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export function HeroSkeleton() {
  return (
    <div
      className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-14 sm:pt-12 sm:pb-20 md:pt-16 md:pb-24
        grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-12"
    >
      <div className="flex flex-col items-center md:items-start gap-4">
        <div className="h-3 w-32 bg-caramel/10 rounded animate-pulse" />
        <div className="h-10 sm:h-14 w-64 sm:w-80 bg-caramel/10 rounded animate-pulse" />
        <div className="w-12 h-px bg-caramel/20 my-1" />
        <div className="h-4 w-72 max-w-full bg-caramel/10 rounded animate-pulse" />
        <div className="h-4 w-56 max-w-full bg-caramel/10 rounded animate-pulse" />
        <div className="h-12 w-40 bg-caramel/10 rounded-lg animate-pulse mt-2" />
      </div>
      <div className="aspect-4/5 max-w-sm mx-auto md:max-w-none w-full bg-caramel/10 rounded-2xl animate-pulse" />
    </div>
  );
}
