import { SHOPIFY_CONFIG, STOREFRONT_API_URL } from './config';

export async function fetchStorefront<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T | null> {
  try {
    const res = await fetch(STOREFRONT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data as T;
  } catch (error) {
    console.error('Storefront server fetch error:', error);
    return null;
  }
}

export interface ServerProductMeta {
  title: string;
  description: string;
  availableForSale: boolean;
  featuredImage?: {
    url: string;
    altText?: string | null;
  } | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}

export async function getProductMeta(
  handle: string,
  language: string,
): Promise<ServerProductMeta | null> {
  const data = await fetchStorefront<{ product: ServerProductMeta }>(
    `query GetProductMeta($handle: String!, $language: LanguageCode!) @inContext(language: $language) {
      product(handle: $handle) {
        title
        description
        availableForSale
        featuredImage {
          url
          altText
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }`,
    {
      handle,
      language: language.toUpperCase() === 'EN' ? 'EN' : 'UK',
    },
  );
  return data?.product ?? null;
}

export interface ServerCollectionMeta {
  title: string;
  description: string;
  image?: {
    url: string;
    altText?: string | null;
  } | null;
}

export async function getCollectionMeta(
  handle: string,
  language: string,
): Promise<ServerCollectionMeta | null> {
  const data = await fetchStorefront<{ collection: ServerCollectionMeta }>(
    `query GetCollectionMeta($handle: String!, $language: LanguageCode!) @inContext(language: $language) {
      collection(handle: $handle) {
        title
        description
        image {
          url
          altText
        }
      }
    }`,
    {
      handle,
      language: language.toUpperCase() === 'EN' ? 'EN' : 'UK',
    },
  );
  return data?.collection ?? null;
}

export async function getAllSitemapHandles(): Promise<{
  productHandles: string[];
  collectionHandles: string[];
}> {
  const data = await fetchStorefront<{
    products: { edges: { node: { handle: string } }[] };
    collections: { edges: { node: { handle: string } }[] };
  }>(`
    query GetAllHandles {
      products(first: 100) {
        edges {
          node {
            handle
          }
        }
      }
      collections(first: 50) {
        edges {
          node {
            handle
          }
        }
      }
    }
  `);

  return {
    productHandles:
      data?.products?.edges?.map((e) => e.node.handle) ?? [],
    collectionHandles:
      data?.collections?.edges?.map((e) => e.node.handle) ?? [],
  };
}

export async function getShopPolicy(
  policyHandle: string,
  language: string,
): Promise<{ title: string; body: string } | null> {
  const policyFieldMap: Record<string, string> = {
    'privacy-policy': 'privacyPolicy',
    'terms-of-service': 'termsOfService',
    'refund-policy': 'refundPolicy',
    'shipping-policy': 'shippingPolicy',
  };

  const field = policyFieldMap[policyHandle];
  if (!field) return null;

  const data = await fetchStorefront<{
    shop: Record<string, { title: string; body: string } | null>;
  }>(
    `query GetPolicy($language: LanguageCode!) @inContext(language: $language) {
      shop {
        ${field} {
          title
          body
        }
      }
    }`,
    { language: language.toUpperCase() === 'EN' ? 'EN' : 'UK' },
  );

  return data?.shop?.[field] ?? null;
}
