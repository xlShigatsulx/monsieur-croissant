import { useGetMenuQuery } from '@/graphql/generated/graphql'
import Link from 'next/link'

const InstagramIcon = (props: any) => (
  <svg
    {...props}
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <rect
      width='20'
      height='20'
      x='2'
      y='2'
      rx='5'
      ry='5'
    />
    <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
    <line
      x1='17.5'
      x2='17.51'
      y2='6.5'
    />
  </svg>
)

const FacebookIcon = (props: any) => (
  <svg
    {...props}
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
  </svg>
)

const SOCIAL_ICONS: Record<string, React.ComponentType<any>> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
}

export function SocialIcons() {
  const { data } = useGetMenuQuery({ variables: { handle: 'social-menu' } })
  const items = data?.menu?.items ?? []

  return (
    <div className='flex items-center gap-3'>
      {items.map((item) => {
        const platform = item.title.toLowerCase()
        const Icon = SOCIAL_ICONS[platform]

        if (!Icon) return null

        return (
          <Link
            key={item.id}
            href={item.url ?? '#'}
            target='_blank'
            rel='noopener noreferrer'
            className='w-8 h-8 flex items-center justify-center rounded-full
              text-mocha/45 hover:text-caramel hover:bg-caramel/8
              transition-all duration-200'
            aria-label={item.title}
          >
            <Icon
              className='w-5 h-5'
              strokeWidth={1.5}
            />
          </Link>
        )
      })}
    </div>
  )
}
