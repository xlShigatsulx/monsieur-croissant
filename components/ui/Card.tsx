import Image from 'next/image'
import Link from 'next/link'
import { ImgCaption } from './ImgCaption'
import { pageConfig } from '@/config/pages.config'

interface CardImage {
  url: string
  altText?: string | null
  width?: number | null
  height?: number | null
}

interface CardCaption {
  title: string
  titleSize?: string
  description?: string | null
  price?: string
  availableForSale?: boolean
}

interface CardProps {
  href?: string
  image?: CardImage | null
  caption: CardCaption
  aspectRatio?: 'square' | '4/3' | '3/4' | '16/9'
  gradient?: boolean
  eager?: boolean
  className?: string
  children?: React.ReactNode
}

const aspectMap = {
  square: 'aspect-square',
  '4/3': 'aspect-[4/3]',
  '3/4': 'aspect-[3/4]',
  '16/9': 'aspect-[16/9]',
}

export function Card({
  href,
  image,
  caption,
  aspectRatio = '4/3',
  gradient = true,
  eager = true,
  className = '',
  children,
}: CardProps) {
  const content = (
    <>
      <div className={`${aspectMap[aspectRatio]} bg-caramel/5 overflow-hidden`}>
        {image ? (
          <Image
            src={image.url}
            alt={image.altText ?? caption.title}
            width={image.width ?? 600}
            height={image.height ?? 450}
            className='w-full h-full object-cover
              group-hover:scale-105 transition-transform duration-700'
            loading={eager ? 'eager' : 'lazy'}
          />
        ) : (
          <div
            className='w-full h-full bg-caramel/10
            group-hover:bg-caramel/15 transition-colors duration-500'
          />
        )}
      </div>

      {gradient && (
        <div
          className='absolute inset-0 bg-gradient-to-t
          from-mocha/60 via-mocha/10 to-transparent pointer-events-none'
        />
      )}

      <ImgCaption {...caption} />

      {children}
    </>
  )

  const baseClassName = `group relative overflow-hidden rounded-2xl
    border border-caramel/10 hover:border-caramel/30
    transition-all duration-500 ${className}`

  if (href) {
    return (
      <Link
        href={href}
        className={baseClassName}
      >
        {content}
      </Link>
    )
  }

  return <div className={baseClassName}>{content}</div>
}
