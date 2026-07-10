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
    <section className="max-w-6xl mx-auto px-4 py-14 sm:py-20">
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />

      <div
        className="bg-white/60 backdrop-blur-sm border border-caramel/15 rounded-2xl
          px-6 py-8 sm:px-10 sm:py-10 flex flex-col sm:flex-row sm:items-center
          justify-between gap-8"
      >
        <div className="grid grid-cols-2 gap-6 sm:gap-10">
          <div>
            <p className="font-cormorant italic text-caramel text-lg mb-1">
              {tInfo('address')}
            </p>
            <p className="text-mocha text-sm leading-relaxed whitespace-pre-line">
              {data.address}
            </p>
          </div>

          <div>
            <p className="font-cormorant italic text-caramel text-lg mb-1">
              {tInfo('hours')}
            </p>
            <div className="text-mocha text-sm leading-relaxed space-y-0.5">
              <p>{data.hoursWeekdays}</p>
              <p>{data.hoursWeekends}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-4">
          <SocialIcons />
          <Link
            href={pageConfig.contact}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full
              border border-caramel/40 text-mocha text-sm tracking-wide
              hover:bg-caramel/8 hover:border-caramel
              transition-all duration-200 whitespace-nowrap"
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
    <section className="max-w-6xl mx-auto px-4 py-14 sm:py-20">
      <div className="h-8 w-56 bg-caramel/10 rounded animate-pulse mb-10" />
      <div className="h-40 bg-caramel/10 rounded-2xl animate-pulse" />
    </section>
  );
}
