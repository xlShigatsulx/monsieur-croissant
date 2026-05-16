import { FooterSocials } from './FooterSocials'
import { NavLogo } from '../Navigation/NavLogo'

interface FooterBrandProps {
  shopName: string
  description?: string
  logo?: {
    url: string
    altText?: string | null
    width?: number
    height?: number
  }
}

export function FooterBrand({ shopName, description, logo }: FooterBrandProps) {
  return (
    <div className='sm:col-span-2 lg:col-span-1 flex flex-col gap-5'>
      <NavLogo />

      {description && (
        <p className='text-sm leading-relaxed text-mocha/55 max-w-[240px] font-jost'>
          {description}
        </p>
      )}

      <div className='flex items-center gap-3 mt-1'>
        <FooterSocials />
      </div>
    </div>
  )
}
