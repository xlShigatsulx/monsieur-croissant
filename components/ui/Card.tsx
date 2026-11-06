'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

interface CardImage {
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
}

interface CardCaption {
  title: string;
  titleSize?: string;
  description?: string | null;
  price?: string;
  availableForSale?: boolean;
}

interface CardProps {
  href?: string;
  image?: CardImage | null;
  caption: CardCaption;
  aspectRatio?: 'square' | '4/3' | '3/4' | '16/9';
  gradient?: boolean;
  eager?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const aspectMap = {
  square: 'aspect-square',
  '4/3': 'aspect-[4/3]',
  '3/4': 'aspect-[3/4]',
  '16/9': 'aspect-[16/9]',
};

export function Card({
  href,
  image,
  caption,
  aspectRatio = '3/4',
  eager = false,
  className = '',
  children,
}: CardProps) {
  const t = useTranslations('product');

  const cardInner = (
    <>
      {/* Top: Image Container */}
      <div
        className={`relative ${aspectMap[aspectRatio]} w-full rounded-xl sm:rounded-2xl overflow-hidden bg-caramel/5`}
      >
        {image ? (
          <Image
            src={image.url}
            alt={image.altText ?? caption.title}
            width={image.width ?? 600}
            height={image.height ?? 800}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading={eager ? 'eager' : 'lazy'}
          />
        ) : (
          <div className="w-full h-full bg-caramel/10 flex items-center justify-center">
            <span className="text-2xl">🥐</span>
          </div>
        )}

        {/* Availability Badge */}
        {caption.availableForSale === false ? (
          <div className="absolute top-2.5 left-2.5 z-10 px-2.5 py-1 rounded-full bg-mocha/90 text-cream text-[10px] font-sans font-medium uppercase tracking-wider backdrop-blur-xs shadow-xs">
            {t('cart.unavailable')}
          </div>
        ) : null}

        {/* Subtle hover arrow indicator */}
        <div className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-cream/95 backdrop-blur-sm text-mocha flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xs">
          <svg
            className="w-3.5 h-3.5 text-mocha"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>
      </div>

      {/* Bottom: Text, Price and Details below the image */}
      <div className="pt-3.5 pb-1 px-1 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          <h3 className="font-serif text-mocha text-base sm:text-lg font-semibold italic group-hover:text-caramel transition-colors line-clamp-1 leading-snug">
            {caption.title}
          </h3>
          {caption.description && (
            <p className="font-jost text-xs text-mocha/65 line-clamp-1 mt-1 leading-relaxed">
              {caption.description}
            </p>
          )}
        </div>

        {/* Price and status row */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-caramel/10">
          {caption.price ? (
            <span className="font-serif text-caramel font-semibold text-base sm:text-lg tracking-tight">
              {t('priceFrom', { price: caption.price })}
            </span>
          ) : (
            <span />
          )}

          <span className="text-[11px] font-jost uppercase tracking-wider text-mocha/50 group-hover:text-mocha font-medium transition-colors">
            {caption.availableForSale !== false
              ? t('inStock')
              : t('cart.unavailable')}
          </span>
        </div>
      </div>

      {children}
    </>
  );

  const baseClassName = `group relative flex flex-col rounded-2xl sm:rounded-3xl
    bg-white/80 border border-caramel/15 hover:border-caramel/40 hover:bg-white
    shadow-[0_4px_20px_rgba(58,35,24,0.04)] hover:shadow-[0_12px_32px_rgba(58,35,24,0.1)]
    hover:-translate-y-1 transition-all duration-300 overflow-hidden p-3 sm:p-3.5 ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClassName}>
        {cardInner}
      </Link>
    );
  }

  return <div className={baseClassName}>{cardInner}</div>;
}
