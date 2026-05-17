'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import {
  generateCodeVerifier,
  generateCodeChallenge,
} from '@/lib/shopify/auth/pkce'
import { generateState, generateNonce } from '@/lib/shopify/auth/state'
import { getAuthorizationUrl } from '@/lib/shopify/auth/customer.client'

interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
}

interface AuthContextType {
  customer: Customer | null
  isAuthenticated: boolean
  isLoading: boolean
  signIn: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const stored = Cookies.get('customer')
    if (stored) {
      try {
        setCustomer(JSON.parse(stored))
      } catch {
        Cookies.remove('customer')
      }
    }
    setIsLoading(false)
  }, [])

  const signIn = useCallback(async () => {
    const state = generateState()
    const nonce = generateNonce()
    const codeVerifier = generateCodeVerifier()
    const codeChallenge = await generateCodeChallenge(codeVerifier)

    Cookies.set('oauth_state', state, { sameSite: 'lax', secure: true })
    Cookies.set('oauth_nonce', nonce, { sameSite: 'lax', secure: true })
    Cookies.set('code_verifier', codeVerifier, {
      sameSite: 'lax',
      secure: true,
    })

    const authUrl = await getAuthorizationUrl(state, nonce, codeChallenge)
    window.location.href = authUrl
  }, [])

  const logout = useCallback(async () => {
    setCustomer(null)
    window.location.href = '/auth/logout'
  }, [router])

  return (
    <AuthContext.Provider
      value={{
        customer,
        isAuthenticated: !!customer,
        isLoading,
        signIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
