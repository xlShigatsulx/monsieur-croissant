'use client';

interface ProductFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  inStockOnly: boolean;
  onInStockChange: (value: boolean) => void;
  onReset: () => void;
  searchPlaceholder: string;
  inStockLabel: string;
  sortLabel: string;
  sortOptions: {
    default: string;
    priceAsc: string;
    priceDesc: string;
    titleAsc: string;
  };
  showingCountText: string;
  resetText: string;
}

export function ProductFilterBar({
  search,
  onSearchChange,
  sortBy,
  onSortChange,
  inStockOnly,
  onInStockChange,
  onReset,
  searchPlaceholder,
  inStockLabel,
  sortLabel,
  sortOptions,
  showingCountText,
  resetText,
}: ProductFilterBarProps) {
  const isFiltered = Boolean(search.trim()) || inStockOnly || sortBy !== 'default';

  return (
    <div className="bg-white/70 backdrop-blur-md border border-caramel/20 rounded-2xl p-4 sm:p-5 shadow-[0_4px_20px_rgba(58,35,24,0.04)] mb-8 sm:mb-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Search input */}
        <div className="relative flex-1 max-w-md">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mocha/45 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full h-10 pl-9 pr-9 rounded-full bg-white/90 border border-caramel/25
              text-xs sm:text-sm text-mocha placeholder:text-mocha/40
              focus:outline-none focus:border-caramel focus:ring-2 focus:ring-caramel/20
              transition-all duration-200"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center
                text-mocha/40 hover:text-mocha text-sm font-bold cursor-pointer"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Right: Controls (In-stock toggle, Sort dropdown, and Counter) */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* In-stock toggle pill */}
          <button
            type="button"
            onClick={() => onInStockChange(!inStockOnly)}
            className={`inline-flex items-center gap-2 h-10 px-4 rounded-full text-xs font-medium tracking-wide uppercase transition-all duration-200 cursor-pointer ${
              inStockOnly
                ? 'bg-mocha text-cream border border-mocha shadow-xs'
                : 'bg-white/80 text-mocha/75 border border-caramel/25 hover:border-caramel/50'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full transition-colors ${
                inStockOnly ? 'bg-emerald-400' : 'bg-caramel/40'
              }`}
            />
            {inStockLabel}
          </button>

          {/* Sort dropdown */}
          <div className="relative inline-flex items-center">
            <label htmlFor="product-sort" className="sr-only">
              {sortLabel}
            </label>
            <select
              id="product-sort"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="h-10 pl-3.5 pr-8 rounded-full bg-white/80 border border-caramel/25
                text-xs sm:text-sm text-mocha/80 font-medium
                focus:outline-none focus:border-caramel focus:ring-2 focus:ring-caramel/20
                transition-all duration-200 appearance-none cursor-pointer"
            >
              <option value="default">{sortOptions.default}</option>
              <option value="price-asc">{sortOptions.priceAsc}</option>
              <option value="price-desc">{sortOptions.priceDesc}</option>
              <option value="title-asc">{sortOptions.titleAsc}</option>
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-mocha/50 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Counter pill */}
          <div className="h-10 px-3.5 rounded-full bg-caramel/10 border border-caramel/15 flex items-center justify-center text-xs font-medium text-mocha/70 whitespace-nowrap">
            {showingCountText}
          </div>

          {/* Reset button */}
          {isFiltered && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 h-10 px-3.5 rounded-full
                bg-caramel/15 hover:bg-caramel/25 text-caramel text-xs font-medium
                transition-colors duration-200 cursor-pointer"
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
              <span>{resetText}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
