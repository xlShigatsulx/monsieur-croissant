'use client'

import Link from 'next/link'
import { useCartData } from '@/context/CartContext'
import { pageConfig } from '@/config/pages.config'

export function CartIcon() {
  const { cart } = useCartData()
  const totalQuantity = cart?.totalQuantity ?? 0

  return (
    <Link
      href={pageConfig.cart}
      aria-label='Кошик'
      className='relative w-8 h-8 flex items-center justify-center
        text-mocha/70 hover:text-caramel transition-colors duration-300'
    >
      <BagIcon />
      {totalQuantity > 0 && (
        <span
          className='absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center
          bg-caramel text-cream rounded-full font-jost text-[9px] leading-none'
        >
          {totalQuantity > 99 ? '99+' : totalQuantity}
        </span>
      )}
    </Link>
  )
}

function BagIcon() {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
    >
      <path
        d='M6.5 7V5.5a3.5 3.5 0 017 0V7'
        stroke='currentColor'
        strokeWidth='1.4'
        strokeLinecap='round'
      />
      <rect
        x='3'
        y='7'
        width='14'
        height='11'
        rx='2'
        stroke='currentColor'
        strokeWidth='1.4'
      />
    </svg>
  )
}
