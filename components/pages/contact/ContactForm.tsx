'use client'

import { useForm } from 'react-hook-form'
import { ContactSuccess } from './ContactSuccess'
import { useTranslations } from 'next-intl'

type ContactFormData = {
  name: string
  email: string
  topic: 'order' | 'question' | 'cooperation' | 'other'
  message: string
}

const TOPIC_VALUES = ['order', 'question', 'cooperation', 'other'] as const

const inputClassName = `w-full font-jost text-sm text-mocha bg-transparent
    border border-caramel/20 hover:border-caramel/85 focus:border-caramel
    rounded-xl px-4 py-3 outline-none
    placeholder:text-mocha/30
    transition-colors duration-300`

const submitButtonClassName = `w-full font-jost text-[11px] tracking-[0.2em] uppercase
    text-caramel border border-caramel/40 hover:border-caramel
    hover:bg-caramel/10 rounded-full px-8 py-3
    transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed
    cursor-pointer mt-5`

const errorClassName = 'font-jost text-[11px] text-red-400/80 mt-1.5 ml-1'

export function ContactForm() {
  const t = useTranslations('contact.contactForm')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormData>()

  const onSubmit = (data: ContactFormData) => {
    //data can be sent to backend here
    reset()
  }

  if (isSubmitSuccessful) {
    return <ContactSuccess onReset={reset} />
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className='space-y-4'
    >
      <div>
        <input
          {...register('name', {
            required: t('name.required'),
            minLength: { value: 2, message: t('name.minLength') },
          })}
          placeholder={t('name.placeholder')}
          className={inputClassName}
        />
        {errors.name && <p className={errorClassName}>{errors.name.message}</p>}
      </div>

      <div>
        <input
          {...register('email', {
            required: t('email.required'),
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t('email.invalid'),
            },
          })}
          type='email'
          placeholder={t('email.placeholder')}
          className={inputClassName}
        />
        {errors.email && (
          <p className={errorClassName}>{errors.email.message}</p>
        )}
      </div>

      <div>
        <select
          {...register('topic', { required: t('topic.required') })}
          className={`${inputClassName} cursor-pointer`}
          defaultValue=''
        >
          <option
            value=''
            disabled
          >
            {t('topic.placeholder')}
          </option>
          {TOPIC_VALUES.map((value) => (
            <option
              key={value}
              value={value}
            >
              {t(`topic.options.${value}`)}
            </option>
          ))}
        </select>
        {errors.topic && (
          <p className={errorClassName}>{errors.topic.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register('message', {
            required: t('message.required'),
            minLength: { value: 10, message: t('message.minLength') },
          })}
          placeholder={t('message.placeholder')}
          rows={5}
          className={`${inputClassName} resize-none`}
        />
        {errors.message && (
          <p className={errorClassName}>{errors.message.message}</p>
        )}
      </div>

      <button
        type='submit'
        disabled={isSubmitting}
        className={submitButtonClassName}
      >
        {isSubmitting ? t('submitting') : t('submit')}
      </button>
    </form>
  )
}
