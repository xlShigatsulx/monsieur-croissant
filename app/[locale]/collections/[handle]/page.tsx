import type { Metadata } from 'next';
import { CollectionPage } from '@/components/pages/collections/CollectionPage';
import { getCollectionMeta } from '@/lib/shopify/server';

interface CollectionPageProps {
  params: Promise<{ locale: string; handle: string }>;
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { locale, handle } = await params;
  const collection = await getCollectionMeta(handle, locale);

  if (!collection) {
    return {
      title: 'Колекція | Monsieur Croissant',
    };
  }

  const title = `${collection.title} | Monsieur Croissant`;
  const description =
    collection.description ||
    'Колекція крафтової випічки від пекарні Monsieur Croissant';
  const imageUrl = collection.image?.url;

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
              alt: collection.image?.altText ?? collection.title,
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

export default async function Page({ params }: CollectionPageProps) {
  const { handle } = await params;
  return <CollectionPage handle={handle} />;
}
