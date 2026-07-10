import { PredictiveSearchQuery } from '@/graphql/generated/graphql';
import Link from 'next/link';

type Product = NonNullable<
  PredictiveSearchQuery['predictiveSearch']
>['products'][number];

interface SearchResultItemProps {
  product: Product;
  onSelect: () => void;
}

export function SearchResultItem({ product, onSelect }: SearchResultItemProps) {
  return (
    <Link
      href={`/products/${product.handle}`}
      onClick={onSelect}
      className="flex items-center gap-3 px-5 py-3 hover:bg-mocha/5 transition-colors"
    >
      {product.featuredImage && (
        <img
          src={product.featuredImage.url}
          alt={product.featuredImage.altText ?? product.title}
          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
        />
      )}
      <div className="flex-1 min-w-0">
        <p className="font-jost text-sm text-mocha truncate">{product.title}</p>
        <p className="font-jost text-xs text-mocha/50">
          {product.priceRange.minVariantPrice.amount}{' '}
          {product.priceRange.minVariantPrice.currencyCode}
        </p>
      </div>
    </Link>
  );
}
