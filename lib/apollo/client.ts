import { ApolloClient, HttpLink } from '@apollo/client'
import { SetContextLink } from '@apollo/client/link/context'
import { SHOPIFY_CONFIG, STOREFRONT_API_URL } from '@/lib/shopify/config'
import { cache } from './cache'

function makeClient() {
  const httpLink = new HttpLink({ uri: STOREFRONT_API_URL })

  const authLink = new SetContextLink((prevContext, _) => ({
    headers: {
      ...prevContext.headers,
      'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.storefrontAccessToken,
    },
  }))

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  })
}

let browserClient: ApolloClient | null = null

export function getClient() {
  if (typeof window === 'undefined') {
    return makeClient()
  }

  if (!browserClient) browserClient = makeClient()
  return browserClient
}
