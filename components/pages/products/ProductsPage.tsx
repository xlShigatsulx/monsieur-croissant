'use client'

import { useGetProductsQuery } from '@/graphql/generated/graphql'
import { ProductsSkeleton } from './ProductsSkeleton'
import { Card } from '@/components/ui/Card'
import { pageConfig } from '@/config/pages.config'

const PRODUCTS_COUNT = 12

export function ProductsPage() {
  const { data, loading, fetchMore } = useGetProductsQuery({
    variables: { first: PRODUCTS_COUNT },
    fetchPolicy: 'cache-first',
  })

  const products = data?.products?.edges?.map((edge) => edge.node) ?? []
  const pageInfo = data?.products?.pageInfo

  if (loading) return <ProductsSkeleton />

  const loadMore = () => {
    if (!pageInfo?.hasNextPage) return
    fetchMore({
      variables: {
        first: PRODUCTS_COUNT,
        after: pageInfo.endCursor,
      },
    })
  }

  if (products.length === 0)
    return (
      <div className='text-center py-24'>
        <p className='font-cormorant italic text-3xl text-mocha/30 font-light'>
          Товарів немає
        </p>
      </div>
    )

  return (
    <div className='max-w-6xl mx-auto p-4 mb-16'>
      <h1 className='font-cormorant italic text-4xl sm:text-5xl text-mocha font-light mb-12'>
        Всі вироби
      </h1>

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

      {pageInfo?.hasNextPage && (
        <div className='flex justify-center mt-12'>
          <button
            onClick={loadMore}
            className='font-jost text-[11px] tracking-[0.2em] uppercase
                    text-caramel border border-caramel/40 hover:border-caramel
                    hover:bg-caramel/10 rounded-full px-10 py-3
                    transition-all duration-300 cursor-pointer'
          >
            Завантажити ще
          </button>
        </div>
      )}
    </div>
  )
}
