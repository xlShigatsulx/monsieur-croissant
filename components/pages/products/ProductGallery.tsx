'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface GalleryImage {
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
}

interface ProductGalleryProps {
  images: GalleryImage[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const t = useTranslations('product');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];

  if (images.length === 0) {
    return <div className="aspect-square bg-caramel/10 rounded-3xl" />;
  }

  return (
    <div className="flex flex-col gap-4 lg:sticky lg:top-24">
      <div className="relative aspect-square bg-caramel/5 rounded-3xl overflow-hidden border border-caramel/15 shadow-xl group">
        <Image
          src={selectedImage.url}
          alt={selectedImage.altText ?? title}
          width={selectedImage.width ?? 700}
          height={selectedImage.height ?? 700}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />

        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-mocha/80 backdrop-blur-md text-cream text-[11px] font-jost font-semibold uppercase tracking-[0.15em] shadow-md border border-cream/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t('freshBadge')}
          </span>
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`shrink-0 w-20 h-20 rounded-2xl overflow-hidden
                border-2 transition-all duration-200 cursor-pointer shadow-sm
                ${
                  index === selectedIndex
                    ? 'border-caramel ring-2 ring-caramel/30 scale-102'
                    : 'border-transparent opacity-60 hover:opacity-100 hover:scale-102'
                }`}
            >
              <Image
                src={image.url}
                alt={image.altText ?? `${title} ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
