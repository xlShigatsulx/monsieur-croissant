interface Variant {
  id: string
  title: string
  availableForSale: boolean
  price: {
    amount: string
    currencyCode: string
  }
  selectedOptions: {
    name: string
    value: string
  }[]
}

interface VariantSelectorProps {
  variants: Variant[]
  selectedVariantId: string | null
  onSelect: (variantId: string) => void
}

export function VariantSelector({
  variants,
  selectedVariantId,
  onSelect,
}: VariantSelectorProps) {
  if (variants.length <= 1 && variants[0]?.title === 'Default Title') {
    return null
  }

  return (
    <div className='flex flex-col gap-3'>
      <p className='font-jost text-[11px] tracking-[0.2em] uppercase text-mocha/50'>
        Варіант
      </p>
      <div className='flex flex-wrap gap-2'>
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => onSelect(variant.id)}
            disabled={!variant.availableForSale}
            className={`font-jost text-[11px] tracking-[0.15em] uppercase
              px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer
              ${
                selectedVariantId === variant.id
                  ? 'border-caramel bg-caramel/10 text-caramel'
                  : 'border-caramel/30 text-mocha/60 hover:border-caramel hover:text-caramel'
              }
              ${
                !variant.availableForSale
                  ? 'opacity-30 cursor-not-allowed line-through'
                  : ''
              }`}
          >
            {variant.title}
          </button>
        ))}
      </div>
    </div>
  )
}
