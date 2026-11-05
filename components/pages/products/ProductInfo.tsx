'use client';

import { useState, useCallback, useMemo } from 'react';
import { useCartActions, useCartData } from '@/context/CartContext';
import { VariantSelector } from './VariantSelector';
import { ProductTrustBadges } from './ProductTrustBadges';
import { ProductDetailsAccordion } from './ProductDetailsAccordion';
import { formatPrice } from '@/lib/utils/format';
import { useLocale, useTranslations } from 'next-intl';

interface Variant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: {
    amount: string;
    currencyCode: string;
  };
  selectedOptions: {
    name: string;
    value: string;
  }[];
}

interface ProductInfoProps {
  title: string;
  description?: string | null;
  variants: Variant[];
}

export function ProductInfo({
  title,
  description,
  variants,
}: ProductInfoProps) {
  const locale = useLocale();
  const t = useTranslations('product');

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    variants[0]?.id ?? null,
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCartActions();
  const { isLoading } = useCartData();

  const selectedVariant = useMemo(
    () => variants.find((v) => v.id === selectedVariantId) ?? variants[0],
    [variants, selectedVariantId],
  );

  const formattedPrice = useMemo(() => {
    if (!selectedVariant) return null;
    return formatPrice(
      Number(selectedVariant.price.amount),
      selectedVariant.price.currencyCode,
      locale,
    );
  }, [selectedVariant, locale]);

  const handleDecrement = useCallback(() => {
    setQuantity((q) => Math.max(1, q - 1));
  }, []);

  const handleIncrement = useCallback(() => {
    setQuantity((q) => q + 1);
  }, []);

  const handleAddToCart = useCallback(async () => {
    if (!selectedVariantId) return;
    await addToCart(selectedVariantId, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }, [selectedVariantId, quantity, addToCart]);

  const buttonLabel = useMemo(() => {
    if (added) return t('cart.added');
    if (isLoading) return t('cart.adding');
    if (!selectedVariant?.availableForSale) return t('cart.unavailable');
    return t('cart.add');
  }, [added, isLoading, selectedVariant?.availableForSale, t]);

  const isInStock = selectedVariant?.availableForSale ?? true;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="font-jost text-xs uppercase tracking-[0.2em] font-medium text-caramel">
            {t('eyebrow')}
          </span>
          <span className="text-mocha/30">•</span>
          <div className="inline-flex items-center gap-1.5 text-xs font-jost text-mocha/70">
            <span className="text-amber-500">★</span>
            <span className="font-medium">{t('ratingBadge')}</span>
          </div>
        </div>

        <h1 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl text-mocha font-semibold mb-3 leading-tight">
          {title}
        </h1>

        <div className="flex items-center gap-4">
          {formattedPrice && (
            <p className="font-serif italic text-3xl text-caramel font-semibold">
              {formattedPrice}
            </p>
          )}

          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-jost font-medium tracking-wide ${
              isInStock
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isInStock ? 'bg-emerald-500' : 'bg-red-400'
              }`}
            />
            {isInStock ? t('inStock') : t('unavailable')}
          </span>
        </div>
      </div>

      {description && (
        <p className="font-jost text-sm sm:text-base text-mocha/80 leading-relaxed bg-white/40 p-4 rounded-2xl border border-caramel/10">
          {description}
        </p>
      )}

      <VariantSelector
        variants={variants}
        selectedVariantId={selectedVariantId}
        onSelect={setSelectedVariantId}
      />

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 border border-caramel/30 rounded-full px-4 py-2.5 bg-white/50">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={quantity <= 1}
              aria-label={t('decrease')}
              className="w-6 h-6 flex items-center justify-center
                text-mocha/60 hover:text-caramel font-semibold
                disabled:opacity-30 disabled:cursor-not-allowed
                transition-colors duration-200 cursor-pointer"
            >
              −
            </button>
            <span className="font-jost text-sm text-mocha font-semibold w-5 text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              aria-label={t('increase')}
              className="w-6 h-6 flex items-center justify-center
                text-mocha/60 hover:text-caramel font-semibold
                transition-colors duration-200 cursor-pointer"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isLoading || !isInStock}
            className={`flex-1 font-jost text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold
              rounded-full py-4 transition-all duration-300 cursor-pointer shadow-md
              ${
                added
                  ? 'bg-emerald-700 text-white'
                  : 'bg-caramel text-cream hover:bg-caramel/90 hover:shadow-lg active:scale-98'
              }
              disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {buttonLabel}
          </button>
        </div>

        <p className="text-center font-jost text-xs text-mocha/70 flex items-center justify-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-caramel">
            <rect x="1" y="3" width="15" height="13" />
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
          {t('freeShippingNote')}
        </p>
      </div>

      <ProductTrustBadges />

      <ProductDetailsAccordion />
    </div>
  );
}
