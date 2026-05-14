import type { CodegenConfig } from '@graphql-codegen/cli'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN

const config: CodegenConfig = {
  schema: {
    [`https://${domain}/api/2026-01/graphql.json`]: {
      headers: {
        'X-Shopify-Storefront-Access-Token': token!,
      },
    },
  },
  documents: 'graphql/**/*.graphql',
  generates: {
    'graphql/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        withComponent: false,
        withHOC: false,
        apolloReactHooksImportFrom: '@apollo/client',
        apolloReactCommonImportFrom: '@apollo/client',
        scalars: {
          Decimal: 'string',
          URL: 'string',
          DateTime: 'string',
          HTML: 'string',
        },
      },
    },
  },
}

export default config
