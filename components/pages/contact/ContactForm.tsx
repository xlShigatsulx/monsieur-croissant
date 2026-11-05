'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { ContactSuccess } from './ContactSuccess';

const TOPIC_VALUES = [
  'catering',
  'order',
  'partnership',
  'feedback',
  'other',
] as const;

type Topic = (typeof TOPIC_VALUES)[number];

interface ContactFormData {
  name: string;
  email: string;
  topic: Topic;
  message: string;
}

const inputClassName = `w-full font-jost text-sm text-mocha bg-white/40
    border border-caramel/25 hover:border-caramel/85 focus:border-caramel
    rounded-xl px-4 py-3 outline-none
    placeholder:text-mocha/50
    transition-colors duration-300`;

const submitButtonClassName = `w-full font-jost text-xs tracking-[0.2em] uppercase font-semibold
    text-caramel border border-caramel/50 hover:border-caramel
    hover:bg-caramel hover:text-cream rounded-full px-8 py-3.5
    transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed
    cursor-pointer mt-5 shadow-sm`;

const errorClassName = 'font-jost text-xs text-red-600 font-medium mt-1.5 ml-1';

export function ContactForm() {
  const t = useTranslations('contact.contactForm');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = () => {
    reset();
  };

  if (isSubmitSuccessful) {
    return <ContactSuccess onReset={reset} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <label htmlFor="contact-name" className="sr-only">
          {t('name.placeholder')}
        </label>
        <input
          id="contact-name"
          aria-label={t('name.placeholder')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          {...register('name', {
            required: t('name.required'),
            minLength: { value: 2, message: t('name.minLength') },
          })}
          placeholder={t('name.placeholder')}
          className={inputClassName}
        />
        {errors.name && (
          <p id="contact-name-error" className={errorClassName}>
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className="sr-only">
          {t('email.placeholder')}
        </label>
        <input
          id="contact-email"
          type="email"
          aria-label={t('email.placeholder')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          {...register('email', {
            required: t('email.required'),
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t('email.invalid'),
            },
          })}
          placeholder={t('email.placeholder')}
          className={inputClassName}
        />
        {errors.email && (
          <p id="contact-email-error" className={errorClassName}>
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-topic" className="sr-only">
          {t('topic.placeholder')}
        </label>
        <select
          id="contact-topic"
          aria-label={t('topic.placeholder')}
          aria-invalid={!!errors.topic}
          aria-describedby={errors.topic ? 'contact-topic-error' : undefined}
          {...register('topic', { required: t('topic.required') })}
          className={`${inputClassName} cursor-pointer`}
          defaultValue=""
        >
          <option value="" disabled>
            {t('topic.placeholder')}
          </option>
          {TOPIC_VALUES.map((value) => (
            <option key={value} value={value}>
              {t(`topic.options.${value}`)}
            </option>
          ))}
        </select>
        {errors.topic && (
          <p id="contact-topic-error" className={errorClassName}>
            {errors.topic.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="sr-only">
          {t('message.placeholder')}
        </label>
        <textarea
          id="contact-message"
          aria-label={t('message.placeholder')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          {...register('message', {
            required: t('message.required'),
            minLength: { value: 10, message: t('message.minLength') },
          })}
          placeholder={t('message.placeholder')}
          rows={5}
          className={`${inputClassName} resize-none`}
        />
        {errors.message && (
          <p id="contact-message-error" className={errorClassName}>
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={submitButtonClassName}
      >
        {isSubmitting ? t('submitting') : t('submit')}
      </button>
    </form>
  );
}
