export function HeroSkeleton() {
  return (
    <div className='text-center py-12 space-y-4'>
      <div className='h-10 w-64 bg-caramel/10 rounded animate-pulse mx-auto' />
      <div className='h-4 w-80 bg-caramel/10 rounded animate-pulse mx-auto' />
      <div className='h-4 w-64 bg-caramel/10 rounded animate-pulse mx-auto' />
      <div className='h-10 w-36 bg-caramel/10 rounded-full animate-pulse mx-auto mt-2' />
    </div>
  )
}
