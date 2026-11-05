'use client';

import { useAuth } from '@/context/AuthContext';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { pageConfig } from '@/config/pages.config';

export function ProfilePage() {
  const t = useTranslations('profile');
  const { customer, isAuthenticated, isLoading, signIn, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-caramel border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || !customer) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white/70 rounded-3xl p-8 sm:p-10 border border-caramel/15 shadow-xl text-center">
          <div className="w-16 h-16 rounded-full bg-caramel/10 text-caramel flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>

          <h1 className="font-cormorant italic text-3xl sm:text-4xl text-mocha font-light mb-3">
            {t('title')}
          </h1>

          <p className="font-jost text-sm text-mocha/65 mb-8 leading-relaxed">
            {t('signInPrompt')}
          </p>

          <button
            type="button"
            onClick={signIn}
            className="w-full font-jost text-xs sm:text-sm font-medium tracking-[0.15em] uppercase
              bg-mocha text-cream hover:bg-caramel rounded-full py-4 transition-all duration-300 cursor-pointer shadow-md"
          >
            {t('signInBtn')}
          </button>
        </div>
      </div>
    );
  }

  const fullName = [customer.firstName, customer.lastName].filter(Boolean).join(' ') || 'Гість';

  return (
    <div className="min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white/70 rounded-3xl p-8 sm:p-12 border border-caramel/15 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-caramel/15">
            <div>
              <span className="inline-block text-[10px] uppercase tracking-[0.2em] font-medium text-caramel bg-caramel/10 px-3 py-1 rounded-full mb-3">
                Shopify Customer
              </span>
              <h1 className="font-cormorant italic text-3xl sm:text-4xl text-mocha font-light">
                {t('welcome', { name: fullName })}
              </h1>
            </div>

            <button
              type="button"
              onClick={logout}
              className="self-start sm:self-auto font-jost text-[11px] tracking-[0.2em] uppercase
                text-mocha/60 border border-mocha/20 hover:border-red-400 hover:text-red-500
                rounded-full px-6 py-2.5 transition-all duration-300 cursor-pointer"
            >
              {t('logoutBtn')}
            </button>
          </div>

          <div className="py-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-sand/40 rounded-2xl p-5">
                <span className="block font-jost text-[10px] tracking-[0.15em] uppercase text-mocha/45 mb-1">
                  {t('email')}
                </span>
                <span className="font-jost text-sm sm:text-base text-mocha font-medium">
                  {customer.email || '—'}
                </span>
              </div>

              <div className="bg-sand/40 rounded-2xl p-5">
                <span className="block font-jost text-[10px] tracking-[0.15em] uppercase text-mocha/45 mb-1">
                  {t('id')}
                </span>
                <span className="font-jost text-xs sm:text-sm text-mocha/80 font-mono truncate block">
                  {customer.id}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-caramel/15 flex flex-wrap gap-4 justify-between items-center">
            <Link
              href={pageConfig.products}
              className="font-jost text-xs tracking-[0.15em] uppercase text-caramel hover:underline"
            >
              ← До асортименту пекарні
            </Link>

            <Link
              href={pageConfig.cart}
              className="font-jost text-xs tracking-[0.15em] uppercase text-caramel hover:underline"
            >
              Переглянути кошик →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
