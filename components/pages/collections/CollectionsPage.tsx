'use client'

import { useGetCollectionsQuery } from '@/graphql/generated/graphql'
import { CollectionsSkeleton } from './CollectionsSkeleton'
import { useMemo } from 'react'
import { Card } from '@/components/ui/Card'
import { pageConfig } from '@/config/pages.config'

const COLLECTIONS_COUNT = 12

export function CollectionsPage() {
  const { data, loading } = useGetCollectionsQuery({
    variables: { first: COLLECTIONS_COUNT },
    fetchPolicy: 'cache-first',
  })

  const visibleCollections = useMemo(() => {
    if (!data?.collections?.edges) return []

    return data.collections.edges
      .map((edge) => edge.node)
      .filter((collection) => collection.metafield?.value !== 'true')
  }, [data])

  if (loading) return <CollectionsSkeleton />

  return (
    <div className='max-w-6xl mx-auto p-4 mb-16'>
      <h1 className='font-cormorant italic text-4xl sm:text-5xl text-mocha font-light mb-2'>
        Асортимент
      </h1>
      <p className='text-[11px] tracking-[0.2em] uppercase text-mocha/40 mb-5'>
        Оберіть категорію
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {visibleCollections.map((collection) => (
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
  )
}
