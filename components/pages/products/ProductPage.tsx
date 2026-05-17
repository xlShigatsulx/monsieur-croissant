'use client'

import Link from 'next/link'
import { useGetProductByHandleQuery } from '@/graphql/generated/graphql'
import { ProductGallery } from './ProductGallery'
import { ProductInfo } from './ProductInfo'
import { ProductPageSkeleton } from './ProductPageSkeleton'
import { pageConfig } from '@/config/pages.config'
import { NotFound } from '@/components/ui/NotFound'

interface ProductPageProps {
  handle: string
}

export function ProductPage({ handle }: ProductPageProps) {
  const { data, loading } = useGetProductByHandleQuery({
    variables: { handle },
    fetchPolicy: 'cache-first',
  })

  if (loading) return <ProductPageSkeleton />

  const product = data?.product
  if (!product)
    return (
      <NotFound
        title='Товар не знайдено'
        backHref={pageConfig.products}
        backLabel='До асортименту'
      />
    )

  const images = product.images.edges.map((edge) => edge.node)
  const variants = product.variants.edges.map((edge) => edge.node)

  return (
    <main className='min-h-screen bg-cream'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16'>
        <p className='font-jost text-[10px] tracking-[0.2em] uppercase text-mocha/40 mb-8'>
          <Link
            href={pageConfig.products}
            className='hover:text-caramel transition-colors duration-300'
          >
            Всі вироби
          </Link>
          {' / '}
          {product.title}
        </p>

        <div className='flex flex-col lg:flex-row gap-12 xl:gap-16'>
          <div className='lg:w-1/2'>
            <ProductGallery
              images={images}
              title={product.title}
            />
          </div>

          <div className='lg:w-1/2'>
            <ProductInfo
              title={product.title}
              description={product.description}
              variants={variants}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
