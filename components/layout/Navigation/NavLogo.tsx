'use client';

import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useShop } from '@/hooks/useShop';

interface NavLogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export function NavLogo({
  className = '',
  showSubtitle = true,
}: NavLogoProps) {
  const { shopName, logo } = useShop();
  const logoSrc = logo?.url || '/images/logo.webp';
  const name = shopName || 'Monsieur Croissant';

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 sm:gap-3 group select-none ${className}`}
      aria-label={name}
    >
      <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full overflow-hidden shadow-xs ring-1 ring-caramel/25 group-hover:ring-caramel/50 transition-all duration-300">
        <Image
          src={logoSrc}
          alt={logo?.altText ?? name}
          width={44}
          height={44}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          priority
        />
      </div>

      <div className="flex flex-col">
        <span className="font-serif italic text-mocha text-xl sm:text-2xl font-semibold tracking-wide leading-none group-hover:text-caramel transition-colors duration-300">
          {name}
        </span>
        {showSubtitle && (
          <span className="font-sans text-[8px] sm:text-[9.5px] uppercase tracking-[0.22em] text-caramel font-semibold mt-1 leading-none">
            Boulangerie Artisanale
          </span>
        )}
      </div>
    </Link>
  );
}
