'use client';

interface ProductFilterEmptyProps {
  title: string;
  subtitle: string;
  resetText: string;
  onReset: () => void;
}

export function ProductFilterEmpty({
  title,
  subtitle,
  resetText,
  onReset,
}: ProductFilterEmptyProps) {
  return (
    <div className="bg-white/60 border border-caramel/15 rounded-3xl py-16 px-6 text-center max-w-lg mx-auto my-8 flex flex-col items-center">
      <div className="w-14 h-14 rounded-full bg-caramel/10 flex items-center justify-center text-caramel mb-4">
        <svg
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <h3 className="font-serif italic text-2xl text-mocha font-semibold mb-2">
        {title}
      </h3>

      <p className="font-jost text-sm text-mocha/70 max-w-sm mb-6 leading-relaxed">
        {subtitle}
      </p>

      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full
          bg-mocha text-cream text-xs font-medium uppercase tracking-[0.12em]
          hover:bg-caramel hover:shadow-md transition-all duration-300 cursor-pointer"
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        {resetText}
      </button>
    </div>
  );
}
