'use client';

import { useTranslations } from 'next-intl';
import { useContactData } from '@/hooks/useContactData';

export function FooterHours() {
  const t = useTranslations('footer');
  const { data } = useContactData();

  const address = data?.address?.trim() || t('defaultAddress');
  const weekdays = data?.hoursWeekdays?.trim() || t('defaultHoursWeekdays');
  const weekends = data?.hoursWeekends?.trim() || t('defaultHoursWeekends');
  const phone = data?.phone?.trim() || t('defaultPhone');
  const mapsUrl = data?.mapsUrl?.trim() || 'https://maps.google.com';

  return (
    <div className="flex flex-col gap-4">
      <p className="font-serif italic text-lg text-mocha font-semibold tracking-wide">
        {t('bakeryTitle')}
      </p>

      <div className="flex flex-col gap-3.5 text-xs sm:text-sm text-mocha/70">
        {/* Address */}
        <div className="flex items-start gap-2.5">
          <svg
            className="w-4 h-4 text-caramel shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <div>
            <p className="leading-snug">{address}</p>
            {mapsUrl && (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[11px] text-caramel hover:underline mt-0.5 tracking-wider uppercase font-medium"
              >
                {t('viewOnMap')} →
              </a>
            )}
          </div>
        </div>

        {/* Working Hours */}
        <div className="flex items-start gap-2.5">
          <svg
            className="w-4 h-4 text-caramel shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="leading-tight space-y-1">
            <p>{weekdays}</p>
            <p>{weekends}</p>
          </div>
        </div>

        {/* Telephone */}
        <div className="flex items-center gap-2.5">
          <svg
            className="w-4 h-4 text-caramel shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="hover:text-caramel transition-colors duration-200 font-medium"
          >
            {phone}
          </a>
        </div>
      </div>
    </div>
  );
}
