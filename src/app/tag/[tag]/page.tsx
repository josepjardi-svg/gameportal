// src/app/tag/[tag]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GameGrid from '@/components/game/GameGrid';
import Pagination from '@/components/ui/Pagination';
import AdBanner from '@/components/ads/AdBanner';
import { getGamesByTag } from '@/lib/games';
import { SITE_NAME, SITE_URL } from '@/lib/utils';

interface Props {
  interface Props {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const tagName = tag.replace(/-/g, ' ');
  const title = `Juegos de ${tagName} | ${SITE_NAME}`;
  const description = `Encuentra los mejores juegos de ${tagName} HTML5 online gratis. Juega sin descargar nada.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/tag/${params.tag}` },
  };
}

export const revalidate = 60;

export default async function TagPage({ params, searchParams }: Props) {
  const { tag } = await params;
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam || '1');
  const tagName = tag.replace(/-/g, ' ');
  const { data: games, total, totalPages } = await getGamesByTag(tagName, { page, limit: 24 });

  if (page === 1 && games.length === 0) notFound();

  return (
    <div className="section-container py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-xs px-3 py-1 rounded-full mb-3">
          #etiqueta
        </div>
        <h1 className="font-display text-3xl font-bold text-white capitalize mb-2">
          {tagName}
        </h1>
        <p className="text-muted text-sm">{total} juegos encontrados</p>
      </div>

      <div className="flex justify-center mb-6">
        <AdBanner type="leaderboard" />
      </div>

      <GameGrid games={games} columns={4} />
      <Pagination currentPage={page} totalPages={totalPages} className="mt-8" />
    </div>
  );
}
