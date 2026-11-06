'use client';

import { Link } from '@/i18n/navigation';
import { useProductByHandle } from '@/hooks/useProductByHandle';
import { ProductGallery } from './ProductGallery';
import { ProductInfo } from './ProductInfo';
import { ProductCraftsmanship } from './ProductCraftsmanship';
import { RelatedProducts } from './RelatedProducts';
import { ProductAtmosphereBanner } from './ProductAtmosphereBanner';
import { ProductPageSkeleton } from './ProductPageSkeleton';
import { pageConfig } from '@/config/pages.config';
import { NotFound } from '@/components/ui/NotFound';
import { useTranslations } from 'next-intl';

interface ProductPageProps {
  handle: string;
}

export function ProductPage({ handle }: ProductPageProps) {
  const t = useTranslations('product');

  const { product, images, variants, loading } = useProductByHandle(handle);

  if (loading && !product) return <ProductPageSkeleton />;

  if (!product)
    return (
      <NotFound
        title={t('notFound.title')}
        backHref={pageConfig.products}
        backLabel={t('notFound.link')}
      />
    );

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumbs"
          className="font-jost text-xs tracking-[0.15em] uppercase text-mocha/70 font-medium mb-8"
        >
          <Link
            href={pageConfig.products}
            className="hover:text-caramel transition-colors duration-300"
          >
            {t('breadcrumb')}
          </Link>
          <span className="mx-2 text-mocha/40">/</span>
          <span className="text-mocha">{product.title}</span>
        </nav>

        {/* Main Product Showcase */}
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16 items-start">
          <div className="w-full lg:w-1/2">
            <ProductGallery images={images} title={product.title} />
          </div>
          <div className="w-full lg:w-1/2">
            <ProductInfo
              title={product.title}
              description={product.description}
              variants={variants}
            />
          </div>
        </div>

        {/* Craftsmanship & Artisan Standards */}
        <ProductCraftsmanship />

        {/* Related Bakery Products */}
        <RelatedProducts currentHandle={handle} />

        {/* Atmospheric Bakery Invitation Banner */}
        <ProductAtmosphereBanner />
      </div>
    </div>
  );
}
