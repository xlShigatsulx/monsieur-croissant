export function CollectionPageSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="h-48 sm:h-64 bg-caramel/10 animate-pulse" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="rounded-2xl overflow-hidden">
              <div className="aspect-[3/4] bg-caramel/10 animate-pulse" />
              <div className="p-4 flex flex-col gap-2">
                <div className="h-4 w-3/4 bg-caramel/10 rounded animate-pulse" />
                <div className="h-3 w-1/2 bg-caramel/10 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
