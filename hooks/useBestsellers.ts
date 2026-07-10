import { useCollectionByHandle } from './useCollectionByHandle';

const BESTSELLERS_HANDLE = 'bestsellers';
const DEFAULT_COUNT = 8;

export function useBestsellers(first: number = DEFAULT_COUNT) {
  const { products, loading, error } = useCollectionByHandle(
    BESTSELLERS_HANDLE,
    first,
  );

  return { products, loading, error };
}
