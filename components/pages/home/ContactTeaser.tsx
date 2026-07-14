'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SocialIcons } from '@/components/ui/SocialIcons';
import { useContactData } from '@/hooks/useContactData';
import { pageConfig } from '@/config/pages.config';

export function ContactTeaser() {
  const t = useTranslations('home.contact');
  const tInfo = useTranslations('contact.info');
  const { data, loading } = useContactData();

  if (loading) return <ContactTeaserSkeleton />;
  if (!data) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
        <div>
          <h3 className="font-cormorant italic text-mocha text-xl sm:text-2xl mb-4">
            {t('visitTitle')}
          </h3>
          <div className="text-mocha/70 text-sm leading-relaxed space-y-1">
            <p className="whitespace-pre-line">{data.address}</p>
            <p className="pt-2 text-mocha font-medium">{tInfo('hours')}</p>
            <p>{data.hoursWeekdays}</p>
            <p>{data.hoursWeekends}</p>
          </div>
        </div>

        <div>
          <h3 className="font-cormorant italic text-mocha text-xl sm:text-2xl mb-4">
            {t('touchTitle')}
          </h3>
          <div className="text-mocha/70 text-sm leading-relaxed space-y-1">
            {data.phone && <p>{data.phone}</p>}
            <div className="pt-3">
              <SocialIcons />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-cormorant italic text-mocha text-xl sm:text-2xl mb-4">
            {t('orderTitle')}
          </h3>
          <p className="text-mocha/70 text-sm leading-relaxed mb-5">
            {t('orderDescription')}
          </p>
          <Link
            href={pageConfig.contact}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg
              bg-mocha text-cream text-xs sm:text-sm font-medium uppercase tracking-widest
              hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(58,35,24,0.2)]
              transition-all duration-300 whitespace-nowrap"
          >
            {t('cta')}
          </Link>
        </div>
      </div>
    </section>
  );
}

function ContactTeaserSkeleton() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
      <div className="h-8 w-56 bg-caramel/10 rounded animate-pulse mb-10" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 bg-caramel/10 rounded-xl animate-pulse"
          />
        ))}
      </div>
    </section>
  );
}
