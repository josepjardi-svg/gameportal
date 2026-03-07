// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import prisma from '@/lib/db';
import { SITE_URL } from '@/lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [games, categories, tags] = await Promise.all([
    prisma.game.findMany({ select: { slug: true, updatedAt: true }, orderBy: { views: 'desc' } }),
    prisma.category.findMany({ select: { slug: true } }),
    prisma.tag.findMany({ select: { slug: true }, take: 500 }),
  ]);

  const gameUrls: MetadataRoute.Sitemap = games.map(game => ({
    url: `${SITE_URL}/juego/${game.slug}`,
    lastModified: game.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const categoryUrls: MetadataRoute.Sitemap = categories.map(cat => ({
    url: `${SITE_URL}/juegos/${cat.slug}`,
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  const tagUrls: MetadataRoute.Sitemap = tags.map(tag => ({
    url: `${SITE_URL}/tag/${tag.slug}`,
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return [
    { url: SITE_URL, changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/juegos`, changeFrequency: 'daily', priority: 0.9 },
    ...categoryUrls,
    ...gameUrls,
    ...tagUrls,
  ];
}
