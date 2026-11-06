'use client';

import Image from 'next/image';
import { CollectionsSkeleton } from './CollectionsSkeleton';
import { pageConfig } from '@/config/pages.config';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useCollections } from '@/hooks/useCollections';

export function CollectionsPage() {
  const t = useTranslations('collections');
  const { collections, loading } = useCollections();

  if (loading && collections.length === 0) return <CollectionsSkeleton />;

  return (
    <div className="min-h-screen py-8 sm:py-14">
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-40"
      >
        <div className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-caramel/15 blur-3xl" />
        <div className="absolute top-96 -right-20 w-96 h-96 rounded-full bg-caramel-light/25 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
        {/* Header */}
        <div className="mb-12 sm:mb-16 text-center sm:text-left">
          <p className="font-jost text-xs uppercase tracking-[0.25em] text-caramel font-semibold mb-2">
            {t('eyebrow')}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif italic text-4xl sm:text-5xl text-mocha font-semibold">
                {t('title')}
              </h1>
              <p className="font-jost text-sm sm:text-base text-mocha/75 mt-2 max-w-2xl leading-relaxed">
                {t('subtitle')}
              </p>
            </div>
            <span className="self-center sm:self-auto font-jost text-xs font-semibold text-caramel bg-caramel/10 border border-caramel/20 px-4 py-1.5 rounded-full whitespace-nowrap">
              {collections.length} {collections.length === 1 ? 'category' : 'categories'}
            </span>
          </div>
          <div className="w-16 h-px bg-caramel/30 mt-6 mx-auto sm:mx-0" />
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={pageConfig.collection(collection.handle)}
              className="group relative flex flex-col rounded-3xl border border-caramel/15
                bg-white/80 shadow-[0_8px_30px_rgba(58,35,24,0.04)]
                hover:shadow-[0_20px_40px_rgba(58,35,24,0.12)] hover:border-caramel/40 hover:bg-white
                hover:-translate-y-1 transition-all duration-300 overflow-hidden p-4 sm:p-5"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden rounded-2xl bg-caramel/5">
                {collection.image ? (
                  <Image
                    src={collection.image.url}
                    alt={collection.image.altText ?? collection.title}
                    width={collection.image.width ?? 700}
                    height={collection.image.height ?? 525}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-caramel/10 flex items-center justify-center">
                    <span className="font-serif italic text-3xl text-caramel/50">
                      🥐
                    </span>
                  </div>
                )}

                {/* Floating Craft Badge on Image */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-3 py-1 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-cream/90 text-mocha backdrop-blur-md shadow-xs">
                    {t('craftBadge')}
                  </span>
                </div>
              </div>

              {/* Content Block below the image */}
              <div className="pt-5 px-1 flex flex-col flex-1 justify-between gap-3">
                <div>
                  <h2 className="font-serif italic text-2xl sm:text-3xl text-mocha font-semibold group-hover:text-caramel transition-colors leading-tight mb-2">
                    {collection.title}
                  </h2>

                  {collection.description && (
                    <p className="font-jost text-xs sm:text-sm text-mocha/70 line-clamp-2 leading-relaxed">
                      {collection.description}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-caramel/10 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-caramel group-hover:text-mocha transition-colors">
                  <span>{t('explore')}</span>
                  <span className="w-7 h-7 rounded-full bg-caramel/10 group-hover:bg-mocha text-caramel group-hover:text-cream flex items-center justify-center transition-all duration-200">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Atmosphere Banner */}
        <div className="mt-16 sm:mt-24 bg-white/70 border border-caramel/20 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-[0_8px_30px_rgba(58,35,24,0.04)]">
          <div className="max-w-xl mx-auto flex flex-col items-center">
            <span className="text-2xl mb-3">🥐</span>
            <h3 className="font-serif italic text-2xl sm:text-3xl text-mocha font-semibold mb-3">
              {t('bannerTitle')}
            </h3>
            <p className="font-jost text-sm text-mocha/70 mb-6 leading-relaxed">
              {t('bannerSubtitle')}
            </p>
            <Link
              href={pageConfig.products}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full
                bg-mocha text-cream text-xs sm:text-sm font-medium uppercase tracking-[0.12em]
                hover:bg-caramel hover:shadow-lg transition-all duration-300"
            >
              {t('allProductsCta')} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
