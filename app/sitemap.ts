import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.chainsolutions.fr';

  // Static routes
  const staticRoutes = [
    '',
    '/a-propos',
    '/contact',
    '/blog',
    '/politique-de-confidentialite',
    '/solutions/brvm-research-pro',
    '/solutions/profil-investisseur-uemoa',
    '/solutions/simulateur-epargne',
    '/solutions/edufinance-parcours-epargnant',
    '/solutions/fundafrique-opcvm-afrique',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    // Dynamic blog posts
    const posts = await prisma.blogEntry.findMany({
      where: { status: 'published' },
      select: { id: true, updatedAt: true, type: true, url: true },
    });

    const blogRoutes = posts
      .filter(post => post.type === 'news' || !post.url)
      .map((post) => ({
        url: `${baseUrl}/blog/${post.id}`,
        lastModified: post.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));

    return [...staticRoutes, ...blogRoutes];
  } catch (error) {
    return staticRoutes;
  }
}
