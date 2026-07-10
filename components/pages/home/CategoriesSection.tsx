'use client';

import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { pageConfig } from '@/config/pages.config';
import { useCollections } from '@/hooks/useCollections';

const CATEGORIES_COUNT = 6;

export function CategoriesSection() {
  const t = useTranslations('home.categories');
  const { collections, loading } = useCollections(CATEGORIES_COUNT);

  if (loading) return <CategoriesSectionSkeleton />;
  if (collections.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 py-14 sm:py-20">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        viewAllHref={pageConfig.collections}
        viewAllLabel={t('viewAll')}
      />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {collections.slice(0, CATEGORIES_COUNT).map((collection) => (
          <Card
            key={collection.id}
            href={pageConfig.collection(collection.handle)}
            aspectRatio="square"
            caption={{
              title: collection.title,
              titleSize: 'text-lg sm:text-2xl',
            }}
            image={collection.image}
          />
        ))}
      </div>
    </section>
  );
}

function CategoriesSectionSkeleton() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-14 sm:py-20">
      <div className="h-8 w-56 bg-caramel/10 rounded animate-pulse mb-10" />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="aspect-square bg-caramel/10 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    </section>
  );
}
