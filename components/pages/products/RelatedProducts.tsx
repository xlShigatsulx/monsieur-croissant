'use client';

import { useMemo } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { pageConfig } from '@/config/pages.config';
import { useTranslations } from 'next-intl';

interface RelatedProductsProps {
  currentHandle: string;
}

export function RelatedProducts({ currentHandle }: RelatedProductsProps) {
  const t = useTranslations('product.related');
  const { products, loading } = useProducts(8);

  const related = useMemo(() => {
    return products
      .filter((p) => p.handle !== currentHandle)
      .slice(0, 4);
  }, [products, currentHandle]);

  if (loading || related.length === 0) {
    return null;
  }

  return (
    <section className="mt-20 sm:mt-28 pt-16 sm:pt-20 border-t border-caramel/20">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        viewAllHref={pageConfig.products}
        viewAllLabel={t('viewAll')}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((product) => (
          <Card
            key={product.id}
            aspectRatio="3/4"
            caption={{
              title: product.title,
              price: product.variants.edges[0]?.node.price.amount,
              availableForSale: product.availableForSale,
            }}
            image={product.images.edges[0]?.node}
            href={pageConfig.product(product.handle)}
          />
        ))}
      </div>
    </section>
  );
}
