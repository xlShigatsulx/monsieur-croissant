'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  ReactNode,
} from 'react';
import Cookies from 'js-cookie';
import {
  GetCartQuery,
  GetCartDocument,
  useCartCreateMutation,
  useCartLinesAddMutation,
  useCartLinesUpdateMutation,
  useCartLinesRemoveMutation,
  useGetCartQuery,
} from '@/graphql/generated/graphql';
import { useShopifyLocale } from '@/lib/apollo/useShopifyQuery';

const DEBOUNCE_DELAY = 600;
const CART_ID_KEY = 'cartId';
const CART_ID_COOKIE_DAYS = 30;

function readCartId(): string | null {
  try {
    const fromStorage = localStorage.getItem(CART_ID_KEY);
    if (fromStorage) return fromStorage;
  } catch {}
  return Cookies.get(CART_ID_KEY) ?? null;
}

function writeCartId(cartId: string) {
  try {
    localStorage.setItem(CART_ID_KEY, cartId);
  } catch {}
  try {
    const isSecure =
      typeof window !== 'undefined' && window.location.protocol === 'https:';
    Cookies.set(CART_ID_KEY, cartId, {
      expires: CART_ID_COOKIE_DAYS,
      sameSite: 'lax',
      secure: isSecure,
    });
  } catch {}
}

function clearStoredCartId() {
  try {
    localStorage.removeItem(CART_ID_KEY);
  } catch {}
  try {
    Cookies.remove(CART_ID_KEY);
  } catch {}
}

interface OptimisticLine {
  lineId: string;
  quantity: number;
  price: number;
}

interface CartDataContextType {
  cartId: string | null;
  cart: GetCartQuery['cart'] | undefined;
  cartLoading: boolean;
  isLoading: boolean;
  isDrawerOpen: boolean;
}

