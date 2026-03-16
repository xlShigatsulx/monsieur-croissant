'use client'

import { useAuth } from '@/context/AuthContext'
import { useState, useCallback } from 'react'
import { MobileMenu } from '../Navigation/MobileMenu'
import { NavAuth } from '../Navigation/NavAuth'
import { NavLogo } from '../Navigation/NavLogo'
import { NavMenu } from '../Navigation/NavMenu'
import { CartIcon } from '@/components/pages/cart/CartIcon'

export function Header() {
  const { isAuthenticated, logout, signIn } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const openMobile = useCallback(() => setMobileOpen(true), [])
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <>
      <header
        className='sticky top-0 z-30 w-full bg-cream/90 backdrop-blur-md
        border-b border-caramel/15'
      >
        <div
          className='max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20
          flex items-center justify-between gap-6'
        >
          <NavLogo />

          <nav className='hidden md:flex items-center gap-8'>
            <NavMenu />
          </nav>

          <div className='hidden md:flex items-center gap-4'>
            <CartIcon />
            <NavAuth
              isAuthenticated={isAuthenticated}
              onSignIn={signIn}
              onLogout={logout}
            />
          </div>

          <button
            onClick={openMobile}
            aria-label='Відкрити меню'
            className='md:hidden w-8 h-8 flex items-center justify-center
              text-mocha/70 hover:text-caramel transition-colors duration-200 cursor-pointer'
          >
            <BurgerIcon />
          </button>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        isAuthenticated={isAuthenticated}
        onClose={closeMobile}
        onSignIn={signIn}
        onLogout={logout}
      />
    </>
  )
}

function BurgerIcon() {
  return (
    <svg
      width='22'
      height='22'
      viewBox='0 0 22 22'
      fill='none'
    >
      <path
        d='M3 6h16M3 11h16M3 16h16'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  )
}
