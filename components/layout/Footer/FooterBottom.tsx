import { useTranslations } from 'next-intl';
import { PaymentBadges } from './PaymentBadges';

interface FooterBottomProps {
  shopName: string;
}

export function FooterBottom({ shopName }: FooterBottomProps) {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <div className="border-t border-caramel/10 pt-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-mocha/50">
        <p className="text-center sm:text-left">
          {t('rights', { year, shopName })}
        </p>

        <div className="flex items-center gap-5 flex-wrap justify-center">
          <PaymentBadges />
          <span className="text-caramel/30 hidden md:inline">·</span>
          <p className="text-mocha/40 text-[11px] hidden sm:block">
            Powered by Shopify
          </p>
        </div>
      </div>
    </div>
  );
}
