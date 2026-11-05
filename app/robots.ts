import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || 'https://monsieur-croissant.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/auth/', '/profile', '/cart'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
