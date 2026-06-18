import { usePredictiveSearchLazyQuery } from '@/graphql/generated/graphql'
import { useShopifyLocale } from '@/lib/apollo/useShopifyQuery'
import { useState, useRef, useCallback, useEffect } from 'react'

const DEBOUNCE_DELAY = 300
const MIN_QUERY_LENGTH = 2

export function useDebounceSearch() {
  const language = useShopifyLocale()
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )

  const [runSearch, { data, loading }] = usePredictiveSearchLazyQuery()

  const handleChange = useCallback(
    (value: string) => {
      setQuery(value)

      if (debounceTimer.current) clearTimeout(debounceTimer.current)

      if (value.trim().length < MIN_QUERY_LENGTH) {
        setIsOpen(false)
        return
      }

      debounceTimer.current = setTimeout(() => {
        runSearch({ variables: { query: value.trim(), language } })
        setIsOpen(true)
      }, DEBOUNCE_DELAY)
    },
    [runSearch, language]
  )

  const handleFocus = useCallback(() => {
    if (query.trim().length >= MIN_QUERY_LENGTH) setIsOpen(true)
  }, [query])

  const clear = useCallback(() => {
    setQuery('')
    setIsOpen(false)
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
  }, [])

  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [])

  return {
    query,
    isOpen,
    loading,
    products: data?.predictiveSearch?.products ?? [],
    handleChange,
    handleFocus,
    clear,
    close,
  }
}
