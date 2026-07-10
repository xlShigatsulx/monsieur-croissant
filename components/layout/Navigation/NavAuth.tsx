import { pageConfig } from '@/config/pages.config';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface NavAuthProps {
  isAuthenticated: boolean;
  onSignIn: () => Promise<void>;
  onLogout: () => void;
  onCloseMobile?: () => void;
}

export function NavAuth({
  isAuthenticated,
  onSignIn,
  onLogout,
  onCloseMobile,
}: NavAuthProps) {
  const t = useTranslations('nav');

  const handleLogout = () => {
    onLogout();
    onCloseMobile?.();
  };

  const handleSignIn = async () => {
    onCloseMobile?.();
    await onSignIn();
  };

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href={pageConfig.profile}
          onClick={onCloseMobile}
          aria-label={t('profile')}
          className="w-8 h-8 rounded-full border border-caramel/70 hover:border-caramel
            flex items-center justify-center text-caramel
            hover:bg-caramel/70 transition-all duration-300"
        >
          <ProfileIcon />
        </Link>

        <button
          onClick={handleLogout}
          className="font-jost text-[11px] tracking-[0.2em] uppercase
            text-mocha/60 hover:text-caramel transition-colors duration-300 cursor-pointer"
        >
          {t('logout')}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={handleSignIn}
        className="font-jost text-[11px] tracking-[0.2em] uppercase
        text-caramel border border-caramel/40 hover:border-caramel
        hover:bg-caramel/10 rounded-full px-4 py-1.5
        transition-all duration-300 cursor-pointer"
      >
        {t('login')}
      </button>
    </div>
  );
}

function ProfileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
