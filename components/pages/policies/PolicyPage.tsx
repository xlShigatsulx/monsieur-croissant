'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { pageConfig } from '@/config/pages.config';

interface PolicyPageProps {
  policy: string;
  title?: string;
  body?: string;
}

export function PolicyPage({ policy, title, body }: PolicyPageProps) {
  const t = useTranslations('policies');

  const displayTitle =
    title ||
    policy
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <Link
            href={pageConfig.home}
            className="font-jost text-xs tracking-[0.15em] uppercase text-caramel hover:underline mb-6 inline-block"
          >
            ← {t('backHome')}
          </Link>
          <h1 className="font-cormorant italic text-4xl sm:text-5xl text-mocha font-light mb-4">
            {displayTitle}
          </h1>
          <div className="w-12 h-px bg-caramel/40 mb-6" />
        </div>

        {body ? (
          <div
            className="prose prose-mocha max-w-none font-jost text-sm sm:text-base text-mocha/80 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        ) : (
          <div className="bg-white/60 rounded-2xl p-8 border border-caramel/15 text-center py-14">
            <p className="font-jost text-sm text-mocha/60 mb-6">
              {t('notFound')}
            </p>
            <Link
              href={pageConfig.home}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full
                bg-mocha text-cream text-xs font-medium uppercase tracking-[0.15em]
                hover:bg-caramel transition-colors duration-300"
            >
              {t('backHome')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
