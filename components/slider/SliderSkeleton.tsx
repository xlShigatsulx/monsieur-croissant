export function SliderSkeleton() {
  return (
    <div className="w-full max-w-3xl">
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          boxShadow:
            '0 32px 64px -12px rgba(58,35,24,0.25), 0 0 0 1px rgba(196,151,122,0.12)',
        }}
      >
        <div className="relative aspect-[4/3] sm:aspect-[16/9] overflow-hidden bg-[#efe0d5]">
          <div className="absolute inset-0 animate-pulse bg-mocha/10" />

          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <div className="h-4 w-1/3 rounded bg-mocha/15 animate-pulse" />
            <div className="h-7 w-2/3 rounded bg-mocha/20 animate-pulse" />
          </div>

          <div className="absolute top-4 right-4 h-5 w-10 rounded-full bg-mocha/15 animate-pulse" />

          <div className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-mocha/15 animate-pulse" />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-mocha/15 animate-pulse" />
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-2 w-2 rounded-full bg-mocha/20 animate-pulse"
          />
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        <div className="h-10 w-36 rounded-xl bg-mocha/15 animate-pulse" />
      </div>
    </div>
  );
}
