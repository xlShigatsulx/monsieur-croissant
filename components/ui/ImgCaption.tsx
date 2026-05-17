interface ImgCaptionProps {
  title: string
  titleSize?: string
  description?: string | null
  descriptionSize?: string
  price?: string
  availableForSale?: boolean
}

export function ImgCaption({
  title,
  titleSize = 'text-2xl',
  description,
  descriptionSize = 'text-xs sm:text-sm',
  price,
  availableForSale,
}: ImgCaptionProps) {
  const textShadow = '0 1px 8px rgba(0,0,0,0.6), 0 2px 24px rgba(0,0,0,0.4)'

  return (
    <div className='absolute bottom-0 left-0 right-0 px-5 pb-5 sm:px-8 sm:pb-7'>
      <h2
        className={`font-cormorant text-white ${titleSize} font-light italic leading-tight mb-1`}
        style={{ textShadow }}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`font-jost text-white/75 ${descriptionSize} font-light leading-relaxed max-w-sm`}
          style={{ textShadow }}
        >
          {description}
        </p>
      )}
      {price && (
        <span
          className='inline-block font-cormorant text-amber-200 text-base sm:text-lg tracking-wide'
          style={{ textShadow }}
        >
          від {price} ₴
        </span>
      )}
      {!availableForSale && (
        <span
          className='font-jost text-[9px] tracking-[0.15em] uppercase
              text-mocha/30'
        >
          Немає в наявності
        </span>
      )}
    </div>
  )
}
