import type { Metadata } from 'next';
import { ProductPage } from '@/components/pages/products/ProductPage';
import { getProductMeta } from '@/lib/shopify/server';

interface ProductPageProps {
  params: Promise<{ locale: string; handle: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { locale, handle } = await params;
  const product = await getProductMeta(handle, locale);

  if (!product) {
    return {
      title: 'Товар | Monsieur Croissant',
    };
  }

  const title = `${product.title} | Monsieur Croissant`;
  const description =
    product.description ||
    'Свіжа французька випічка та десерти від пекарні Monsieur Croissant';
  const imageUrl = product.featuredImage?.url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: product.featuredImage?.altText ?? product.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function Page({ params }: ProductPageProps) {
  const { locale, handle } = await params;
  const product = await getProductMeta(handle, locale);

  const jsonLd = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        description: product.description,
        image: product.featuredImage?.url,
        offers: {
          '@type': 'Offer',
          price: product.priceRange.minVariantPrice.amount,
          priceCurrency: product.priceRange.minVariantPrice.currencyCode,
          availability: product.availableForSale
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductPage handle={handle} />
    </>
  );
}
