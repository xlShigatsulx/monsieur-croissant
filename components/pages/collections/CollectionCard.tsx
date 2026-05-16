import Link from 'next/link'
import Image from 'next/image'
import { pageConfig } from '@/config/pages.config'

interface CollectionCardProps {
  handle: string
  title: string
  description?: string | null
  image?: {
    url: string
    altText?: string | null
    width?: number | null
    height?: number | null
  } | null
}

export function CollectionCard({
  handle,
  title,
  description,
  image,
}: CollectionCardProps) {
  return (
    <Link
      href={pageConfig.collection(handle)}
      className='group relative overflow-hidden rounded-2xl
        border border-caramel/10 hover:border-caramel/30
        transition-all duration-500'
    >
      <div className='aspect-[4/3] bg-caramel/5 overflow-hidden'>
        {image ? (
          <Image
            src={image.url}
            alt={image.altText ?? title}
            width={image.width ?? 600}
            height={image.height ?? 450}
            className='w-full h-full object-cover
              group-hover:scale-105 transition-transform duration-700'
            loading='eager'
          />
        ) : (
          <div
            className='w-full h-full bg-caramel/10
            group-hover:bg-caramel/15 transition-colors duration-500'
          />
        )}
      </div>

      <div className='absolute inset-0 bg-gradient-to-t from-mocha/60 via-mocha/10 to-transparent' />

      <div className='absolute bottom-0 left-0 right-0 p-6'>
        <h2 className='font-cormorant italic text-2xl text-cream font-light mb-1'>
          {title}
        </h2>
        {description && (
          <p
            className='font-jost text-[10px] tracking-[0.15em] uppercase
            text-cream/60 line-clamp-1'
          >
            {description}
          </p>
        )}
      </div>
    </Link>
  )
}
