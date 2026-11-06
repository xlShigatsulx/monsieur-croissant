'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { pageConfig } from '@/config/pages.config';
import { useCollections } from '@/hooks/useCollections';

const CATEGORIES_COUNT = 6;

export function CategoriesSection() {
  const t = useTranslations('home.categories');
  const tCommon = useTranslations('home');
  const { collections, loading } = useCollections(CATEGORIES_COUNT);

  if (loading) return <CategoriesSectionSkeleton />;
  if (collections.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        align="left"
        viewAllHref={pageConfig.collections}
        viewAllLabel={t('viewAll')}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
        {collections.slice(0, CATEGORIES_COUNT).map((collection) => (
          <Link
            key={collection.id}
            href={pageConfig.collection(collection.handle)}
            className="group relative flex flex-col rounded-2xl sm:rounded-3xl
              bg-white/70 border border-caramel/15 hover:border-caramel/40 hover:bg-white
              shadow-[0_4px_20px_rgba(58,35,24,0.04)] hover:shadow-[0_12px_32px_rgba(58,35,24,0.1)]
              hover:-translate-y-1 transition-all duration-300 p-2.5 sm:p-3.5 overflow-hidden"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-caramel/5">
              {collection.image ? (
                <Image
                  src={collection.image.url}
                  alt={collection.image.altText ?? collection.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-caramel/10 flex items-center justify-center text-2xl">
                  🥐
                </div>
              )}
            </div>

            <div className="pt-2.5 sm:pt-3.5 px-1 flex flex-col items-center text-center">
              <h3 className="font-serif text-mocha font-semibold italic text-base sm:text-xl group-hover:text-caramel transition-colors line-clamp-1">
                {collection.title}
              </h3>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-caramel mt-1 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                {tCommon('explore')} →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CategoriesSectionSkeleton() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
      <div className="h-8 w-56 bg-caramel/10 rounded animate-pulse mb-10 mx-auto" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="p-3 bg-white/50 border border-caramel/10 rounded-2xl"
          >
            <div className="aspect-[4/3] bg-caramel/10 rounded-xl animate-pulse mb-3" />
            <div className="h-4 w-2/3 bg-caramel/10 rounded animate-pulse mx-auto" />
          </div>
        ))}
      </div>
    </section>
  );
}
