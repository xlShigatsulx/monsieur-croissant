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

  if (loading) return <CollectionsSkeleton />;

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
              className="group relative overflow-hidden rounded-3xl border border-caramel/15
                bg-white/40 shadow-[0_8px_30px_rgba(58,35,24,0.06)]
                hover:shadow-[0_20px_40px_rgba(58,35,24,0.14)] hover:border-caramel/40
                transition-all duration-500 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-caramel/5">
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
                    <span className="font-serif italic text-2xl text-caramel/50">
                      {collection.title}
                    </span>
                  </div>
                )}

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-mocha/80 via-mocha/30 to-transparent pointer-events-none" />

                {/* Floating Craft Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-cream/90 text-mocha backdrop-blur-md shadow-xs">
                    {t('craftBadge')}
                  </span>
                </div>

                {/* Card Title & Link in Bottom Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h2
                    className="font-serif italic text-2xl sm:text-3xl text-cream font-semibold leading-tight mb-2"
                    style={{
                      textShadow:
                        '0 1px 8px rgba(0,0,0,0.6), 0 2px 24px rgba(0,0,0,0.4)',
                    }}
                  >
                    {collection.title}
                  </h2>

                  {collection.description && (
                    <p
                      className="font-jost text-xs sm:text-sm text-cream/90 line-clamp-2 leading-relaxed mb-4"
                      style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
                    >
                      {collection.description}
                    </p>
                  )}

                  <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-amber-200 group-hover:text-white transition-colors duration-200">
                    <span>{t('explore')}</span>
                    <span className="group-hover:translate-x-1.5 transition-transform duration-300">
                      →
                    </span>
                  </div>
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
