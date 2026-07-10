'use client';

import { ProductsSkeleton } from './ProductsSkeleton';
import { Card } from '@/components/ui/Card';
import { pageConfig } from '@/config/pages.config';
import { useTranslations } from 'next-intl';
import { useProducts } from '@/hooks/useProducts';

const PRODUCTS_COUNT = 12;

export function ProductsPage() {
  const t = useTranslations('products');

  const { products, loading, hasNextPage, loadMore } =
    useProducts(PRODUCTS_COUNT);

  if (loading) return <ProductsSkeleton />;

  if (products.length === 0)
    return (
      <div className="text-center py-24">
        <p className="font-cormorant italic text-3xl text-mocha/30 font-light">
          {t('empty')}
        </p>
      </div>
    );

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto p-4 mb-16">
        <h1 className="font-cormorant italic text-4xl sm:text-5xl text-mocha font-light mb-12">
          {t('title')}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
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

        {hasNextPage && (
          <div className="flex justify-center mt-12">
            <button onClick={loadMore} className="...">
              {t('loadMore')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
