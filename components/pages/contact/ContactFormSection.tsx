import { useTranslations } from 'next-intl'
import { ContactForm } from './ContactForm'

export function ContactFormSection() {
  const t = useTranslations('contact.contactForm')

  return (
    <div className='bg-white/60 backdrop-blur-sm border border-caramel/15 rounded-2xl px-6 py-8 sm:px-8 w-full max-w-md'>
      <div className='mb-6'>
        <h2 className='font-cormorant italic text-center text-2xl sm:text-3xl text-mocha font-semibold'>
          {t('title')}
        </h2>
        <div className='w-full h-px bg-caramel/40 mt-3' />
      </div>

      <ContactForm />
    </div>
  )
}
