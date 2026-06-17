'use client'

import { NavMenu } from '../Navigation/NavMenu'
import { FooterBrand } from './FooterBrand'
import { FooterBottom } from './FooterBottom'
import { useShop } from '@/hooks/useShop'

export function Footer() {
  const { shopName, description } = useShop()

  return (
    <footer className='w-full bg-cream border-t border-caramel/15'>
      <div className='max-w-6xl mx-auto px-4 py-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
          <FooterBrand
            shopName={shopName}
            description={description}
          />
          <NavMenu
            handle='footer'
            className='flex flex-col gap-4 text-sm'
          />
        </div>
      </div>
      <FooterBottom shopName={shopName} />
    </footer>
  )
}
