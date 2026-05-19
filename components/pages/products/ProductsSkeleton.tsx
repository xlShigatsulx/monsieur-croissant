export function ProductsSkeleton() {
  return (
    <div className='min-h-screen'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24'>
        <div className='h-10 w-48 bg-caramel/10 rounded animate-pulse mb-3' />
        <div className='h-3 w-32 bg-caramel/10 rounded animate-pulse mb-12' />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className='flex flex-col gap-4'
            >
              <div className='aspect-[3/4] bg-caramel/10 rounded-2xl animate-pulse' />
              <div className='h-4 w-3/4 bg-caramel/10 rounded animate-pulse' />
              <div className='h-3 w-1/3 bg-caramel/10 rounded animate-pulse' />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
