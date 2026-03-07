// src/app/api/games/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getGames } from '@/lib/games';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const params = {
    q: searchParams.get('q') || undefined,
    category: searchParams.get('category') || undefined,
    tag: searchParams.get('tag') || undefined,
    sort: (searchParams.get('sort') as 'views' | 'rating' | 'createdAt') || 'views',
    page: parseInt(searchParams.get('page') || '1'),
    limit: Math.min(parseInt(searchParams.get('limit') || '24'), 100),
  };

  try {
    const result = await getGames(params);
    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching games' }, { status: 500 });
  }
}
