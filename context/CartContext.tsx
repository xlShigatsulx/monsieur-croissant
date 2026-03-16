'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  ReactNode,
} from 'react'
import {
  GetCartQuery,
  useCartCreateMutation,
  useCartLinesAddMutation,
  useCartLinesUpdateMutation,
  useCartLinesRemoveMutation,
  useGetCartQuery,
} from '@/graphql/generated/graphql'

const DEBOUNCE_DELAY = 600

interface OptimisticLine {
  lineId: string
  quantity: number
  price: number
}

interface CartDataContextType {
  cartId: string | null
  cart: GetCartQuery['cart'] | undefined
  cartLoading: boolean
  isLoading: boolean
}

interface CartActionsContextType {
  addToCart: (variantId: string, quantity?: number) => Promise<void>
  updateItem: (lineId: string, quantity: number, unitPrice: number) => void
  removeItem: (lineId: string) => Promise<void>
}

interface CartOptimisticContextType {
  optimisticLines: Record<string, OptimisticLine>
}

const CartDataContext = createContext<CartDataContextType | undefined>(
  undefined
)
const CartActionsContext = createContext<CartActionsContextType | undefined>(
  undefined
)
const CartOptimisticContext = createContext<
  CartOptimisticContextType | undefined
>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null)
  const [optimisticLines, setOptimisticLines] = useState<
    Record<string, OptimisticLine>
  >({})

  const debounceTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>(
    {}
  )
  const pendingQuantities = useRef<Record<string, number>>({})

  useEffect(() => {
    const savedCartId = localStorage.getItem('cartId')
    if (savedCartId) setCartId(savedCartId)
  }, [])

  const { data, loading: cartLoading } = useGetCartQuery({
    variables: { cartId: cartId! },
    skip: !cartId,
    fetchPolicy: 'cache-and-network',
  })

  const [createCart, { loading: creating }] = useCartCreateMutation()
  const [addLines, { loading: adding }] = useCartLinesAddMutation()
  const [updateLines] = useCartLinesUpdateMutation()
  const [removeLines] = useCartLinesRemoveMutation()

  const addToCart = useCallback(
    async (variantId: string, quantity = 1) => {
      try {
        if (!cartId) {
          const { data } = await createCart({
            variables: {
              input: { lines: [{ merchandiseId: variantId, quantity }] },
            },
          })
          const newCartId = data?.cartCreate?.cart?.id
          if (newCartId) {
            setCartId(newCartId)
            localStorage.setItem('cartId', newCartId)
          }
        } else {
          await addLines({
            variables: {
              cartId,
              lines: [{ merchandiseId: variantId, quantity }],
            },
          })
        }
      } catch (err) {
        console.error('Помилка при додаванні в кошик:', err)
        throw err
      }
    },
    [cartId, createCart, addLines]
  )

  const updateItem = useCallback(
    (lineId: string, quantity: number, unitPrice: number) => {
      if (!cartId) return

      setOptimisticLines((prev) => ({
        ...prev,
        [lineId]: { lineId, quantity, price: unitPrice },
      }))

      pendingQuantities.current[lineId] = quantity

      if (debounceTimers.current[lineId]) {
        clearTimeout(debounceTimers.current[lineId])
      }

      debounceTimers.current[lineId] = setTimeout(async () => {
        const finalQuantity = pendingQuantities.current[lineId]
        try {
          await updateLines({
            variables: {
              cartId,
              lines: [{ id: lineId, quantity: finalQuantity }],
            },
          })
        } catch (err) {
          console.error('Помилка при оновленні кошика:', err)
        } finally {
          setOptimisticLines((prev) => {
            const next = { ...prev }
            delete next[lineId]
            return next
          })
          delete debounceTimers.current[lineId]
          delete pendingQuantities.current[lineId]
        }
      }, DEBOUNCE_DELAY)
    },
    [cartId, updateLines]
  )

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cartId) return

      if (debounceTimers.current[lineId]) {
        clearTimeout(debounceTimers.current[lineId])
        delete debounceTimers.current[lineId]
        delete pendingQuantities.current[lineId]
      }

      setOptimisticLines((prev) => ({
        ...prev,
        [lineId]: { lineId, quantity: 0, price: 0 },
      }))

      try {
        await removeLines({ variables: { cartId, lineIds: [lineId] } })
      } catch (err) {
        console.error('Помилка при видаленні з кошика:', err)
        throw err
      } finally {
        setOptimisticLines((prev) => {
          const next = { ...prev }
          delete next[lineId]
          return next
        })
      }
    },
    [cartId, removeLines]
  )

  useEffect(() => {
    return () => {
      Object.values(debounceTimers.current).forEach(clearTimeout)
    }
  }, [])

  const dataValue = useMemo<CartDataContextType>(
    () => ({
      cartId,
      cart: data?.cart,
      cartLoading,
      isLoading: creating || adding,
    }),
    [cartId, data?.cart, cartLoading, creating, adding]
  )

  const actionsValue = useMemo<CartActionsContextType>(
    () => ({
      addToCart,
      updateItem,
      removeItem,
    }),
    [addToCart, updateItem, removeItem]
  )

  const optimisticValue = useMemo<CartOptimisticContextType>(
    () => ({
      optimisticLines,
    }),
    [optimisticLines]
  )

  return (
    <CartDataContext.Provider value={dataValue}>
      <CartActionsContext.Provider value={actionsValue}>
        <CartOptimisticContext.Provider value={optimisticValue}>
          {children}
        </CartOptimisticContext.Provider>
      </CartActionsContext.Provider>
    </CartDataContext.Provider>
  )
}

export function useCartData() {
  const context = useContext(CartDataContext)
  if (!context) throw new Error('useCartData must be used within CartProvider')
  return context
}

export function useCartActions() {
  const context = useContext(CartActionsContext)
  if (!context)
    throw new Error('useCartActions must be used within CartProvider')
  return context
}

export function useCartOptimistic() {
  const context = useContext(CartOptimisticContext)
  if (!context)
    throw new Error('useCartOptimistic must be used within CartProvider')
  return context
}
