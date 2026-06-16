'use client'

import { useLocale } from 'next-intl'
import { usePathname, Link } from '@/i18n/navigation'
import { useState, useRef, useEffect } from 'react'

const LOCALES = [
  { code: 'uk', label: 'УКР' },
  { code: 'en', label: 'ENG' },
] as const

type LocaleCode = (typeof LOCALES)[number]['code']

export function LocaleSwitcher() {
  const locale = useLocale() as LocaleCode
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0]

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      ref={ref}
      className='relative'
    >
      <button
        onClick={() => setIsOpen((v) => !v)}
        className='font-jost text-[11px] tracking-[0.2em] uppercase
          flex items-center gap-1.5
          text-mocha/50 hover:text-caramel transition-colors duration-200
          cursor-pointer'
      >
        {current.label}
        <ChevronDown isOpen={isOpen} />
      </button>

      {isOpen && (
        <ul
          className='absolute top-full left-1/2 -translate-x-1/2 mt-2
            bg-cream border border-caramel/15 rounded-xl
            shadow-[0_8px_24px_-4px_rgba(58,35,24,0.12)]
            overflow-hidden min-w-[64px]'
        >
          {LOCALES.map(({ code, label }) => (
            <li key={code}>
              <Link
                href={pathname}
                locale={code}
                onClick={() => setIsOpen(false)}
                className={`block w-full px-4 py-2.5 font-jost text-[11px] tracking-[0.2em] uppercase
                  transition-colors duration-200 text-center
                  ${
                    code === locale
                      ? 'text-caramel bg-caramel/5'
                      : 'text-mocha/50 hover:text-caramel hover:bg-caramel/5'
                  }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function ChevronDown({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width='10'
      height='10'
      viewBox='0 0 10 10'
      fill='none'
      className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
    >
      <path
        d='M2 3.5L5 6.5L8 3.5'
        stroke='currentColor'
        strokeWidth='1.4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
