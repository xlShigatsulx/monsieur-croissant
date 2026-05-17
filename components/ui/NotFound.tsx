import Link from 'next/link'

interface NotFoundProps {
  title: string
  backHref: string
  backLabel: string
}

export function NotFound({ title, backHref, backLabel }: NotFoundProps) {
  return (
    <div className='flex flex-col bg-cream items-center justify-center text-center m-auto'>
      <p className='font-cormorant italic text-7xl text-caramel/20 font-light mb-4'>
        404
      </p>
      <h1 className='font-cormorant italic text-3xl text-mocha font-light mb-3'>
        {title}
      </h1>
      <Link
        href={backHref}
        className='font-jost text-[11px] tracking-[0.2em] uppercase
          text-caramel border border-caramel/40 hover:border-caramel
          hover:bg-caramel/10 rounded-full px-8 py-3
          transition-all duration-300 inline-block mt-6'
      >
        {backLabel}
      </Link>
    </div>
  )
}
