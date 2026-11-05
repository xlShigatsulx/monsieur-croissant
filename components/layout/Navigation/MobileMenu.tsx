'use client';

import { useEffect } from 'react';
import { usePathname } from '@/i18n/navigation';
import { NavLogo } from './NavLogo';
import { NavMenu } from './NavMenu';
import { NavAuth } from './NavAuth';
import { useTranslations } from 'next-intl';

interface MobileMenuProps {
  isOpen: boolean;
  isAuthenticated: boolean;
  onClose: () => void;
  onSignIn: () => Promise<void>;
  onLogout: () => void;
}

export function MobileMenu({
  isOpen,
  isAuthenticated,
  onClose,
  onSignIn,
  onLogout,
}: MobileMenuProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-mocha/30 backdrop-blur-xs z-40
          transition-opacity duration-300
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('menu')}
        className={`fixed top-0 right-0 h-full w-72 bg-cream z-50
          shadow-[-16px_0_48px_-8px_rgba(58,35,24,0.15)]
          transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-6 h-16 sm:h-20">
          <NavLogo />

          <button
            onClick={onClose}
            aria-label={t('closeMenu')}
            className="w-9 h-9 rounded-full border border-caramel/20 flex items-center justify-center
                text-mocha/70 hover:text-caramel hover:border-caramel hover:bg-caramel/10 transition-colors duration-200 cursor-pointer"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="h-px bg-caramel/15 mx-6" />

        <nav className="flex flex-col gap-6 px-6 py-6" aria-label="Mobile Navigation">
          <NavMenu className="flex flex-col gap-4" onItemClick={onClose} />
        </nav>

        <div className="h-px bg-caramel/15 mx-6" />

        <div className="px-6 py-6">
          <NavAuth
            isAuthenticated={isAuthenticated}
            onSignIn={onSignIn}
            onLogout={onLogout}
            onCloseMobile={onClose}
          />
        </div>
      </div>
    </>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M4 4L14 14M14 4L4 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
