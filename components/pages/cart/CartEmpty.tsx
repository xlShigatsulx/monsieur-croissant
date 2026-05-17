import Link from 'next/link'
import { pageConfig } from '@/config/pages.config'

export function CartEmpty() {
  return (
    <div className='flex flex-col justify-center items-center text-center m-auto bg-cream'>
      <h1 className='font-cormorant italic text-3xl text-mocha font-light mb-3'>
        Кошик порожній
      </h1>
      <p className='font-jost text-[11px] tracking-[0.2em] uppercase text-mocha/60 mb-10'>
        Додайте щось смачне
      </p>
      <Link
        href={pageConfig.collections}
        className='font-jost text-[11px] tracking-[0.2em] uppercase
            text-caramel border border-caramel/60 hover:border-caramel
            hover:bg-caramel/10 rounded-full px-8 py-3
            transition-all duration-300'
      >
        До асортименту
      </Link>
    </div>
  )
}