interface CartActionsContextType {
  addToCart: (
    variantId: string,
    quantity?: number,
    openDrawerAfter?: boolean,
  ) => Promise<void>;
  updateItem: (lineId: string, quantity: number, unitPrice: number) => void;
  removeItem: (lineId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

interface CartOptimisticContextType {
  optimisticLines: Record<string, OptimisticLine>;
}

const CartDataContext = createContext<CartDataContextType | undefined>(
  undefined,
);
const CartActionsContext = createContext<CartActionsContextType | undefined>(
  undefined,
);
const CartOptimisticContext = createContext<
  CartOptimisticContextType | undefined
>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const language = useShopifyLocale();
  const [cartId, setCartId] = useState<string | null>(() =>
    typeof window === 'undefined' ? null : readCartId(),
  );
  const [optimisticLines, setOptimisticLines] = useState<
    Record<string, OptimisticLine>
  >({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setIsDrawerOpen((v) => !v), []);

  const debounceTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>(
    {},
  );
  const pendingQuantities = useRef<Record<string, number>>({});

  const { data, loading: cartLoading } = useGetCartQuery({
    variables: { cartId: cartId!, language },
    skip: !cartId,
    fetchPolicy: 'cache-and-network',
  });

  // Self-heal stale / expired cart IDs from localStorage or cookies
  useEffect(() => {
    if (!cartLoading && cartId && data && !data.cart) {
      console.warn('Detected stale/expired cart on Shopify, clearing stored cartId');
      clearStoredCartId();
      setCartId(null);
    }
  }, [cartLoading, cartId, data]);

  const [createCart, { loading: creating }] = useCartCreateMutation();
  const [addLines, { loading: adding }] = useCartLinesAddMutation();
  const [updateLines] = useCartLinesUpdateMutation();
  const [removeLines] = useCartLinesRemoveMutation();

  const addToCart = useCallback(
    async (variantId: string, quantity = 1, openDrawerAfter = true) => {
      try {
        let activeCartId = cartId;

        if (!activeCartId) {
          const res = await createCart({
            variables: {
              input: { lines: [{ merchandiseId: variantId, quantity }] },
              language,
            },
            update(cache, { data: mutationData }) {
              const createdCart = mutationData?.cartCreate?.cart;
              if (createdCart) {
                cache.writeQuery({
                  query: GetCartDocument,
                  variables: { cartId: createdCart.id, language },
                  data: { cart: createdCart },
                });
              }
            },
          });

          const newCartId = res.data?.cartCreate?.cart?.id;
          if (newCartId) {
            setCartId(newCartId);
            writeCartId(newCartId);
          }
        } else {
          const res = await addLines({
            variables: {
              cartId: activeCartId,
              lines: [{ merchandiseId: variantId, quantity }],
              language,
            },
            update(cache, { data: mutationData }) {
              const updatedCart = mutationData?.cartLinesAdd?.cart;
              if (updatedCart) {
                cache.writeQuery({
                  query: GetCartDocument,
                  variables: { cartId: activeCartId, language },
                  data: { cart: updatedCart },
                });
              }
            },
          });

          const userErrors = res.data?.cartLinesAdd?.userErrors;
          const updatedCart = res.data?.cartLinesAdd?.cart;

          // If cart has expired, is invalid or returned userErrors, recreate it immediately!
          if (!updatedCart || (userErrors && userErrors.length > 0)) {
            console.warn(
              'Failed to add lines to existing cart, recreating cart...',
              userErrors,
            );
            clearStoredCartId();
            const createRes = await createCart({
              variables: {
                input: { lines: [{ merchandiseId: variantId, quantity }] },
                language,
              },
              update(cache, { data: mutationData }) {
                const createdCart = mutationData?.cartCreate?.cart;
                if (createdCart) {
                  cache.writeQuery({
                    query: GetCartDocument,
                    variables: { cartId: createdCart.id, language },
                    data: { cart: createdCart },
                  });
                }
              },
            });

            const newCartId = createRes.data?.cartCreate?.cart?.id;
            if (newCartId) {
              setCartId(newCartId);
              writeCartId(newCartId);
            }
          }
        }

        if (openDrawerAfter) {
          setIsDrawerOpen(true);
        }
      } catch (err) {
        console.warn('Error adding to cart, attempting fallback cart creation:', err);
        try {
          clearStoredCartId();
          const createRes = await createCart({
            variables: {
              input: { lines: [{ merchandiseId: variantId, quantity }] },
              language,
            },
            update(cache, { data: mutationData }) {
              const createdCart = mutationData?.cartCreate?.cart;
              if (createdCart) {
                cache.writeQuery({
                  query: GetCartDocument,
                  variables: { cartId: createdCart.id, language },
                  data: { cart: createdCart },
                });
              }
            },
          });
          const newCartId = createRes.data?.cartCreate?.cart?.id;
          if (newCartId) {
            setCartId(newCartId);
            writeCartId(newCartId);
            if (openDrawerAfter) {
              setIsDrawerOpen(true);
            }
            return;
          }
        } catch (fallbackErr) {
          console.error('Fallback cart creation failed:', fallbackErr);
        }
        throw err;
      }
    },
    [cartId, createCart, addLines, language],
  );

  const updateItem = useCallback(
    (lineId: string, quantity: number, unitPrice: number) => {
      if (!cartId) return;

      setOptimisticLines((prev) => ({
        ...prev,
        [lineId]: { lineId, quantity, price: unitPrice },
      }));

      pendingQuantities.current[lineId] = quantity;

      if (debounceTimers.current[lineId]) {
        clearTimeout(debounceTimers.current[lineId]);
      }

      debounceTimers.current[lineId] = setTimeout(async () => {
        const finalQuantity = pendingQuantities.current[lineId];
        try {
          await updateLines({
            variables: {
              cartId,
              lines: [{ id: lineId, quantity: finalQuantity }],
              language,
            },
            update(cache, { data: mutationData }) {
              const updatedCart = mutationData?.cartLinesUpdate?.cart;
              if (updatedCart) {
                cache.writeQuery({
                  query: GetCartDocument,
                  variables: { cartId, language },
                  data: { cart: updatedCart },
                });
              }
            },
          });
        } catch (err) {
          console.error('Error updating the shopping cart:', err);
        } finally {
          if (pendingQuantities.current[lineId] === finalQuantity) {
            setOptimisticLines((prev) => {
              const next = { ...prev };
              delete next[lineId];
              return next;
            });
            delete debounceTimers.current[lineId];
            delete pendingQuantities.current[lineId];
          }
        }
      }, DEBOUNCE_DELAY);
    },
    [cartId, updateLines, language],
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cartId) return;

      if (debounceTimers.current[lineId]) {
        clearTimeout(debounceTimers.current[lineId]);
        delete debounceTimers.current[lineId];
        delete pendingQuantities.current[lineId];
      }

      setOptimisticLines((prev) => ({
        ...prev,
        [lineId]: { lineId, quantity: 0, price: 0 },
      }));

      try {
        await removeLines({
          variables: { cartId, lineIds: [lineId], language },
          update(cache, { data: mutationData }) {
            const updatedCart = mutationData?.cartLinesRemove?.cart;
            if (updatedCart) {
              cache.writeQuery({
                query: GetCartDocument,
                variables: { cartId, language },
                data: { cart: updatedCart },
              });
            }
          },
        });
      } catch (err) {
        console.error('Error removing from cart:', err);
        throw err;
      } finally {
        setOptimisticLines((prev) => {
          const next = { ...prev };
          delete next[lineId];
          return next;
        });
      }
    },
    [cartId, removeLines, language],
  );

