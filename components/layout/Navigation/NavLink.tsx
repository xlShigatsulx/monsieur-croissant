import { Link } from '@/i18n/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function NavLink({ href, children, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="relative inline-flex w-fit self-start items-center font-sans text-xs sm:text-[13px] tracking-[0.14em] font-medium uppercase text-mocha/80
        hover:text-caramel transition-colors duration-200
        after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-0.5
        after:bg-caramel after:transition-all after:duration-200
        hover:after:w-full"
    >
      {children}
    </Link>
  );
}
