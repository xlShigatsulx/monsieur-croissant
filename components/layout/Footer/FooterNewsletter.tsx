'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export function FooterNewsletter() {
  const t = useTranslations('footer');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulating subscription process
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail('');
    }, 400);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <p className="font-serif italic text-lg text-mocha font-semibold tracking-wide">
            {t('newsletterTitle')}
          </p>
          <span className="text-[10px] font-sans font-semibold uppercase tracking-wider bg-caramel/15 text-caramel px-2 py-0.5 rounded-full">
            {t('newsletterPromo')}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-mocha/65 leading-relaxed">
          {t('newsletterSubtitle')}
        </p>
      </div>

      {isSubmitted ? (
        <div className="bg-white/70 border border-caramel/25 rounded-2xl p-4 flex items-start gap-2.5 text-xs text-mocha animate-fadeIn">
          <svg
            className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p className="leading-snug font-medium text-mocha/80">
            {t('newsletterSuccess')}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="relative flex items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('newsletterPlaceholder')}
              required
              className="w-full h-11 pl-4 pr-16 rounded-full bg-white/80 border border-caramel/25
                text-xs sm:text-sm text-mocha placeholder:text-mocha/40
                focus:outline-none focus:border-caramel focus:ring-2 focus:ring-caramel/20
                transition-all duration-200"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-1 top-1 bottom-1 px-4 rounded-full
                bg-mocha text-cream text-[11px] font-medium tracking-wider uppercase
                hover:bg-caramel disabled:opacity-50 transition-colors duration-200
                flex items-center justify-center cursor-pointer shadow-xs"
            >
              {isLoading ? '...' : t('newsletterButton')}
            </button>
          </div>
          <p className="text-[11px] text-mocha/45 leading-tight">
            {t('newsletterNote')}
          </p>
        </form>
      )}
    </div>
  );
}
