'use client'

import { useState } from 'react'
import Image from 'next/image'

interface GalleryImage {
  url: string
  altText?: string | null
  width?: number | null
  height?: number | null
}

interface ProductGalleryProps {
  images: GalleryImage[]
  title: string
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedImage = images[selectedIndex]

  if (images.length === 0) {
    return <div className='aspect-square bg-caramel/10 rounded-2xl' />
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='aspect-square bg-caramel/5 rounded-2xl overflow-hidden'>
        <Image
          src={selectedImage.url}
          alt={selectedImage.altText ?? title}
          width={selectedImage.width ?? 600}
          height={selectedImage.height ?? 600}
          className='w-full h-full object-cover'
          loading='eager'
        />
      </div>

      {images.length > 1 && (
        <div className='flex gap-3 overflow-x-auto pb-1'>
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden
                border-2 transition-all duration-200 cursor-pointer
                ${
                  index === selectedIndex
                    ? 'border-caramel'
                    : 'border-transparent opacity-50 hover:opacity-100'
                }`}
            >
              <Image
                src={image.url}
                alt={image.altText ?? `${title} ${index + 1}`}
                width={64}
                height={64}
                className='w-full h-full object-cover'
                loading='eager'
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
