'use client';

import { useTranslations } from 'next-intl';
import { NavMenu } from '../Navigation/NavMenu';
import { FooterBrand } from './FooterBrand';
import { FooterHours } from './FooterHours';
import { FooterNewsletter } from './FooterNewsletter';
import { FooterBottom } from './FooterBottom';
import { useShop } from '@/hooks/useShop';

export function Footer() {
  const { shopName, description } = useShop();
  const t = useTranslations('footer');

  return (
    <footer className="w-full bg-cream border-t border-caramel/15 pt-12 pb-6 sm:pt-16 sm:pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Column 1: Brand Info */}
          <FooterBrand description={description} />

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col gap-4">
            <p className="font-serif italic text-lg text-mocha font-semibold tracking-wide">
              {t('navTitle')}
            </p>
            <NavMenu
              handle="footer"
              className="flex flex-col items-start gap-3.5 text-sm"
            />
          </div>

          {/* Column 3: Bakery & Working Hours */}
          <FooterHours />

          {/* Column 4: Newsletter Club */}
          <FooterNewsletter />
        </div>
      </div>

      <FooterBottom shopName={shopName} />
    </footer>
  );
}
