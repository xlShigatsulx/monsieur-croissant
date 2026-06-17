'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useShop } from '@/hooks/useShop'

export function NavLogo() {
  const { shopName, logo } = useShop()

  return (
    <Link
      href='/'
      className='flex flex-col items-start group'
    >
      {logo ? (
        <Image
          src={logo.url}
          alt={logo.altText ?? shopName}
          width={logo.width ?? 120}
          height={logo.height ?? 40}
          className='group-hover:opacity-80 transition-opacity duration-300'
          loading='eager'
        />
      ) : (
        <span
          className='font-cormorant italic text-mocha text-2xl sm:text-3xl font-light
          tracking-wide leading-none group-hover:text-caramel transition-colors duration-300'
        >
          {shopName}
        </span>
      )}
    </Link>
  )
}
