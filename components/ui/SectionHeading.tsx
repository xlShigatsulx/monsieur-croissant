import Link from 'next/link';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  viewAllHref,
  viewAllLabel,
}: SectionHeadingProps) {
  return (
    <div className="flex items-end justify-between gap-4 mb-8 sm:mb-10">
      <div>
        {eyebrow && (
          <p className="text-[11px] tracking-[0.2em] uppercase text-caramel/70 mb-2">
            {eyebrow}
          </p>
        )}
        <h2 className="font-cormorant italic text-3xl sm:text-4xl text-mocha font-light">
          {title}
        </h2>
      </div>

      {viewAllHref && viewAllLabel && (
        <Link
          href={viewAllHref}
          className="hidden sm:inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase
            text-mocha/50 hover:text-caramel transition-colors duration-200 whitespace-nowrap pb-1.5"
        >
          {viewAllLabel}
          <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}
