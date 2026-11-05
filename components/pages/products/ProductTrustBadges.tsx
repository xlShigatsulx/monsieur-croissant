'use client';

import { useTranslations } from 'next-intl';

export function ProductTrustBadges() {
  const t = useTranslations('product.perks');

  const perks = [
    {
      title: t('freshTitle'),
      desc: t('freshDesc'),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      ),
    },
    {
      title: t('butterTitle'),
      desc: t('butterDesc'),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
    {
      title: t('fermentTitle'),
      desc: t('fermentDesc'),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      title: t('pickupTitle'),
      desc: t('pickupDesc'),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 pt-6 border-t border-caramel/15">
      {perks.map((perk, idx) => (
        <div
          key={idx}
          className="flex items-start gap-2.5 p-3 rounded-xl bg-white/50 border border-caramel/10"
        >
          <div className="shrink-0 text-caramel mt-0.5">{perk.icon}</div>
          <div className="min-w-0">
            <p className="font-jost text-xs font-semibold text-mocha leading-tight">
              {perk.title}
            </p>
            <p className="font-jost text-[11px] text-mocha/70 mt-0.5 leading-snug">
              {perk.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
