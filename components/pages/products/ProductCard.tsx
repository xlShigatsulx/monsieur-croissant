import Link from 'next/link'
import Image from 'next/image'
import { pageConfig } from '@/config/pages.config'
import { formatPrice } from '@/lib/utils/format'
import { useMemo } from 'react'

interface ProductCardProps {
  product: {
    id: string
    title: string
    handle: string
    availableForSale: boolean
    priceRange: {
      minVariantPrice: {
        amount: string
        currencyCode: string
      }
    }
    images: {
      edges: {
        node: {
          url: string
          altText?: string | null
        }
      }[]
    }
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images.edges[0]?.node
  const price = product.priceRange.minVariantPrice

  const formattedPrice = useMemo(
    () => formatPrice(Number(price.amount), price.currencyCode),
    [price.amount, price.currencyCode]
  )

  return (
    <Link
      href={pageConfig.product(product.handle)}
      className='group flex flex-col'
    >
      <div className='aspect-[3/4] bg-caramel/5 rounded-2xl overflow-hidden mb-4'>
        {image ? (
          <Image
            src={image.url}
            alt={image.altText ?? product.title}
            width={400}
            height={533}
            className='w-full h-full object-cover
              group-hover:scale-105 transition-transform duration-700'
          />
        ) : (
          <div
            className='w-full h-full bg-caramel/10
            group-hover:bg-caramel/15 transition-colors duration-500'
          />
        )}
      </div>

      <div className='flex flex-col gap-1'>
        <h3
          className='font-cormorant italic text-lg text-mocha font-light
          group-hover:text-caramel transition-colors duration-300'
        >
          {product.title}
        </h3>
        <div className='flex items-center justify-between'>
          <span className='font-jost text-sm text-mocha/70'>
            {formattedPrice}
          </span>
          {!product.availableForSale && (
            <span
              className='font-jost text-[9px] tracking-[0.15em] uppercase
              text-mocha/30'
            >
              Немає в наявності
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
