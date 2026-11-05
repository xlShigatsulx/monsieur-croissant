'use client';

import { useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useCartActions, useCartData, useCartOptimistic } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils/format';
import { pageConfig } from '@/config/pages.config';
import { safeRedirectToCheckout } from '@/lib/utils/checkout';

const FREE_SHIPPING_THRESHOLD = 500;

export function CartDrawer() {
  const t = useTranslations('cart');
  const locale = useLocale();
  const pathname = usePathname();

  const { isDrawerOpen, cart, cartLoading, cartId } = useCartData();
  const { closeDrawer, updateItem, removeItem, clearCart } = useCartActions();
  const { optimisticLines } = useCartOptimistic();

  useEffect(() => {
    closeDrawer();
  }, [pathname, closeDrawer]);

  useEffect(() => {
    if (!isDrawerOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen, closeDrawer]);

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

  const subtotal = useMemo(() => {
    return lines.reduce((sum, line) => {
      const variant = line.merchandise;
      const unitPrice =
        variant.__typename === 'ProductVariant'
          ? Number(variant.price.amount)
          : 0;
      const optimistic = optimisticLines[line.id];
      const qty =
        optimistic !== undefined ? optimistic.quantity : line.quantity;
      return sum + unitPrice * qty;
    }, 0);
  }, [lines, optimisticLines]);

  const currencyCode = cart?.cost?.totalAmount?.currencyCode ?? 'UAH';

  const formattedSubtotal = useMemo(
    () => formatPrice(subtotal, currencyCode, locale),
    [subtotal, currencyCode, locale],
  );

  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100),
  );
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleCheckout = useCallback(() => {
    const checkoutUrl = cart?.checkoutUrl;
    if (!checkoutUrl) return;
    safeRedirectToCheckout(checkoutUrl);
  }, [cart?.checkoutUrl]);

  if (!isDrawerOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label={t('drawer.title')}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-mocha/45 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Container */}
      <aside
        className="fixed top-0 right-0 bottom-0 w-full sm:max-w-md bg-cream z-50
          flex flex-col shadow-2xl border-l border-caramel/15
          animate-in slide-in-from-right duration-300 ease-out"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-caramel/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-serif italic text-2xl sm:text-3xl text-mocha font-semibold">
              {t('drawer.title')}
            </h2>
            {visibleLines.length > 0 && (
              <span className="font-jost text-[10px] uppercase tracking-[0.15em] bg-caramel/15 text-caramel px-2.5 py-0.5 rounded-full font-medium">
                {t('drawer.itemsCount', { count: visibleLines.length })}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={closeDrawer}
            aria-label={t('drawer.closeLabel')}
            className="w-9 h-9 rounded-full border border-caramel/20 flex items-center justify-center
              text-mocha/60 hover:text-caramel hover:border-caramel hover:bg-caramel/10
              transition-all duration-200 cursor-pointer"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        {visibleLines.length > 0 && (
          <div className="px-6 py-3.5 bg-sand/40 border-b border-caramel/10">
            <div className="flex items-center justify-between text-xs font-jost mb-1.5">
              <span className="text-mocha/70">
                {subtotal >= FREE_SHIPPING_THRESHOLD
                  ? t('drawer.freeShippingUnlocked')
                  : t('drawer.freeShippingRemaining', {
                      amount: remainingForFreeShipping,
                    })}
              </span>
              <span className="text-caramel font-medium">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-caramel/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-caramel transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-caramel/10">
          {cartLoading && !cart && <DrawerSkeleton />}

          {(!cartId || visibleLines.length === 0) && !cartLoading && (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 rounded-full bg-caramel/10 text-caramel flex items-center justify-center mb-5">
                <EmptyCartIcon />
              </div>
              <h3 className="font-serif italic text-2xl text-mocha font-semibold mb-2">
                {t('drawer.emptyTitle')}
              </h3>
              <p className="font-jost text-xs text-mocha/60 max-w-xs mb-8 leading-relaxed">
                {t('drawer.emptySubtitle')}
              </p>
              <Link
                href={pageConfig.products}
                onClick={closeDrawer}
                className="font-jost text-xs uppercase tracking-[0.15em]
                  bg-mocha text-cream hover:bg-caramel
                  rounded-full px-8 py-3.5 transition-all duration-300"
              >
                {t('drawer.shopNow')}
              </Link>
            </div>
          )}

          {visibleLines.map((line) => {
            const variant = line.merchandise;
            if (variant.__typename !== 'ProductVariant') return null;

            const unitPrice = Number(variant.price.amount);
            const optimistic = optimisticLines[line.id];
            const qty = optimistic !== undefined ? optimistic.quantity : line.quantity;
            const lineTotal = formatPrice(unitPrice * qty, variant.price.currencyCode, locale);
            const image = variant.product.images?.edges[0]?.node;

            return (
              <div key={line.id} className="py-4 flex gap-4 items-start group">
                <Link
                  href={pageConfig.product(variant.product.handle)}
                  onClick={closeDrawer}
                  className="shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-sand/60 border border-caramel/15 relative"
                >
                  {image ? (
                    <Image
                      src={image.url}
                      alt={image.altText ?? variant.product.title}
                      fill
                      sizes="80px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-caramel/10" />
                  )}
                </Link>

                <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={pageConfig.product(variant.product.handle)}
                      onClick={closeDrawer}
                      className="font-serif italic text-lg text-mocha hover:text-caramel transition-colors truncate block font-medium"
                    >
                      {variant.product.title}
                    </Link>

                    <button
                      type="button"
                      onClick={() => removeItem(line.id)}
                      aria-label={t('cartItem.removeBtn')}
                      className="text-mocha/50 hover:text-red-500 transition-colors p-1 -m-1 cursor-pointer"
                    >
                      <TrashIcon />
                    </button>
                  </div>

                  {variant.title !== 'Default Title' && (
                    <p className="font-jost text-[10px] uppercase tracking-[0.15em] text-mocha/70 font-medium">
                      {variant.title}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 border border-caramel/30 rounded-full px-2.5 py-1 bg-white/40">
                      <button
                        type="button"
                        onClick={() => updateItem(line.id, qty - 1, unitPrice)}
                        disabled={qty <= 1}
                        aria-label={t('cartItem.decrease')}
                        className="w-5 h-5 flex items-center justify-center text-mocha/60 hover:text-caramel disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        −
                      </button>
                      <span className="font-jost text-xs text-mocha font-medium w-4 text-center">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateItem(line.id, qty + 1, unitPrice)}
                        aria-label={t('cartItem.increase')}
                        className="w-5 h-5 flex items-center justify-center text-mocha/60 hover:text-caramel cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-serif italic text-base text-mocha font-semibold">
                      {lineTotal}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        {visibleLines.length > 0 && (
          <div className="px-6 py-5 border-t border-caramel/15 bg-white/70 backdrop-blur-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-jost text-xs uppercase tracking-[0.2em] text-mocha/70">
                {t('drawer.subtotal')}
              </span>
              <span className="font-serif italic text-2xl text-mocha font-semibold">
                {formattedSubtotal}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={!cart?.checkoutUrl}
              className="w-full font-jost text-xs font-medium tracking-[0.2em] uppercase
                bg-caramel text-cream hover:bg-caramel/90
                rounded-full py-4 transition-all duration-300 cursor-pointer shadow-md disabled:opacity-50"
            >
              {t('drawer.checkout')}
            </button>

            <div className="flex items-center justify-between pt-1">
              <Link
                href={pageConfig.cart}
                onClick={closeDrawer}
                className="font-jost text-[11px] uppercase tracking-[0.15em] text-mocha/60 hover:text-caramel transition-colors"
              >
                {t('drawer.viewFullCart')} →
              </Link>

              <button
                type="button"
                onClick={clearCart}
                className="font-jost text-[11px] uppercase tracking-[0.15em] text-mocha/60 hover:text-red-500 transition-colors cursor-pointer"
              >
                {t('clearCart')}
              </button>
            </div>

            <div className="pt-2 border-t border-caramel/10 flex items-center justify-around text-[10px] font-jost text-mocha/70 uppercase tracking-[0.1em]">
              <span className="flex items-center gap-1.5">
                <CheckCircleIcon />
                {t('drawer.freshBadge')}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <ShopIcon />
                {t('drawer.pickupBadge')}
              </span>
            </div>
          </div>
        )}
      </aside>
    </div>,
    document.body,
  );
}

function DrawerSkeleton() {
  return (
    <div className="space-y-4 py-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-4 items-center">
          <div className="w-20 h-20 rounded-xl bg-caramel/10 animate-pulse shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 bg-caramel/10 rounded animate-pulse" />
            <div className="h-3 w-1/3 bg-caramel/10 rounded animate-pulse" />
            <div className="h-6 w-24 bg-caramel/10 rounded-full animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function EmptyCartIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ShopIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
