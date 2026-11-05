import type { MetadataRoute } from 'next';
import { getAllSitemapHandles } from '@/lib/shopify/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || 'https://monsieur-croissant.vercel.app';
  const locales = ['', '/en']; // '' is default Ukrainian locale, '/en' is English

  const staticRoutes = [
    '',
    '/products',
    '/collections',
    '/pages/about',
    '/pages/contact',
  ];

  const { productHandles, collectionHandles } = await getAllSitemapHandles();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : 0.8,
      });
    }

    for (const handle of productHandles) {
      entries.push({
        url: `${baseUrl}${locale}/products/${handle}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }

    for (const handle of collectionHandles) {
      entries.push({
        url: `${baseUrl}${locale}/collections/${handle}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }

  return entries;
}
