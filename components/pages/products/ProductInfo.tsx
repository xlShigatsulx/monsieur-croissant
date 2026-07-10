'use client';

import { useState, useCallback, useMemo } from 'react';
import { useCartActions, useCartData } from '@/context/CartContext';
import { VariantSelector } from './VariantSelector';
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

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-cormorant italic text-4xl sm:text-5xl text-mocha font-light mb-2">
          {title}
        </h1>
        {formattedPrice && (
          <p className="font-cormorant italic text-2xl text-caramel">
            {formattedPrice}
          </p>
        )}
      </div>

      {description && (
        <p className="font-jost text-sm text-mocha/60 leading-relaxed">
          {description}
        </p>
      )}

      <VariantSelector
        variants={variants}
        selectedVariantId={selectedVariantId}
        onSelect={setSelectedVariantId}
      />

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 border border-caramel/30 rounded-full px-4 py-2">
          <button
            onClick={handleDecrement}
            disabled={quantity <= 1}
            className="w-5 h-5 flex items-center justify-center
              text-mocha/60 hover:text-caramel
              disabled:opacity-30 disabled:cursor-not-allowed
              transition-colors duration-200 cursor-pointer"
          >
            −
          </button>
          <span className="font-jost text-sm text-mocha w-4 text-center">
            {quantity}
          </span>
          <button
            onClick={handleIncrement}
            className="w-5 h-5 flex items-center justify-center
              text-mocha/60 hover:text-caramel
              transition-colors duration-200 cursor-pointer"
          >
            +
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isLoading || !selectedVariant?.availableForSale}
          className={`flex-1 font-jost text-[11px] tracking-[0.2em] uppercase
            rounded-full py-3.5 transition-all duration-300 cursor-pointer
            ${added ? 'bg-mocha/80 text-cream' : 'bg-caramel text-cream hover:bg-caramel/90'}
            disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
