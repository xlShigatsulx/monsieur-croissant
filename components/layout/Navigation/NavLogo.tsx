'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useGetShopQuery } from '@/graphql/generated/graphql'

export function NavLogo() {
  const { data } = useGetShopQuery()

  const logo = data?.shop?.brand?.logo?.image
  const shopName = data?.shop?.name ?? 'La Douceur'

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
        />
      ) : (
        <>
          <span
            className='font-cormorant italic text-mocha text-2xl sm:text-3xl font-light
            tracking-wide leading-none group-hover:text-caramel transition-colors duration-300'
          >
            {'Месьє Круасан'}
          </span>
        </>
      )}
    </Link>
  )
}
