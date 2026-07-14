'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils/format';
import { pageConfig } from '@/config/pages.config';
import { useCartActions } from '@/context/CartContext';
import { useTranslations } from 'next-intl';
import { useState, useCallback } from 'react';
import { BestsellerProduct } from '@/types/bestsellersSection';

export function BestsellerCard({
  product,
  locale,
}: {
  product: BestsellerProduct;
  locale: string;
}) {
  const t = useTranslations('home.bestsellers');
  const { addToCart } = useCartActions();
  const [status, setStatus] = useState<'idle' | 'adding' | 'added'>('idle');

  const image = product.images?.edges[0]?.node;
  const variant = product.variants?.edges[0]?.node;

  const handleQuickAdd = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!variant || status === 'adding') return;

      setStatus('adding');
      try {
        await addToCart(variant.id, 1);
        setStatus('added');
        setTimeout(() => setStatus('idle'), 1500);
      } catch {
        setStatus('idle');
      }
    },
    [addToCart, variant, status],
  );

  return (
    <Link href={pageConfig.product(product.handle)} className="group">
      <div
        className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-cream mb-3
          shadow-[0_4px_20px_rgba(58,35,24,0.06)]
          group-hover:shadow-[0_12px_40px_rgba(58,35,24,0.1)]
          transition-shadow duration-300"
      >
        {image ? (
          <Image
            src={image.url}
            alt={image.altText ?? product.title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-caramel/10" />
        )}

        {product.availableForSale === false && (
          <div
            className="absolute top-3 left-3 bg-mocha/90 text-cream text-[10px]
              uppercase tracking-wide px-2.5 py-1 rounded-md"
          >
            {t('soldOut')}
          </div>
        )}

        {product.availableForSale !== false && variant && (
          <button
            type="button"
            onClick={handleQuickAdd}
            aria-label={t('quickAdd')}
            disabled={status === 'adding'}
            className="absolute bottom-3 right-3 w-9 h-9 sm:w-10 sm:h-10 rounded-full
              bg-mocha text-cream flex items-center justify-center
              opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
              max-sm:opacity-100 max-sm:translate-y-0
              transition-all duration-300 disabled:opacity-60"
          >
            {status === 'added' ? (
              <CheckIcon />
            ) : status === 'adding' ? (
              <SpinnerIcon />
            ) : (
              <PlusIcon />
            )}
          </button>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <h3 className="text-mocha text-sm sm:text-base font-medium truncate">
          {product.title}
        </h3>
        <span
          aria-hidden="true"
          className="flex-1 border-b border-dotted border-caramel/40 -translate-y-0.75"
        />
        {variant && (
          <span className="text-caramel text-sm sm:text-base whitespace-nowrap">
            {formatPrice(
              Number(variant.price.amount),
              variant.price.currencyCode,
              locale,
            )}
          </span>
        )}
      </div>
    </Link>
  );
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="animate-spin"
    >
      <path d="M12 3a9 9 0 1 0 9 9" strokeLinecap="round" />
    </svg>
  );
}
