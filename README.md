# Monsieur Croissant — Headless Shopify Storefront

A fully functional headless e-commerce storefront built with Next.js 16 and Shopify APIs.

🔗 **Live Demo:** https://monsieur-croissant-f84h.vercel.app

## Tech Stack

- **Next.js 16** — App Router
- **TypeScript**
- **Apollo Client** — GraphQL data fetching
- **Shopify Storefront API** — products, collections, cart
- **Shopify Customer Account API** — authentication (PKCE OAuth 2.0)
- **GraphQL Code Generator** — fully typed queries and mutations

## Features

- ✅ Collections page
- ✅ Collection products page
- ✅ Single product page
- ✅ Add to cart / update quantity / remove items
- ✅ Cart page with full functionality
- ✅ Redirect to Shopify checkout
- ✅ Customer registration & login (OAuth 2.0 PKCE)

## Getting Started

1. Clone the repository:
```bash
   git clone https://github.com/xlShigatsulx/monsieur-croissant.git
   cd monsieur-croissant
```

2. Install dependencies:
```bash
   yarn install
   # or
   npm install
```

3. Create `.env.local` and fill in your Shopify credentials:
  NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=
  NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=
  NEXT_PUBLIC_SHOPIFY_CUSTOMER_CLIENT_ID=
  NEXT_PUBLIC_SHOPIFY_AUTH_URL=
  NEXT_PUBLIC_SHOPIFY_TOKEN_URL=
  NEXT_PUBLIC_SHOPIFY_LOGOUT_URL=
  NEXT_PUBLIC_APP_URL=

4. Run codegen:
```bash
   yarn codegen
   # or
   npm run codegen
```

5. Start the development server:
```bash
   yarn dev
   # or
   npm run dev
```
