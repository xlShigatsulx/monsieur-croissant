'use client'

import { GetMenuQuery, useGetMenuQuery } from '@/graphql/generated/graphql'
import { NavLink } from './NavLink'

type MenuItem = NonNullable<GetMenuQuery['menu']>['items'][number]

interface NavMenuProps {
  handle?: string
  onItemClick?: () => void
  className?: string
}

export function NavMenu({
  handle = 'main-menu',
  onItemClick,
  className,
}: NavMenuProps) {
  const { data, loading } = useGetMenuQuery({
    variables: { handle },
  })

  if (loading) return <NavMenuSkeleton />

  const items = data?.menu?.items ?? []

  return (
    <nav className={className}>
      {items.map((item: MenuItem) => (
        <NavLink
          key={item.id}
          href={resolveUrl(item.url)}
          onClick={onItemClick}
        >
          {item.title}
        </NavLink>
      ))}
    </nav>
  )
}

function NavMenuSkeleton() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className='h-3 w-16 bg-caramel/20 rounded animate-pulse'
        />
      ))}
    </>
  )
}

function resolveUrl(url: string | null | undefined): string {
  if (!url) return '/'
  try {
    const { pathname } = new URL(url)
    return pathname
  } catch {
    return url
  }
}
