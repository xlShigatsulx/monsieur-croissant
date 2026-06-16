import { useTranslations } from 'next-intl'
import Link from 'next/link'

export function SliderCta({ productLink }: { productLink?: string }) {
  const t = useTranslations('slider')

  if (!productLink)
    return (
      <div className='mt-6 flex justify-center'>
        <div className='h-9 w-32 rounded-full bg-[#c4977a]/10 animate-pulse' />
      </div>
    )

  return (
    <div className='mt-6 text-center'>
      <Link
        href={productLink}
        className='text-[11px] tracking-[0.25em] uppercase text-[#c4977a]
          border border-[#c4977a]/40 hover:border-[#c4977a] hover:bg-[#c4977a]/10
          rounded-full px-6 py-2.5 transition-all duration-300 cursor-pointer'
      >
        {t('cta')}
      </Link>
    </div>
  )
}
