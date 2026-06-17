import { useTranslations } from 'next-intl'

interface FooterBottomProps {
  shopName: string
}

export function FooterBottom({ shopName }: FooterBottomProps) {
  const t = useTranslations('footer')
  const year = new Date().getFullYear()

  return (
    <div className='border-t border-caramel/10'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-4'>
        <p className='text-xs text-mocha/35'>
          {t('rights', { year, shopName })}
        </p>
        <p className='text-xs text-mocha/25 hidden sm:block'>
          Powered by Shopify
        </p>
      </div>
    </div>
  )
}
