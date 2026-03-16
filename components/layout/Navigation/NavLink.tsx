import Link from 'next/link'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  onClick?: () => void
}

export function NavLink({ href, children, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className='relative font-jost text-[11px] tracking-[0.2em] uppercase text-mocha/70
        hover:text-caramel transition-colors duration-300
        after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px
        after:bg-caramel after:transition-all after:duration-300
        hover:after:w-full'
    >
      {children}
    </Link>
  )
}
