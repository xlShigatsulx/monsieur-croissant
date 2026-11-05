'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export function ProductDetailsAccordion() {
  const t = useTranslations('product.accordion');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const sections = [
    {
      title: t('ingredientsTitle'),
      content: t('ingredientsContent'),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
    },
    {
      title: t('servingTitle'),
      content: t('servingContent'),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      ),
    },
    {
      title: t('deliveryTitle'),
      content: t('deliveryContent'),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      ),
    },
  ];

  return (
    <div className="border-t border-caramel/15 pt-6 flex flex-col gap-3">
      {sections.map((section, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border border-caramel/15 rounded-2xl bg-white/40 overflow-hidden transition-colors duration-200"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between p-4 sm:px-5 text-left cursor-pointer hover:bg-caramel/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-caramel shrink-0">{section.icon}</span>
                <span className="font-jost text-sm font-semibold text-mocha">
                  {section.title}
                </span>
              </div>
              <span
                className={`text-mocha/60 transition-transform duration-200 text-sm font-bold ${
                  isOpen ? 'rotate-180 text-caramel' : ''
                }`}
              >
                ▼
              </span>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-mocha/80 font-jost text-xs sm:text-sm leading-relaxed whitespace-pre-line border-t border-caramel/10 bg-white/20">
                {section.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
