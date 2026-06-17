import { InMemoryCache } from '@apollo/client'

export const cache = new InMemoryCache({
  typePolicies: {
    Shop: {
      keyFields: [],
    },
    Product: {
      keyFields: ['id'],
    },
    ProductVariant: {
      keyFields: ['id'],
    },
    Cart: {
      keyFields: ['id'],
    },

    Collection: {
      keyFields: ['id'],
      fields: {
        products: {
          keyArgs: ['language'],
          merge(existing, incoming) {
            if (!existing) return incoming
            return {
              ...incoming,
              edges: [...existing.edges, ...incoming.edges],
            }
          },
        },
      },
    },

    Query: {
      fields: {
        products: {
          keyArgs: ['language'],
          merge(existing, incoming) {
            if (!existing) return incoming
            return {
              ...incoming,
              edges: [...existing.edges, ...incoming.edges],
            }
          },
        },
        collections: {
          keyArgs: ['language'],
          merge(existing, incoming) {
            if (!existing) return incoming
            return {
              ...incoming,
              edges: [...existing.edges, ...incoming.edges],
            }
          },
        },
        search: {
          keyArgs: ['query', 'language'],
          merge(existing, incoming) {
            if (!existing) return incoming
            return {
              ...incoming,
              edges: [...existing.edges, ...incoming.edges],
            }
          },
        },
        menu: {
          keyArgs: ['handle', 'language'],
        },
        product: {
          keyArgs: ['handle', 'language'],
        },
        collection: {
          keyArgs: ['handle', 'language'],
        },
      },
    },
  },
})
