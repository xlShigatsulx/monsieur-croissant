export function CartSkeleton() {
  return (
    <div className='max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 bg-cream m-auto'>
      <div className='h-10 w-32 bg-caramel/10 rounded animate-pulse mb-12' />
      <div className='flex flex-col gap-6'>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className='flex gap-6 pb-6 border-b border-caramel/15'
          >
            <div className='w-24 h-24 bg-caramel/10 rounded-lg animate-pulse shrink-0' />
            <div className='flex-1 flex flex-col gap-3'>
              <div className='h-5 w-48 bg-caramel/10 rounded animate-pulse' />
              <div className='h-3 w-24 bg-caramel/10 rounded animate-pulse' />
              <div className='h-4 w-32 bg-caramel/10 rounded animate-pulse mt-auto' />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
