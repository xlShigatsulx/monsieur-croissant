import Link from 'next/link'
import { pageConfig } from '@/config/pages.config'

export function CollectionNotFound() {
  return (
    <main className='min-h-screen bg-cream flex items-center justify-center'>
      <div className='text-center px-4'>
        <p className='font-cormorant italic text-7xl text-caramel/20 font-light mb-4'>
          404
        </p>
        <h1 className='font-cormorant italic text-3xl text-mocha font-light mb-3'>
          Категорію не знайдено
        </h1>
        <Link
          href={pageConfig.collections}
          className='font-jost text-[11px] tracking-[0.2em] uppercase
            text-caramel border border-caramel/40 hover:border-caramel
            hover:bg-caramel/10 rounded-full px-8 py-3
            transition-all duration-300 inline-block mt-6'
        >
          До асортименту
        </Link>
      </div>
    </main>
  )
}
