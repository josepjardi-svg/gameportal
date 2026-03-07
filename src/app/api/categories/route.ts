// src/app/api/categories/route.ts
import { NextResponse } from 'next/server';
import { getCategories } from '@/lib/games';

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching categories' }, { status: 500 });
  }
}
