export function HeroSkeleton() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24 flex flex-col items-center gap-4">
      <div className="h-4 w-32 bg-caramel/10 rounded animate-pulse" />
      <div className="h-10 sm:h-14 w-56 sm:w-80 bg-caramel/10 rounded animate-pulse" />
      <div className="w-12 h-px bg-caramel/20 my-1" />
      <div className="h-4 w-72 max-w-full bg-caramel/10 rounded animate-pulse" />
      <div className="h-4 w-56 max-w-full bg-caramel/10 rounded animate-pulse" />
      <div className="h-10 w-36 bg-caramel/10 rounded-full animate-pulse mt-2" />
    </div>
  );
}
