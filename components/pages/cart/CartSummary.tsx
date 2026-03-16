'use client'

import { memo, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { useCartOptimistic } from '@/context/CartContext'
import { pageConfig } from '@/config/pages.config'
import { formatPrice } from '@/lib/utils/format'

interface CartLine {
  lineId: string
  quantity: number
  unitPrice: number
}

interface CartSummaryProps {
  lines: CartLine[]
  currencyCode: string
  checkoutUrl: string
}

const CartSummaryActions = memo(function CartSummaryActions({
  checkoutUrl,
}: {
  checkoutUrl: string
}) {
  const handleCheckout = useCallback(() => {
    window.location.href = `${checkoutUrl}?logged_in=true`
  }, [checkoutUrl])

  return (
    <>
      <button
        onClick={handleCheckout}
        className='w-full font-jost text-[11px] tracking-[0.2em] uppercase
          bg-caramel text-cream hover:bg-caramel/90
          rounded-full py-3.5 transition-all duration-300 cursor-pointer'
      >
        Оформити замовлення
      </button>
      <Link
        href={pageConfig.products}
        className='block text-center font-jost text-[10px] tracking-[0.15em]
          uppercase text-mocha/40 hover:text-caramel mt-4
          transition-colors duration-300'
      >
        Продовжити покупки
      </Link>
    </>
  )
})

const CartSummaryTotals = memo(function CartSummaryTotals({
  lines,
  currencyCode,
}: {
  lines: CartLine[]
  currencyCode: string
}) {
  const { optimisticLines } = useCartOptimistic()

  const subtotal = useMemo(
    () =>
      lines.reduce((sum, line) => {
        const optimistic = optimisticLines[line.lineId]
        const qty =
          optimistic !== undefined ? optimistic.quantity : line.quantity
        return sum + line.unitPrice * qty
      }, 0),
    [lines, optimisticLines]
  )

  const formattedSubtotal = useMemo(
    () => formatPrice(subtotal, currencyCode),
    [subtotal, currencyCode]
  )

  return (
    <div className='flex flex-col gap-3 mb-6'>
      <div className='flex justify-between'>
        <span className='font-jost text-[11px] tracking-[0.15em] uppercase text-mocha/50'>
          Підсума
        </span>
        <span className='font-jost text-sm text-mocha'>
          {formattedSubtotal}
        </span>
      </div>
      <div className='h-px bg-caramel/10' />
      <div className='flex justify-between'>
        <span className='font-jost text-[11px] tracking-[0.15em] uppercase text-mocha/50'>
          Разом
        </span>
        <span className='font-cormorant italic text-xl text-mocha'>
          {formattedSubtotal}
        </span>
      </div>
    </div>
  )
})

export const CartSummary = memo(function CartSummary({
  lines,
  currencyCode,
  checkoutUrl,
}: CartSummaryProps) {
  return (
    <div className='bg-white/60 rounded-2xl p-6 border border-caramel/10'>
      <h2 className='font-cormorant italic text-2xl text-mocha font-light mb-6'>
        Підсумок
      </h2>
      <CartSummaryTotals
        lines={lines}
        currencyCode={currencyCode}
      />
      <CartSummaryActions checkoutUrl={checkoutUrl} />
    </div>
  )
})
