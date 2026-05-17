'use client'

import { memo, useMemo, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartActions, useCartOptimistic } from '@/context/CartContext'
import { pageConfig } from '@/config/pages.config'
import { formatPrice } from '@/lib/utils/format'

interface CartItemProps {
  lineId: string
  title: string
  variantTitle: string
  price: string
  currencyCode: string
  quantity: number
  image?: { url: string; altText?: string | null }
  handle: string
}

const CartItemQuantity = memo(function CartItemQuantity({
  lineId,
  quantity,
  unitPrice,
  currencyCode,
}: {
  lineId: string
  quantity: number
  unitPrice: number
  currencyCode: string
}) {
  const { updateItem, removeItem } = useCartActions()
  const { optimisticLines } = useCartOptimistic()

  const optimistic = optimisticLines[lineId]
  const displayQuantity =
    optimistic !== undefined ? optimistic.quantity : quantity

  const displayTotal = useMemo(
    () => formatPrice(unitPrice * displayQuantity, currencyCode),
    [unitPrice, displayQuantity, currencyCode]
  )

  const handleDecrement = useCallback(() => {
    updateItem(lineId, displayQuantity - 1, unitPrice)
  }, [lineId, displayQuantity, unitPrice, updateItem])

  const handleIncrement = useCallback(() => {
    updateItem(lineId, displayQuantity + 1, unitPrice)
  }, [lineId, displayQuantity, unitPrice, updateItem])

  const handleRemove = useCallback(() => {
    removeItem(lineId)
  }, [lineId, removeItem])

  return (
    <div className='flex items-center justify-between mt-3 gap-4'>
      <div className='flex items-center gap-3'>
        <button
          onClick={handleDecrement}
          disabled={displayQuantity <= 1}
          className='w-7 h-7 flex items-center justify-center
            border border-caramel/30 rounded-full text-mocha/60
            hover:border-caramel hover:text-caramel
            disabled:opacity-30 disabled:cursor-not-allowed
            transition-all duration-200 cursor-pointer'
        >
          −
        </button>
        <span className='font-jost text-sm text-mocha w-4 text-center'>
          {displayQuantity}
        </span>
        <button
          onClick={handleIncrement}
          className='w-7 h-7 flex items-center justify-center
            border border-caramel/30 rounded-full text-mocha/60
            hover:border-caramel hover:text-caramel
            transition-all duration-200 cursor-pointer'
        >
          +
        </button>
      </div>

      <div className='flex items-center gap-4'>
        <span className='font-cormorant italic text-lg text-mocha'>
          {displayTotal}
        </span>
        <button
          onClick={handleRemove}
          className='font-jost text-[10px] tracking-[0.15em] uppercase
            text-mocha/30 hover:text-caramel transition-colors duration-300
            cursor-pointer'
        >
          Видалити
        </button>
      </div>
    </div>
  )
})

export const CartItem = memo(function CartItem({
  lineId,
  title,
  variantTitle,
  price,
  currencyCode,
  quantity,
  image,
  handle,
}: CartItemProps) {
  const unitPrice = useMemo(() => Number(price), [price])

  return (
    <div className='flex gap-4 sm:gap-6 pb-6 border-b border-caramel/15'>
      <Link
        href={pageConfig.product(handle)}
        className='shrink-0'
      >
        <div className='w-20 h-20 sm:w-24 sm:h-24 bg-caramel/5 rounded-lg overflow-hidden'>
          {image && (
            <Image
              src={image.url}
              alt={image.altText ?? title}
              width={96}
              height={96}
              className='w-full h-full object-cover'
              loading='eager'
            />
          )}
          {!image && <div className='w-full h-full bg-caramel/10' />}
        </div>
      </Link>

      <div className='flex-1 flex flex-col justify-between'>
        <div>
          <Link href={pageConfig.product(handle)}>
            <h3
              className='font-cormorant italic text-lg text-mocha
              hover:text-caramel transition-colors duration-300'
            >
              {title}
            </h3>
          </Link>
          {variantTitle !== 'Default Title' && (
            <p className='font-jost text-[10px] tracking-[0.15em] uppercase text-mocha/40 mt-0.5'>
              {variantTitle}
            </p>
          )}
        </div>

        <CartItemQuantity
          lineId={lineId}
          quantity={quantity}
          unitPrice={unitPrice}
          currencyCode={currencyCode}
        />
      </div>
    </div>
  )
})
