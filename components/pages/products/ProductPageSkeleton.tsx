export function ProductPageSkeleton() {
  return (
    <main className='min-h-screen bg-cream'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16'>
        <div className='flex flex-col lg:flex-row gap-12'>
          <div className='lg:w-1/2'>
            <div className='aspect-square bg-caramel/10 rounded-2xl animate-pulse' />
          </div>
          <div className='lg:w-1/2 flex flex-col gap-6'>
            <div className='h-8 w-3/4 bg-caramel/10 rounded animate-pulse' />
            <div className='h-6 w-1/4 bg-caramel/10 rounded animate-pulse' />
            <div className='flex flex-col gap-2'>
              <div className='h-3 w-full bg-caramel/10 rounded animate-pulse' />
              <div className='h-3 w-full bg-caramel/10 rounded animate-pulse' />
              <div className='h-3 w-2/3 bg-caramel/10 rounded animate-pulse' />
            </div>
            <div className='h-12 w-full bg-caramel/10 rounded-full animate-pulse mt-4' />
          </div>
        </div>
      </div>
    </main>
  )
}
