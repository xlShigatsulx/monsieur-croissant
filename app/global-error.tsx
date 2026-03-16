'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <div className='min-h-screen flex items-center justify-center bg-cream'>
          <div className='text-center px-4'>
            <p className='font-cormorant italic text-8xl text-caramel/30 font-light leading-none mb-2'>
              500
            </p>
            <h1 className='font-cormorant italic text-3xl text-mocha font-light mb-3'>
              Щось пішло не так
            </h1>
            <p className='font-jost text-[11px] tracking-[0.2em] uppercase text-mocha/50 mb-10'>
              Вибачте за незручності, спробуйте ще раз
            </p>
            <button
              onClick={reset}
              className='font-jost text-[11px] tracking-[0.2em] uppercase
                text-caramel border border-caramel/40 hover:border-caramel
                hover:bg-caramel/10 rounded-full px-8 py-3
                transition-all duration-300 cursor-pointer'
            >
              Спробувати знову
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
