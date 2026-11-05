export function ProductPageSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-48 bg-caramel/10 rounded animate-pulse mb-8" />

        {/* 2-Column Hero Skeleton */}
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16 items-start">
          <div className="w-full lg:w-1/2">
            <div className="aspect-square bg-caramel/10 rounded-3xl animate-pulse" />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="h-4 w-32 bg-caramel/10 rounded animate-pulse" />
            <div className="h-10 w-3/4 bg-caramel/10 rounded animate-pulse" />
            <div className="h-8 w-28 bg-caramel/10 rounded animate-pulse" />
            <div className="h-24 w-full bg-caramel/10 rounded-2xl animate-pulse" />
            <div className="h-14 w-full bg-caramel/10 rounded-full animate-pulse" />
            <div className="grid grid-cols-2 gap-3 pt-6">
              <div className="h-16 bg-caramel/10 rounded-xl animate-pulse" />
              <div className="h-16 bg-caramel/10 rounded-xl animate-pulse" />
            </div>
            <div className="space-y-3 pt-4">
              <div className="h-12 bg-caramel/10 rounded-2xl animate-pulse" />
              <div className="h-12 bg-caramel/10 rounded-2xl animate-pulse" />
            </div>
          </div>
        </div>

        {/* Craftsmanship Skeleton */}
        <div className="mt-20 pt-16 border-t border-caramel/15">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-44 bg-caramel/10 rounded-3xl animate-pulse" />
            <div className="h-44 bg-caramel/10 rounded-3xl animate-pulse" />
            <div className="h-44 bg-caramel/10 rounded-3xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
