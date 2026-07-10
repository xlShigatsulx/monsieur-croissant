'use client';

import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { pageConfig } from '@/config/pages.config';
import { useBestsellers } from '@/hooks/useBestsellers';

const BESTSELLERS_COUNT = 8;

export function BestsellersSection() {
  const t = useTranslations('home.bestsellers');
  const { products, loading } = useBestsellers(BESTSELLERS_COUNT);

  if (loading) return <BestsellersSectionSkeleton />;
  if (products.length === 0) return null;

  return (
    <section className="bg-sand/60 border-y border-caramel/10">
      <div className="max-w-6xl mx-auto px-4 py-14 sm:py-20">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          viewAllHref={pageConfig.products}
          viewAllLabel={t('viewAll')}
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              href={pageConfig.product(product.handle)}
              aspectRatio="3/4"
              caption={{
                title: product.title,
                titleSize: 'text-base sm:text-xl',
                price: product.variants?.edges[0]?.node.price.amount,
                availableForSale: product.availableForSale,
              }}
              image={product.images?.edges[0]?.node}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BestsellersSectionSkeleton() {
  return (
    <section className="bg-sand/60 border-y border-caramel/10">
      <div className="max-w-6xl mx-auto px-4 py-14 sm:py-20">
        <div className="h-8 w-56 bg-caramel/10 rounded animate-pulse mb-10" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-3/4 bg-caramel/10 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
