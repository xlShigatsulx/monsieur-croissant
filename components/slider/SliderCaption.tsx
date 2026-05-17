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
  const textShadow = '0 1px 8px rgba(0,0,0,0.6), 0 2px 24px rgba(0,0,0,0.4)'

  return (
    <div className='absolute bottom-0 left-0 right-0 px-5 pb-5 sm:px-8 sm:pb-7'>
      <h2
        className='font-cormorant text-white text-2xl sm:text-4xl font-light italic leading-tight mb-1'
        style={{ textShadow }}
      >
        {title}
      </h2>
      <p
        className='font-jost text-white/75 text-xs sm:text-sm font-light leading-relaxed max-w-sm'
        style={{ textShadow }}
      >
        {description}
      </p>
      <span
        className='inline-block font-cormorant text-amber-200 text-base sm:text-lg tracking-wide'
        style={{ textShadow }}
      >
        від {price} ₴
      </span>
    </div>
  )
}
