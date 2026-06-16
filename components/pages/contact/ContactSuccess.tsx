import { useTranslations } from 'next-intl'

interface ContactSuccessProps {
  onReset: () => void
}

export function ContactSuccess({ onReset }: ContactSuccessProps) {
  const t = useTranslations('contact.success')

  return (
    <div className='flex flex-col items-center justify-center text-center py-12'>
      <p className='font-cormorant italic text-5xl text-caramel/70 font-light mb-4'>
        ✓
      </p>
      <h3 className='font-cormorant italic text-2xl text-mocha font-light mb-2'>
        {t('title')}
      </h3>
      <p className='font-jost text-sm text-mocha/80 font-light'>
        {t('subtitle')}
      </p>
      <button
        onClick={onReset}
        className='font-jost text-[11px] tracking-[0.2em] uppercase
          text-caramel border border-caramel/40 hover:border-caramel
          hover:bg-caramel/10 rounded-full px-8 py-3
          transition-all duration-300 cursor-pointer mt-8'
      >
        {t('reset')}
      </button>
    </div>
  )
}
