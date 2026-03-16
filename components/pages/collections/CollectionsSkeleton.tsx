export function CollectionsSkeleton() {
  return (
    <main className='min-h-screen bg-cream'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24'>
        <div className='h-10 w-48 bg-caramel/10 rounded animate-pulse mb-3' />
        <div className='h-3 w-32 bg-caramel/10 rounded animate-pulse mb-12' />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className='rounded-2xl overflow-hidden'
            >
              <div className='aspect-[4/3] bg-caramel/10 animate-pulse' />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