  const clearCart = useCallback(async () => {
    if (!cartId) return;

    if (!data?.cart) {
      clearStoredCartId();
      setCartId(null);
      return;
    }

    const lineIds = data.cart.lines.edges.map((edge) => edge.node.id);
    if (lineIds.length === 0) return;

    Object.values(debounceTimers.current).forEach(clearTimeout);
    debounceTimers.current = {};
    pendingQuantities.current = {};

    setOptimisticLines((prev) => {
      const next = { ...prev };
      lineIds.forEach((id) => {
        next[id] = { lineId: id, quantity: 0, price: 0 };
      });
      return next;
    });

    try {
      await removeLines({
        variables: { cartId, lineIds, language },
        update(cache, { data: mutationData }) {
          const updatedCart = mutationData?.cartLinesRemove?.cart;
          if (updatedCart) {
            cache.writeQuery({
              query: GetCartDocument,
              variables: { cartId, language },
              data: { cart: updatedCart },
            });
          }
        },
      });
    } catch (err) {
      console.error('Error clearing cart:', err);
      throw err;
    } finally {
      setOptimisticLines((prev) => {
        const next = { ...prev };
        lineIds.forEach((id) => delete next[id]);
        return next;
      });
    }
  }, [cartId, data, removeLines, language]);

  useEffect(() => {
    return () => {
      Object.values(debounceTimers.current).forEach(clearTimeout);
    };
  }, []);

  const dataValue = useMemo<CartDataContextType>(
    () => ({
      cartId,
      cart: data?.cart,
      cartLoading,
      isLoading: creating || adding,
      isDrawerOpen,
    }),
    [cartId, data, cartLoading, creating, adding, isDrawerOpen],
  );

  const actionsValue = useMemo<CartActionsContextType>(
    () => ({
      addToCart,
      updateItem,
      removeItem,
      clearCart,
      openDrawer,
      closeDrawer,
      toggleDrawer,
    }),
    [
      addToCart,
      updateItem,
      removeItem,
      clearCart,
      openDrawer,
      closeDrawer,
      toggleDrawer,
    ],
  );

  const optimisticValue = useMemo<CartOptimisticContextType>(
    () => ({
      optimisticLines,
    }),
    [optimisticLines],
  );

  return (
    <CartDataContext.Provider value={dataValue}>
      <CartActionsContext.Provider value={actionsValue}>
        <CartOptimisticContext.Provider value={optimisticValue}>
          {children}
        </CartOptimisticContext.Provider>
      </CartActionsContext.Provider>
    </CartDataContext.Provider>
  );
}

export function useCartData() {
  const context = useContext(CartDataContext);
  if (!context) throw new Error('useCartData must be used within CartProvider');
  return context;
}

export function useCartActions() {
  const context = useContext(CartActionsContext);
  if (!context)
    throw new Error('useCartActions must be used within CartProvider');
  return context;
}

export function useCartOptimistic() {
  const context = useContext(CartOptimisticContext);
  if (!context)
    throw new Error('useCartOptimistic must be used within CartProvider');
  return context;
}
