'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { CollectionPageSkeleton } from './CollectionPageSkeleton';
import { CollectionEmpty } from './CollectionEmpty';
import { pageConfig } from '@/config/pages.config';
import { Card } from '@/components/ui/Card';
import { ProductFilterBar } from '@/components/ui/ProductFilterBar';
import { ProductFilterEmpty } from '@/components/ui/ProductFilterEmpty';
import { NotFound } from '@/components/ui/NotFound';
import { useTranslations } from 'next-intl';
import { useCollectionByHandle } from '@/hooks/useCollectionByHandle';
import { useCollections } from '@/hooks/useCollections';

interface CollectionPageProps {
  handle: string;
}

export function CollectionPage({ handle }: CollectionPageProps) {
  const t = useTranslations('collection');
  const { collection, products, loading, hasNextPage, loadMore } =
    useCollectionByHandle(handle);
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

  const textShadow = '0 1px 8px rgba(0,0,0,0.6), 0 2px 24px rgba(0,0,0,0.4)';

  if (loading && !collection) return <CollectionPageSkeleton />;
  if (!collection)
    return (
      <NotFound
        title={t('notFound.title')}
        backHref={pageConfig.collections}
        backLabel={t('notFound.link')}
      />
    );
  if (products.length === 0) return <CollectionEmpty />;

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-60 sm:h-80 md:h-96 overflow-hidden">
        {collection.image ? (
          <Image
            src={collection.image.url}
            alt={collection.image.altText ?? collection.title}
            fill
            sizes="100vw"
            className="object-cover"
            loading="eager"
            priority
          />
        ) : (
          <div className="w-full h-full bg-caramel/15" />
        )}

        {/* Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-mocha/90 via-mocha/40 to-mocha/20" />

        <div className="absolute inset-0 max-w-6xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-8 sm:pb-12">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="font-jost text-[11px] tracking-[0.2em] uppercase text-cream/80 mb-3 flex items-center gap-2"
            style={{ textShadow }}
          >
            <Link
              href="/"
              className="hover:text-cream transition-colors duration-200"
            >
              {t('home')}
            </Link>
            <span>/</span>
            <Link
              href={pageConfig.collections}
              className="hover:text-cream transition-colors duration-200"
            >
              {t('breadcrumb')}
            </Link>
            <span>/</span>
            <span className="text-amber-200 font-medium">
              {collection.title}
            </span>
          </nav>

          {/* Badge */}
          <div className="mb-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-cream/20 text-cream backdrop-blur-md border border-cream/20">
              {t('categoryBadge')}
            </span>
          </div>

          {/* Collection Title */}
          <h1
            className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-cream font-semibold mb-3"
            style={{ textShadow }}
          >
            {collection.title}
          </h1>

          {/* Collection Description */}
          {collection.description && (
            <p
              className="font-jost text-sm sm:text-base text-cream/90 max-w-2xl leading-relaxed"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
            >
              {collection.description}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Sibling Categories Pills Navigation */}
        <div className="mb-8 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            <Link
              href={pageConfig.collections}
              className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-white/80 text-mocha/70 border border-caramel/20 hover:border-caramel hover:text-mocha transition-all duration-200"
            >
              ← {t('allCollections')}
            </Link>
            <Link
              href={pageConfig.products}
              className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-white/80 text-mocha/70 border border-caramel/20 hover:border-caramel hover:text-mocha transition-all duration-200"
            >
              {t('allProducts')}
            </Link>
            {collections.map((col) => {
              const isActive = col.handle === handle;
              return isActive ? (
                <span
                  key={col.id}
                  className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-mocha text-cream shadow-xs cursor-default"
                >
                  {col.title}
                </span>
              ) : (
                <Link
                  key={col.id}
                  href={pageConfig.collection(col.handle)}
                  className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-white/80 text-mocha/70 border border-caramel/20 hover:border-caramel hover:text-mocha transition-all duration-200"
                >
                  {col.title}
                </Link>
              );
            })}
          </div>
        </div>

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
          /* Products Grid */
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
          <div className="flex justify-center mt-12">
            <button
              onClick={loadMore}
              className="font-jost text-xs tracking-[0.2em] uppercase text-mocha bg-white/80 hover:bg-caramel hover:text-cream border border-caramel/30 rounded-full px-10 py-3.5 transition-all duration-300 shadow-xs cursor-pointer"
            >
              {t('loadMore')}
            </button>
          </div>
        )}

        {/* Bottom Switcher / Explore More */}
        <div className="mt-16 pt-10 border-t border-caramel/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href={pageConfig.collections}
            className="text-xs font-semibold uppercase tracking-[0.14em] text-caramel hover:text-mocha transition-colors"
          >
            ← {t('browseOther')}
          </Link>
          <Link
            href={pageConfig.products}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-mocha text-cream text-xs font-medium uppercase tracking-[0.12em] hover:bg-caramel transition-all duration-300"
          >
            {t('allProductsCta')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
