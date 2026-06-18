import ProductSlider from '@/components/slider/ProductSlider'
import { SearchInput } from '@/components/ui/Search/SearchInput'

export default function HomePage() {
  return (
    <div className='min-h-screen flex flex-col items-center px-4 py-10'>
      <ProductSlider />
    </div>
  )
}
