import Slider from '@/components/slider/Slider'
import { SliderCta } from '@/components/slider/SliderCta'

export function HomePage() {
  return (
    <main>
      <div className='flex flex-col items-center justify-center px-4 py-10 font-jost'>
        <Slider />

        <SliderCta />
      </div>
    </main>
  )
}
