import type { IGraphQLConfig } from 'graphql-config';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

const config: IGraphQLConfig = {
  schema: {
    [`https://${domain}/api/2026-04/graphql.json`]: {
      headers: {
        'X-Shopify-Storefront-Access-Token': token!,
      },
    },
  },
  documents: 'graphql/**/*.graphql',
};

export default config;
