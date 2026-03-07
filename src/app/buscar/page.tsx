// src/app/buscar/page.tsx
import type { Metadata } from 'next';
import { Search } from 'lucide-react';
import GameGrid from '@/components/game/GameGrid';
import SearchBar from '@/components/ui/SearchBar';
import Pagination from '@/components/ui/Pagination';
import AdBanner from '@/components/ads/AdBanner';
import { getGames } from '@/lib/games';
import { SITE_NAME } from '@/lib/utils';

interface Props {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `"${q}" - Búsqueda | ${SITE_NAME}` : `Buscar Juegos | ${SITE_NAME}`,
    description: `Resultados de búsqueda para "${q}" en ${SITE_NAME}.`,
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q, page: pageParam } = await searchParams;
  const query = q || '';
  const page = parseInt(pageParam || '1');

  const { data: games, total, totalPages } = query
    ? await getGames({ q: query, page, limit: 24 })
    : { data: [], total: 0, totalPages: 0 };

  return (
    <div className="section-container py-8">
      <div className="max-w-xl mx-auto mb-8">
        <h1 className="font-display text-2xl font-bold text-white mb-4 text-center">
          {query ? `Resultados para "${query}"` : 'Buscar Juegos'}
        </h1>
        <SearchBar defaultValue={query} placeholder="Buscar juegos..." size="lg" />
      </div>

      {query && (
        <p className="text-sm text-muted mb-6">
          {total > 0 ? (
            <><strong className="text-white">{total}</strong> juegos encontrados para "<strong className="text-white">{query}</strong>"</>
          ) : (
            <>No se encontraron juegos para "<strong className="text-white">{query}</strong>"</>
          )}
        </p>
      )}

      {!query && (
        <div className="text-center py-16 text-muted">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>Escribe el nombre de un juego para buscar</p>
        </div>
      )}

      {query && total === 0 && (
        <div className="text-center py-16 text-muted">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg mb-2">No encontramos juegos para "{query}"</p>
          <p className="text-sm">Prueba con otras palabras clave</p>
        </div>
      )}

      {games.length > 0 && (
        <>
          <div className="flex justify-center mb-6">
            <AdBanner type="leaderboard" />
          </div>
          <GameGrid games={games} columns={4} />
          <Pagination currentPage={page} totalPages={totalPages} className="mt-8" />
        </>
      )}
    </div>
  );
}