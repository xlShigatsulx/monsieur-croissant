import { createNavigation } from 'next-intl/navigation'

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales: ['uk', 'en'],
  defaultLocale: 'uk',
  localePrefix: 'as-needed',
})
