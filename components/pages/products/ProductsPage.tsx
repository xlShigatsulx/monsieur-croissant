'use client';

import { useState, useMemo } from 'react';
import { ProductsSkeleton } from './ProductsSkeleton';
import { Card } from '@/components/ui/Card';
import { ProductFilterBar } from '@/components/ui/ProductFilterBar';
import { ProductFilterEmpty } from '@/components/ui/ProductFilterEmpty';
import { pageConfig } from '@/config/pages.config';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useProducts } from '@/hooks/useProducts';
import { useCollections } from '@/hooks/useCollections';

const PRODUCTS_COUNT = 24;

export function ProductsPage() {
  const t = useTranslations('products');
  const { products, loading, hasNextPage, loadMore } =
    useProducts(PRODUCTS_COUNT);
  const { collections } = useCollections();

  // Filter and sort states
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let list = [...products];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    // In-stock filter
    if (inStockOnly) {
      list = list.filter((p) => p.availableForSale);
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => {
        const pA = parseFloat(a.variants.edges[0]?.node.price.amount ?? '0');
        const pB = parseFloat(b.variants.edges[0]?.node.price.amount ?? '0');
        return pA - pB;
      });
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => {
        const pA = parseFloat(a.variants.edges[0]?.node.price.amount ?? '0');
        const pB = parseFloat(b.variants.edges[0]?.node.price.amount ?? '0');
        return pB - pA;
      });
    } else if (sortBy === 'title-asc') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [products, search, inStockOnly, sortBy]);

  const handleResetFilters = () => {
    setSearch('');
    setSortBy('default');
    setInStockOnly(false);
  };

  if (loading && products.length === 0) return <ProductsSkeleton />;

  if (products.length === 0)
    return (
      <div className="text-center py-24">
        <p className="font-serif italic text-3xl text-mocha/70 font-semibold">
          {t('empty')}
        </p>
      </div>
    );

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
        {/* Page Header */}
        <div className="mb-8 sm:mb-10 text-center sm:text-left">
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
            <div className="flex items-center gap-2 self-center sm:self-auto">
              <span className="font-jost text-xs font-semibold text-caramel bg-caramel/10 border border-caramel/20 px-3.5 py-1.5 rounded-full whitespace-nowrap">
                {products.length} {products.length === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>

          {/* Bakery Quality Badges */}
          <div className="flex items-center gap-3 sm:gap-6 mt-6 pt-6 border-t border-caramel/15 flex-wrap justify-center sm:justify-start">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-mocha/70">
              <span className="text-caramel">🥐</span> {t('badges.fresh')}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-mocha/70">
              <span className="text-caramel">🧈</span> {t('badges.butter')}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-mocha/70">
              <span className="text-caramel">🥖</span> {t('badges.sourdough')}
            </span>
          </div>
        </div>

        {/* Category Pills Navigation */}
        {collections.length > 0 && (
          <div className="mb-6 overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center gap-2 min-w-max">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-mocha text-cream shadow-xs cursor-default">
                {t('allCategories')}
              </span>
              {collections.map((col) => (
                <Link
                  key={col.id}
                  href={pageConfig.collection(col.handle)}
                  className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-white/80 text-mocha/70 border border-caramel/20 hover:border-caramel hover:text-mocha transition-all duration-200"
                >
                  {col.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Filter and Sort Bar */}
        <ProductFilterBar
          search={search}
          onSearchChange={setSearch}
          sortBy={sortBy}
          onSortChange={setSortBy}
          inStockOnly={inStockOnly}
          onInStockChange={setInStockOnly}
          onReset={handleResetFilters}
          searchPlaceholder={t('filter.searchPlaceholder')}
          inStockLabel={t('filter.inStock')}
          sortLabel={t('filter.sortLabel')}
          sortOptions={{
            default: t('filter.sortDefault'),
            priceAsc: t('filter.sortPriceAsc'),
            priceDesc: t('filter.sortPriceDesc'),
            titleAsc: t('filter.sortTitleAsc'),
          }}
          showingCountText={t('filter.showingCount', {
            count: filteredAndSortedProducts.length,
            total: products.length,
          })}
          resetText={t('filter.reset')}
        />

        {/* Filtered Empty State */}
        {filteredAndSortedProducts.length === 0 ? (
          <ProductFilterEmpty
            title={t('filter.noResultsTitle')}
            subtitle={t('filter.noResultsSubtitle')}
            resetText={t('filter.reset')}
            onReset={handleResetFilters}
          />
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
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
        )}

        {/* Load More Button */}
        {hasNextPage && !search && (
          <div className="flex justify-center mt-12 sm:mt-16">
            <button
              onClick={loadMore}
              className="font-jost text-xs tracking-[0.2em] uppercase text-mocha bg-white/80 hover:bg-caramel hover:text-cream border border-caramel/30 rounded-full px-10 py-3.5 transition-all duration-300 shadow-xs cursor-pointer"
            >
              {t('loadMore')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
