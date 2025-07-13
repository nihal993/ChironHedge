import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://chiron-hedge.replit.app';
  
  const staticRoutes = [
    '',
    '/research',
    '/markets',
    '/about',
    '/contact',
    '/login',
  ];

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'daily' : route === '/markets' ? 'hourly' : 'weekly',
    priority: route === '' ? 1.0 : route === '/research' || route === '/markets' ? 0.9 : 0.7,
  }));
}