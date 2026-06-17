'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CollectionPageSkeleton } from './CollectionPageSkeleton'
import { CollectionEmpty } from './CollectionEmpty'
import { pageConfig } from '@/config/pages.config'
import { Card } from '@/components/ui/Card'
import { NotFound } from '@/components/ui/NotFound'
import { useTranslations } from 'next-intl'
import { useCollectionByHandle } from '@/hooks/useCollectionByHandle'

interface CollectionPageProps {
  handle: string
}

export function CollectionPage({ handle }: CollectionPageProps) {
  const t = useTranslations('collection')
  const { collection, products, loading, hasNextPage, loadMore } =
    useCollectionByHandle(handle)
  const textShadow = '0 1px 8px rgba(0,0,0,0.6), 0 2px 24px rgba(0,0,0,0.4)'

  if (loading) return <CollectionPageSkeleton />
  if (!collection)
    return (
      <NotFound
        title={t('notFound.title')}
        backHref={pageConfig.collections}
        backLabel={t('notFound.link')}
      />
    )
  if (products.length === 0) return <CollectionEmpty />

  return (
    <div className='min-h-screen'>
      <div className='relative h-48 sm:h-64 overflow-hidden'>
        {collection.image ? (
          <Image
            src={collection.image.url}
            alt={collection.image.altText ?? collection.title}
            fill
            className='object-cover'
            loading='eager'
          />
        ) : (
          <div className='w-full h-full bg-caramel/10' />
        )}
        <div className='absolute inset-0 bg-linear-to-t from-mocha/50 to-transparent' />
        <div className='absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-4 sm:px-6 pb-8'>
          <p
            className='font-jost text-[10px] tracking-[0.2em] uppercase text-cream/85 mb-1'
            style={{ textShadow }}
          >
            <Link
              href={pageConfig.collections}
              className='hover:text-cream transition-colors duration-300'
            >
              {t('breadcrumb')}
            </Link>
            {' / '}
            {collection.title}
          </p>
          <h1
            className='font-cormorant italic text-3xl sm:text-5xl text-cream font-light'
            style={{ textShadow }}
          >
            {collection.title}
          </h1>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16'>
        {collection.description && (
          <p className='font-jost text-sm text-mocha/60 mb-12 max-w-xl leading-relaxed'>
            {collection.description}
          </p>
        )}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {products.map((product) => (
            <Card
              key={product.id}
              aspectRatio='3/4'
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
          <div className='flex justify-center mt-12'>
            <button
              onClick={loadMore}
              className='font-jost text-[11px] tracking-[0.2em] uppercase text-caramel border border-caramel/40 hover:border-caramel hover:bg-caramel/10 rounded-full px-10 py-3 transition-all duration-300 cursor-pointer'
            >
              {t('loadMore')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
