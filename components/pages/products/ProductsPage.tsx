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
        <p className="font-serif italic text-3xl text-mocha/70 font-semibold">
          {t('empty')}
        </p>
      </div>
    );

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
        {/* Page Header */}
        <div className="mb-10 sm:mb-14">
          <p className="font-jost text-xs uppercase tracking-[0.25em] text-caramel font-semibold mb-2">
            {t('eyebrow')}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif italic text-4xl sm:text-5xl text-mocha font-semibold">
                {t('title')}
              </h1>
              <p className="font-jost text-sm sm:text-base text-mocha/75 mt-2 max-w-xl">
                {t('subtitle')}
              </p>
            </div>
            <span className="self-start sm:self-auto font-jost text-xs font-medium text-caramel bg-caramel/10 px-3.5 py-1.5 rounded-full whitespace-nowrap">
              {products.length} {products.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <div className="w-16 h-px bg-caramel/30 mt-6" />
        </div>

        {/* Product Grid */}
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
          <div className="flex justify-center mt-12 sm:mt-16">
            <button
              onClick={loadMore}
              className="btn-outline font-jost"
            >
              {t('loadMore')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
