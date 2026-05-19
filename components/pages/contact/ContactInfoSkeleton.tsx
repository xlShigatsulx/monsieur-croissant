function SkeletonCard({ lines = 1 }: { lines?: number }) {
  return (
    <div className='bg-white/60 backdrop-blur-sm border border-caramel/15 rounded-2xl px-6 py-6 flex flex-col gap-4'>
      <div className='space-y-2'>
        <div className='h-4 w-16 bg-caramel/10 rounded animate-pulse' />
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className='h-3 bg-caramel/10 rounded animate-pulse'
            style={{ width: `${140 - i * 16}px` }}
          />
        ))}
      </div>
    </div>
  )
}

export function ContactInfoSkeleton() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      <SkeletonCard lines={2} />
      <SkeletonCard lines={1} />

      <div className='sm:col-span-2 h-px bg-caramel/15' />

      <SkeletonCard lines={2} />
      <SkeletonCard lines={1} />

      <div className='sm:col-span-2 h-70 bg-caramel/10 rounded-2xl animate-pulse' />
    </div>
  )
}
