'use client';

import Image from 'next/image';
import Link from 'next/link';
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

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
        {collections.slice(0, CATEGORIES_COUNT).map((collection) => (
          <Link
            key={collection.id}
            href={pageConfig.collection(collection.handle)}
            className="group relative aspect-square overflow-hidden rounded-2xl sm:rounded-3xl"
          >
            {collection.image ? (
              <Image
                src={collection.image.url}
                alt={collection.image.altText ?? collection.title}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-caramel/10" />
            )}

            <div
              className="absolute inset-0 bg-mocha/25 group-hover:bg-mocha/45
                transition-colors duration-300 flex flex-col items-center justify-center text-cream"
            >
              <h3 className="font-cormorant text-cream font-semibold italic text-lg sm:text-2xl">
                {collection.title}
              </h3>
              <div className="w-8 h-px bg-cream/70 my-2" />
              <span
                className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em]
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                {tCommon('explore')}
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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="aspect-square bg-caramel/10 rounded-2xl sm:rounded-3xl animate-pulse"
          />
        ))}
      </div>
    </section>
  );
}
