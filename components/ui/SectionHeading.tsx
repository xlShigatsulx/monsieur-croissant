import Link from 'next/link';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  viewAllHref?: string;
  viewAllLabel?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  viewAllHref,
  viewAllLabel,
}: SectionHeadingProps) {
  return (
    <div
      className={`flex items-end justify-between gap-4 mb-8 sm:mb-10 ${
        align === 'center' ? 'text-center flex-col items-center' : ''
      }`}
    >
      <div>
        {eyebrow && (
          <p className="text-[11px] tracking-[0.2em] uppercase text-caramel font-medium mb-2">
            {eyebrow}
          </p>
        )}
        <h2 className="font-cormorant italic text-3xl sm:text-4xl text-mocha font-semibold">
          {title}
        </h2>
        {subtitle && (
          <p className="text-mocha/55 italic text-sm sm:text-base mt-2">
            {subtitle}
          </p>
        )}
      </div>

      {viewAllHref && viewAllLabel && (
        <Link
          href={viewAllHref}
          className="hidden sm:inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase
            text-mocha/50 hover:text-caramel transition-colors duration-200 whitespace-nowrap pb-1.5
            border-b border-mocha/30 hover:border-caramel"
        >
          {viewAllLabel}
        </Link>
      )}
    </div>
  );
}
