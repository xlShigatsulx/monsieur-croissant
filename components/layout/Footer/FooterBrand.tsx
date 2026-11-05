'use client';

import { SocialIcons } from '../../ui/SocialIcons';
import { NavLogo } from '../Navigation/NavLogo';
import { useTranslations } from 'next-intl';

interface FooterBrandProps {
  description?: string;
}

export function FooterBrand({ description }: FooterBrandProps) {
  const t = useTranslations('footer');

  return (
    <div className="flex flex-col gap-4">
      <NavLogo />

      <p className="text-xs sm:text-sm leading-relaxed text-mocha/65 max-w-[280px]">
        {description || t('tagline')}
      </p>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-caramel/10 border border-caramel/20 w-fit text-[11px] font-sans font-medium text-caramel uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-caramel animate-pulse" />
        {t('craftBadge')}
      </div>

      <div className="flex items-center gap-3 pt-1">
        <SocialIcons />
      </div>
    </div>
  );
}
