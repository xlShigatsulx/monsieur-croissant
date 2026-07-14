'use client';

import { useLocale, useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { pageConfig } from '@/config/pages.config';
import { useBestsellers } from '@/hooks/useBestsellers';
import { BestsellerProduct } from '@/types/bestsellersSection';
import { BestsellerCard } from './BestsellerCard';

const BESTSELLERS_COUNT = 8;

export function BestsellersSection() {
  const t = useTranslations('home.bestsellers');
  const locale = useLocale();
  const { products, loading } = useBestsellers(BESTSELLERS_COUNT);

  if (loading) return <BestsellersSectionSkeleton />;
  if (products.length === 0) return null;

  return (
    <section className="border-y border-caramel/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          viewAllHref={pageConfig.products}
          viewAllLabel={t('viewAll')}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {(products as BestsellerProduct[]).map((product) => (
            <BestsellerCard
              key={product.id}
              product={product}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BestsellersSectionSkeleton() {
  return (
    <section className="border-y border-caramel/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="h-8 w-56 bg-caramel/10 rounded animate-pulse mb-10" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div className="aspect-square bg-caramel/10 rounded-xl sm:rounded-2xl animate-pulse mb-3" />
              <div className="h-4 w-3/4 bg-caramel/10 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
