// src/lib/games.ts
import prisma from './db';
import type { Game, PaginatedResponse, SearchParams } from '@/types';

function parseGame(game: any): Game {
  return {
    ...game,
    tags: (() => { try { return JSON.parse(game.tags || '[]'); } catch { return []; } })(),
  };
}

export async function getGames(params: SearchParams = {}): Promise<PaginatedResponse<Game>> {
  const { q, category, tag, sort = 'views', page = 1, limit = 24 } = params;
  const skip = (page - 1) * limit;

  const where: any = {};
  if (category) where.category = category;
  if (q) where.OR = [
    { title: { contains: q } },
    { description: { contains: q } },
  ];
  if (tag) where.tags = { contains: tag };

  const orderBy: any = {};
  if (sort === 'views') orderBy.views = 'desc';
  else if (sort === 'rating') orderBy.rating = 'desc';
  else orderBy.createdAt = 'desc';

  const [raw, total] = await Promise.all([
    prisma.game.findMany({ where, orderBy, skip, take: limit }),
    prisma.game.count({ where }),
  ]);

  return {
    data: raw.map(parseGame),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getFeaturedGames(limit = 8): Promise<Game[]> {
  const games = await prisma.game.findMany({
    where: { featured: true },
    orderBy: { views: 'desc' },
    take: limit,
  });
  return games.map(parseGame);
}

export async function getNewGames(limit = 8): Promise<Game[]> {
  const games = await prisma.game.findMany({
    where: { isNew: true },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
  return games.map(parseGame);
}

export async function getGameBySlug(slug: string): Promise<Game | null> {
  const game = await prisma.game.findUnique({ where: { slug } });
  if (!game) return null;
  return parseGame(game);
}

export async function getRelatedGames(game: Game, limit = 6): Promise<Game[]> {
  const games = await prisma.game.findMany({
    where: { category: game.category, slug: { not: game.slug } },
    orderBy: { views: 'desc' },
    take: limit,
  });
  return games.map(parseGame);
}

export async function incrementViews(slug: string): Promise<void> {
  await prisma.game.update({ where: { slug }, data: { views: { increment: 1 } } });
}

export async function getGamesByTag(tag: string, params: SearchParams = {}): Promise<PaginatedResponse<Game>> {
  const { page = 1, limit = 24 } = params;
  const skip = (page - 1) * limit;

  // SQLite: tags stored as JSON string
  const [raw, total] = await Promise.all([
    prisma.game.findMany({
      where: { tags: { contains: tag } },
      orderBy: { views: 'desc' },
      skip,
      take: limit,
    }),
    prisma.game.count({ where: { tags: { contains: tag } } }),
  ]);

  return {
    data: raw.map(parseGame),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getCategories() {
  return prisma.category.findMany({ orderBy: { name: 'asc' } });
}

export async function getTags(limit = 30) {
  return prisma.tag.findMany({ orderBy: { gameCount: 'desc' }, take: limit });
}

// Future: import games from external API
export async function importGamesFromAPI(apiUrl: string): Promise<{ imported: number; errors: number }> {
  let imported = 0;
  let errors = 0;
  try {
    const res = await fetch(apiUrl);
    const games: any[] = await res.json();
    for (const g of games) {
      try {
        await prisma.game.upsert({
          where: { slug: g.slug },
          update: { ...g, tags: JSON.stringify(g.tags || []) },
          create: { ...g, tags: JSON.stringify(g.tags || []) },
        });
        imported++;
      } catch { errors++; }
    }
  } catch (e) {
    console.error('Import failed:', e);
    errors++;
  }
  return { imported, errors };
}
