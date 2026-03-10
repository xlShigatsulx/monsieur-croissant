'use client'

import { useState, useEffect } from 'react'
import {
  useCartCreateMutation,
  useCartLinesAddMutation,
} from '@/graphql/generated/graphql'

export function useCart() {
  const [cartId, setCartId] = useState<string | null>(null)

  useEffect(() => {
    const savedCartId = localStorage.getItem('cartId')
    if (savedCartId) setCartId(savedCartId)
  }, [])

  const [createCart, { loading: creating }] = useCartCreateMutation()
  const [addLines, { loading: adding }] = useCartLinesAddMutation()

  const addToCart = async (variantId: string, quantity = 1) => {
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
          return data?.cartCreate?.cart
        }
      } else {
        const { data } = await addLines({
          variables: {
            cartId,
            lines: [{ merchandiseId: variantId, quantity }],
          },
        })
        return data?.cartLinesAdd?.cart
      }
    } catch (err) {
      console.error('Помилка при додаванні в кошик:', err)
      throw err
    }
  }

  return {
    cartId,
    addToCart,
    isLoading: creating || adding,
  }
}
