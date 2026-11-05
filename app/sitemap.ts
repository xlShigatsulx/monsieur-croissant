import type { MetadataRoute } from 'next';
import { getAllSitemapHandles } from '@/lib/shopify/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || 'https://monsieur-croissant.vercel.app';
  const locales = ['', '/en'];

  const staticRoutes = [
    '',
    '/products',
    '/collections',
    '/pages/about',
    '/pages/contact',
    '/policies/privacy-policy',
    '/policies/terms-of-service',
    '/policies/refund-policy',
    '/policies/shipping-policy',
  ];

  const { productHandles, collectionHandles } = await getAllSitemapHandles();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      const ukUrl = `${baseUrl}${route}`;
      const enUrl = `${baseUrl}/en${route}`;
      entries.push({
        url: `${baseUrl}${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : route.startsWith('/policies') ? 0.4 : 0.8,
        alternates: {
          languages: {
            uk: ukUrl,
            en: enUrl,
          },
        },
      });
    }

    for (const handle of productHandles) {
      const ukUrl = `${baseUrl}/products/${handle}`;
      const enUrl = `${baseUrl}/en/products/${handle}`;
      entries.push({
        url: `${baseUrl}${locale}/products/${handle}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
        alternates: {
          languages: {
            uk: ukUrl,
            en: enUrl,
          },
        },
      });
    }

    for (const handle of collectionHandles) {
      const ukUrl = `${baseUrl}/collections/${handle}`;
      const enUrl = `${baseUrl}/en/collections/${handle}`;
      entries.push({
        url: `${baseUrl}${locale}/collections/${handle}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: {
            uk: ukUrl,
            en: enUrl,
          },
        },
      });
    }
  }

  return entries;
}
