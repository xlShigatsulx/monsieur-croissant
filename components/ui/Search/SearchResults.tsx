import { useTranslations } from 'next-intl'
import { SearchResultItem } from './SearchResultItem'
import { PredictiveSearchQuery } from '@/graphql/generated/graphql'

type Product = NonNullable<
  PredictiveSearchQuery['predictiveSearch']
>['products'][number]

interface SearchResultsProps {
  products: Product[]
  loading: boolean
  onSelect: () => void
}

export function SearchResults({
  products,
  loading,
  onSelect,
}: SearchResultsProps) {
  const t = useTranslations('search')

  return (
    <div
      className='absolute top-full left-0 right-0 mt-2 bg-cream rounded-2xl
        shadow-xl border border-mocha/10 overflow-hidden z-50'
    >
      {loading && (
        <div className='px-5 py-4 text-sm text-mocha/50 font-jost'>
          {t('loading')}
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className='px-5 py-4 text-sm text-mocha/50 font-jost'>
          {t('noResults')}
        </div>
      )}

      {!loading &&
        products.map((product) => (
          <SearchResultItem
            key={product.id}
            product={product}
            onSelect={onSelect}
          />
        ))}
    </div>
  )
}
