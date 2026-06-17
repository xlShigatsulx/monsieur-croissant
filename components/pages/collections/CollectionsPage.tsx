'use client'

import { CollectionsSkeleton } from './CollectionsSkeleton'
import { Card } from '@/components/ui/Card'
import { pageConfig } from '@/config/pages.config'
import { useTranslations } from 'next-intl'
import { useCollections } from '@/hooks/useCollections'

export function CollectionsPage() {
  const t = useTranslations('collections')
  const { collections, loading } = useCollections()

  if (loading) return <CollectionsSkeleton />

  return (
    <div className='min-h-screen'>
      <div className='max-w-6xl mx-auto p-4 mb-16'>
        <h1 className='font-cormorant italic text-4xl sm:text-5xl text-mocha font-light mb-2'>
          {t('title')}
        </h1>
        <p className='text-[11px] tracking-[0.2em] uppercase text-mocha/40 mb-5'>
          {t('subtitle')}
        </p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {collections.map((collection) => (
            <Card
              key={collection.id}
              href={pageConfig.collection(collection.handle)}
              caption={{
                title: collection.title,
                titleSize: 'text-2xl sm:text-4xl',
                description: collection.description,
              }}
              image={collection.image}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
