'use client';

import { useTranslations } from 'next-intl';

export function ProductCraftsmanship() {
  const t = useTranslations('product.craftsmanship');

  const cards = [
    {
      num: '01',
      title: t('card1Title'),
      desc: t('card1Desc'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
    {
      num: '02',
      title: t('card2Title'),
      desc: t('card2Desc'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      num: '03',
      title: t('card3Title'),
      desc: t('card3Desc'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
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
  ];

  return (
    <section className="mt-20 sm:mt-28 pt-16 sm:pt-20 border-t border-caramel/20">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <p className="font-jost text-xs uppercase tracking-[0.25em] text-caramel font-semibold mb-2">
          {t('eyebrow')}
        </p>
        <h2 className="font-serif italic text-3xl sm:text-4xl text-mocha font-semibold mb-3">
          {t('title')}
        </h2>
        <p className="font-jost text-sm sm:text-base text-mocha/75 leading-relaxed">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="relative bg-white/70 rounded-3xl p-7 sm:p-8 border border-caramel/15 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="w-12 h-12 rounded-2xl bg-caramel/10 text-caramel flex items-center justify-center">
                  {card.icon}
                </span>
                <span className="font-serif italic text-3xl text-caramel/40 font-semibold">
                  {card.num}
                </span>
              </div>
              <h3 className="font-serif italic text-xl text-mocha font-semibold mb-3">
                {card.title}
              </h3>
              <p className="font-jost text-sm text-mocha/75 leading-relaxed">
                {card.desc}
              </p>
            </div>
            <div className="w-8 h-0.5 bg-caramel/30 mt-6" />
          </div>
        ))}
      </div>
    </section>
  );
}
