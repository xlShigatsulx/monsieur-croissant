'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useShop } from '@/hooks/useShop';
import { pageConfig } from '@/config/pages.config';

export function AboutTeaser() {
  const t = useTranslations('home.about');
  const { shortDescription, slogan, loading } = useShop();

  if (loading) return <AboutTeaserSkeleton />;

  const text = shortDescription || slogan || t('fallback');

  return (
    <section className="max-w-3xl mx-auto px-4 py-14 sm:py-20 text-center">
      <p className="text-[11px] tracking-[0.2em] uppercase text-caramel/70 mb-3">
        {t('eyebrow')}
      </p>
      <h2 className="font-cormorant italic text-3xl sm:text-4xl text-mocha font-light mb-5">
        {t('title')}
      </h2>
      <div className="w-12 h-px bg-caramel/50 mx-auto mb-6" />
      <p className="text-mocha/70 text-base leading-relaxed mb-8">{text}</p>
      <Link
        href={pageConfig.about}
        className="inline-flex items-center gap-2 px-8 py-3 rounded-full
          border border-caramel/40 text-mocha text-sm tracking-wide
          hover:bg-caramel/8 hover:border-caramel
          transition-all duration-200"
      >
        {t('cta')}
      </Link>
    </section>
  );
}

function AboutTeaserSkeleton() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-14 sm:py-20 flex flex-col items-center gap-4">
      <div className="h-3 w-24 bg-caramel/10 rounded animate-pulse" />
      <div className="h-9 w-64 bg-caramel/10 rounded animate-pulse" />
      <div className="h-4 w-full max-w-md bg-caramel/10 rounded animate-pulse" />
      <div className="h-4 w-4/5 max-w-md bg-caramel/10 rounded animate-pulse" />
      <div className="h-10 w-40 bg-caramel/10 rounded-full animate-pulse mt-2" />
    </section>
  );
}
