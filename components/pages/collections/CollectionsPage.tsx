'use client'

import { useGetCollectionsQuery } from '@/graphql/generated/graphql'
import { CollectionCard } from './CollectionCard'
import { CollectionsSkeleton } from './CollectionsSkeleton'

const COLLECTIONS_COUNT = 12

export function CollectionsPage() {
  const { data, loading } = useGetCollectionsQuery({
    variables: { first: COLLECTIONS_COUNT },
    fetchPolicy: 'cache-first',
  })

  const collections = data?.collections?.edges?.map((edge) => edge.node) ?? []

  if (loading) return <CollectionsSkeleton />

  return (
    <main className='min-h-screen bg-cream'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24'>
        <h1 className='font-cormorant italic text-4xl sm:text-5xl text-mocha font-light mb-3'>
          Асортимент
        </h1>
        <p className='font-jost text-[11px] tracking-[0.2em] uppercase text-mocha/40 mb-12'>
          Оберіть категорію
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              handle={collection.handle}
              title={collection.title}
              description={collection.description}
              image={collection.image}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
