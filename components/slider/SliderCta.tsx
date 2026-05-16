import { pageConfig } from '@/config/pages.config'
import Link from 'next/link'

export function SliderCta({ productLink }: { productLink: string }) {
  return (
    <div className='mt-6 text-center'>
      <Link
        href={productLink}
        className='text-[11px] tracking-[0.25em] uppercase text-[#c4977a]
          border border-[#c4977a]/40 hover:border-[#c4977a] hover:bg-[#c4977a]/10
          rounded-full px-6 py-2.5 transition-all duration-300 cursor-pointer'
      >
        Спробувати
      </Link>
    </div>
  )
}
