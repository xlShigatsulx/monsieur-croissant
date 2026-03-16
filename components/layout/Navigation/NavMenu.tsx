'use client'

import { GetMenuQuery, useGetMenuQuery } from '@/graphql/generated/graphql'
import { NavLink } from './NavLink'

const MENU_HANDLE = 'main-menu'

type MenuItem = NonNullable<GetMenuQuery['menu']>['items'][number]

interface NavMenuProps {
  onItemClick?: () => void
}

export function NavMenu({ onItemClick }: NavMenuProps) {
  const { data, loading } = useGetMenuQuery({
    variables: { handle: MENU_HANDLE },
  })

  if (loading) return <NavMenuSkeleton />

  const items = data?.menu?.items ?? []

  return (
    <>
      {items.map((item: MenuItem) => (
        <NavLink
          key={item.id}
          href={resolveUrl(item.url)}
          onClick={onItemClick}
        >
          {item.title}
        </NavLink>
      ))}
    </>
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
