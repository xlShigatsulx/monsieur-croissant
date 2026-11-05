'use client';

import { memo, useMemo, useCallback } from 'react';
import { Link } from '@/i18n/navigation';
import { useCartOptimistic } from '@/context/CartContext';
import { pageConfig } from '@/config/pages.config';
import { formatPrice } from '@/lib/utils/format';
import { safeRedirectToCheckout } from '@/lib/utils/checkout';
import { useLocale, useTranslations } from 'next-intl';

interface CartLine {
  lineId: string;
  quantity: number;
  unitPrice: number;
}

interface CartSummaryProps {
  lines: CartLine[];
  currencyCode: string;
  checkoutUrl: string;
}

export const CartSummary = memo(function CartSummary({
  lines,
  currencyCode,
  checkoutUrl,
}: CartSummaryProps) {
  const t = useTranslations('cart.cartSummary');

  return (
    <div className="bg-white/60 rounded-2xl p-6 border border-caramel/10">
      <h2 className="font-serif italic text-2xl text-mocha font-semibold mb-6">
        {t('title')}
      </h2>
      <CartSummaryTotals lines={lines} currencyCode={currencyCode} />
      <CartSummaryActions checkoutUrl={checkoutUrl} />
    </div>
  );
});

const CartSummaryActions = memo(function CartSummaryActions({
  checkoutUrl,
}: {
  checkoutUrl: string;
}) {
  const handleCheckout = useCallback(() => {
    if (!checkoutUrl) return;
    safeRedirectToCheckout(checkoutUrl);
  }, [checkoutUrl]);

  const t = useTranslations('cart.cartSummary');

  return (
    <>
      <button
        type="button"
        onClick={handleCheckout}
        disabled={!checkoutUrl}
        className="w-full font-jost text-[11px] tracking-[0.2em] uppercase
          bg-caramel text-cream hover:bg-caramel/90
          rounded-full py-3.5 transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {t('checkoutBtn')}
      </button>
      <Link
        href={pageConfig.products}
        className="block text-center font-jost text-xs tracking-[0.15em]
          uppercase text-mocha/70 hover:text-caramel mt-4 font-medium
          transition-colors duration-300"
      >
        {t('continueShopping')}
      </Link>
    </>
  );
});

const CartSummaryTotals = memo(function CartSummaryTotals({
  lines,
  currencyCode,
}: {
  lines: CartLine[];
  currencyCode: string;
}) {
  const locale = useLocale();
  const t = useTranslations('cart.cartSummary');

  const { optimisticLines } = useCartOptimistic();

  const subtotal = useMemo(
    () =>
      lines.reduce((sum, line) => {
        const optimistic = optimisticLines[line.lineId];
        const qty =
          optimistic !== undefined ? optimistic.quantity : line.quantity;
        return sum + line.unitPrice * qty;
      }, 0),
    [lines, optimisticLines],
  );

  const formattedSubtotal = useMemo(
    () => formatPrice(subtotal, currencyCode, locale),
    [subtotal, currencyCode, locale],
  );

  return (
    <div className="flex flex-col gap-3 mb-6">
      <div className="h-px bg-caramel/45" />
      <div className="flex items-center justify-between">
        <span className="font-jost text-[11px] tracking-[0.15em] uppercase text-mocha/80">
          {t('total')}
        </span>
        <span className="font-serif italic text-xl text-mocha font-semibold">
          {formattedSubtotal}
        </span>
      </div>
    </div>
  );
});
