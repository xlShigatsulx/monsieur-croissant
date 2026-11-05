import Link from 'next/link';

interface NotFoundViewProps {
  title?: string;
  subtitle?: string;
  homeLabel?: string;
}

export function NotFoundView({
  title = 'Page not found',
  subtitle = 'Unfortunately, this page does not exist or has been moved',
  homeLabel = 'Go home',
}: NotFoundViewProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cream">
      <div className="text-center px-4">
        <p className="font-serif italic text-8xl text-caramel/70 font-semibold leading-none mb-2">
          404
        </p>
        <h1 className="font-serif italic text-3xl sm:text-4xl text-mocha font-semibold mb-3">
          {title}
        </h1>
        <p className="font-jost text-[11px] tracking-[0.2em] uppercase text-mocha/70 mb-10">
          {subtitle}
        </p>
        <Link
          href="/"
          className="font-jost text-[11px] tracking-[0.2em] uppercase
            text-caramel border border-caramel/40 hover:border-caramel
            hover:bg-caramel/50 rounded-full px-8 py-3
            transition-all duration-300"
        >
          {homeLabel}
        </Link>
      </div>
    </div>
  );
}
