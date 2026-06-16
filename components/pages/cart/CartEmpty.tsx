import Link from 'next/link'
import { pageConfig } from '@/config/pages.config'
import { useTranslations } from 'next-intl'

export function CartEmpty() {
  const t = useTranslations('cart.cartEmpty')

  return (
    <div className='flex flex-col justify-center items-center text-center m-auto bg-cream'>
      <h1 className='font-cormorant italic text-3xl text-mocha font-light mb-3'>
        {t('title')}
      </h1>
      <p className='font-jost text-[11px] tracking-[0.2em] uppercase text-mocha/60 mb-10'>
        {t('subtitle')}
      </p>
      <Link
        href={pageConfig.collections}
        className='font-jost text-[11px] tracking-[0.2em] uppercase
            text-caramel border border-caramel/60 hover:border-caramel
            hover:bg-caramel/10 rounded-full px-8 py-3
            transition-all duration-300'
      >
        {t('link')}
      </Link>
    </div>
  )
}
