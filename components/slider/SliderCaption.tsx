interface SliderCaptionProps {
  title: string
  description: string
  price: string
}

export function SliderCaption({
  title,
  description,
  price,
}: SliderCaptionProps) {
  return (
    <div className='absolute bottom-0 left-0 right-0 px-5 pb-5 sm:px-8 sm:pb-7'>
      <h2 className='font-cormorant text-white text-2xl sm:text-4xl font-light italic leading-tight mb-1'>
        {title}
      </h2>
      <p className='font-jost text-white/60 text-xs sm:text-sm font-light leading-relaxed max-w-sm'>
        {description}
      </p>
      <span className='inline-block font-cormorant text-amber-200 text-base sm:text-lg tracking-wide'>
        від {price} ₴
      </span>
    </div>
  )
}
