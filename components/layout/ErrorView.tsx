'use client';

import Link from 'next/link';

interface ErrorViewProps {
  title?: string;
  subtitle?: string;
  resetLabel?: string;
  homeLabel?: string;
  showHome?: boolean;
  onReset: () => void;
}

export function ErrorView({
  title = 'Something went wrong',
  subtitle = 'Sorry for the inconvenience, please try again',
  resetLabel = 'Try again',
  homeLabel = 'Go home',
  showHome = true,
  onReset,
}: ErrorViewProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center px-4">
        <p className="font-cormorant italic text-8xl text-caramel/30 font-light leading-none mb-2">
          500
        </p>
        <h1 className="font-cormorant italic text-3xl text-mocha font-light mb-3">
          {title}
        </h1>
        <p className="font-jost text-[11px] tracking-[0.2em] uppercase text-mocha/50 mb-10">
          {subtitle}
        </p>
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={onReset}
            className="font-jost text-[11px] tracking-[0.2em] uppercase
              text-caramel border border-caramel/40 hover:border-caramel
              hover:bg-caramel/10 rounded-full px-8 py-3
              transition-all duration-300 cursor-pointer"
          >
            {resetLabel}
          </button>
          {showHome && (
            <Link
              href="/"
              className="font-jost text-[11px] tracking-[0.2em] uppercase
                text-mocha/60 hover:text-caramel transition-colors duration-300"
            >
              {homeLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
