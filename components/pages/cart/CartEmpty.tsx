import Link from 'next/link'
import { pageConfig } from '@/config/pages.config'

export function CartEmpty() {
  return (
    <main className='min-h-screen bg-cream flex items-center justify-center'>
      <div className='text-center px-4'>
        <h1 className='font-cormorant italic text-3xl text-mocha font-light mb-3'>
          Кошик порожній
        </h1>
        <p className='font-jost text-[11px] tracking-[0.2em] uppercase text-mocha/60 mb-10'>
          Додайте щось смачне
        </p>
        <Link
          href={pageConfig.products}
          className='font-jost text-[11px] tracking-[0.2em] uppercase
            text-caramel border border-caramel/60 hover:border-caramel
            hover:bg-caramel/10 rounded-full px-8 py-3
            transition-all duration-300'
        >
          До меню
        </Link>
      </div>
    </main>
  )
}
