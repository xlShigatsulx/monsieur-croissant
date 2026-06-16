import { NavLogo } from './NavLogo'
import { NavMenu } from './NavMenu'
import { NavAuth } from './NavAuth'
import { useTranslations } from 'next-intl'

interface MobileMenuProps {
  isOpen: boolean
  isAuthenticated: boolean
  onClose: () => void
  onSignIn: () => Promise<void>
  onLogout: () => void
}

export function MobileMenu({
  isOpen,
  isAuthenticated,
  onClose,
  onSignIn,
  onLogout,
}: MobileMenuProps) {
  const t = useTranslations('nav')
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-mocha/20 backdrop-blur-sm z-40
          transition-opacity duration-300
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-cream z-50
          shadow-[-16px_0_48px_-8px_rgba(58,35,24,0.15)]
          transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className='flex items-center justify-between px-6 h-16 sm:h-20'>
          <NavLogo />

          <button
            onClick={onClose}
            aria-label={t('closeMenu')}
            className='w-8 h-8 flex items-center justify-center
                text-mocha/50 hover:text-caramel transition-colors duration-200 cursor-pointer'
          >
            <CloseIcon />
          </button>
        </div>

        <div className='h-px bg-caramel/15 mx-6' />

        <nav className='flex flex-col gap-6 px-6 py-4'>
          <NavMenu
            className='flex flex-col gap-3'
            onItemClick={onClose}
          />
        </nav>

        <div className='h-px bg-caramel/15 mx-6' />

        <div className='px-6 py-4'>
          <NavAuth
            isAuthenticated={isAuthenticated}
            onSignIn={onSignIn}
            onLogout={onLogout}
            onCloseMobile={onClose}
          />
        </div>
      </div>
    </>
  )
}

function CloseIcon() {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
    >
      <path
        d='M4 4L14 14M14 4L4 14'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  )
}
