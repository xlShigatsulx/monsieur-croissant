'use client';

import { useMemo, useRef } from 'react';
import { useCartData, useCartOptimistic } from '@/context/CartContext';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';
import { CartEmpty } from './CartEmpty';
import { CartSkeleton } from './CartSkeleton';
import { useTranslations } from 'next-intl';
import { ClearCartButton } from './ClearCartButton';

export function CartPage() {
  const t = useTranslations('cart');

  const { cart, cartLoading, cartId } = useCartData();
  const { optimisticLines } = useCartOptimistic();

  const lines = useMemo(
    () => cart?.lines?.edges?.map((edge) => edge.node) ?? [],
    [cart],
  );

  const visibleLines = useMemo(
    () =>
      lines.filter((line) => {
        const optimistic = optimisticLines[line.id];
        return optimistic === undefined || optimistic.quantity > 0;
      }),
    [lines, optimisticLines],
  );

  const summaryLinesRef = useRef<
    { lineId: string; quantity: number; unitPrice: number }[]
  >([]);

  const summaryLines = useMemo(() => {
    const next = lines.map((line) => {
      const variant = line.merchandise;
      const unitPrice =
        variant.__typename === 'ProductVariant'
          ? Number(variant.price.amount)
          : 0;
      return { lineId: line.id, quantity: line.quantity, unitPrice };
    });

    const prev = summaryLinesRef.current;
    const changed =
      next.length !== prev.length ||
      next.some(
        (item, i) =>
          item.lineId !== prev[i]?.lineId ||
          item.quantity !== prev[i]?.quantity ||
          item.unitPrice !== prev[i]?.unitPrice,
      );

    if (changed) summaryLinesRef.current = next;
    return summaryLinesRef.current;
  }, [lines]);

  if (cartLoading && !cart) return <CartSkeleton />;
  if (!cartId || lines.length === 0) return <CartEmpty />;

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="font-cormorant italic text-4xl sm:text-5xl text-mocha font-light mb-6">
          {t('title')}
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 flex flex-col gap-6">
            {visibleLines.map((line) => {
              const variant = line.merchandise;
              if (variant.__typename !== 'ProductVariant') return null;
              return (
                <CartItem
                  key={line.id}
                  lineId={line.id}
                  title={variant.product.title}
                  variantTitle={variant.title}
                  price={variant.price.amount}
                  currencyCode={variant.price.currencyCode}
                  quantity={line.quantity}
                  image={variant.product.images.edges[0]?.node}
                  handle={variant.product.handle}
                />
              );
            })}
          </div>

          <div className="lg:w-72">
            <div className="lg:sticky lg:top-24">
              <CartSummary
                lines={summaryLines}
                currencyCode={cart?.cost.totalAmount.currencyCode ?? 'UAH'}
                checkoutUrl={cart?.checkoutUrl ?? ''}
              />
              <div className="mt-4 flex justify-center">
                <ClearCartButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
