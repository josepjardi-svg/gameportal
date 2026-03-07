// src/app/api/import/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { importGamesFromAPI } from '@/lib/games';

// Protected endpoint for importing games from external API
export async function POST(request: NextRequest) {
  // Basic API key auth - in production use a proper auth system
  const apiKey = request.headers.get('x-api-key');
  if (apiKey !== process.env.IMPORT_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { apiUrl } = await request.json();
  if (!apiUrl) {
    return NextResponse.json({ error: 'apiUrl is required' }, { status: 400 });
  }

  const result = await importGamesFromAPI(apiUrl);
  return NextResponse.json(result);
}
