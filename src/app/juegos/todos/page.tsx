import type { Metadata } from 'next';
import GameGrid from '@/components/game/GameGrid';
import CategoryMenu from '@/components/ui/CategoryMenu';
import Pagination from '@/components/ui/Pagination';
import AdBanner from '@/components/ads/AdBanner';
import { getGames, getCategories } from '@/lib/games';
import { SITE_NAME } from '@/lib/utils';

interface Props {
  searchParams: Promise<{ page?: string; sort?: string }>;
}

export const metadata: Metadata = {
  title: `Todos los Juegos Online Gratis | ${SITE_NAME}`,
  description: `Juega a todos nuestros juegos HTML5 online gratis. Sin descargas ni registros.`,
};

export const revalidate = 60;

export default async function TodosPage({ searchParams }: Props) {
  const { page: pageParam, sort: sortParam } = await searchParams;
  const categories = await getCategories();
  const page = parseInt(pageParam || '1');
  const sort = (sortParam as 'views' | 'rating' | 'createdAt') || 'views';

  const { data: games, total, totalPages } = await getGames({ page, limit: 24, sort });

  return (
    <>
      <div className="bg-hero-gradient border-b border-border/50 py-10">
        <div className="section-container">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
            Todos los <span className="text-accent">Juegos</span>
          </h1>
          <p className="text-muted mt-1">{total} juegos disponibles</p>
        </div>
      </div>

      <div className="section-container py-8">
        <div className="mb-6 overflow-x-auto no-scrollbar">
          <CategoryMenu categories={categories} activeSlug="todos" />
        </div>

        <div className="flex justify-center mb-8">
          <AdBanner type="leaderboard" />
        </div>

        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <p className="text-sm text-muted">
            Mostrando <strong className="text-white">{games.length}</strong> de <strong className="text-white">{total}</strong> juegos
          </p>
          <div className="flex gap-2">
            {[
              { value: 'views', label: '🔥 Popular' },
              { value: 'rating', label: '⭐ Mejor valorado' },
              { value: 'createdAt', label: '✨ Más nuevos' },
            ].map(opt => (
              
                key={opt.value}
                href={`?sort=${opt.value}`}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  sort === opt.value
                    ? 'bg-accent text-white border-accent'
                    : 'bg-surface border-border text-muted hover:text-white'
                }`}
              >
                {opt.label}
              </a>
            ))}
          </div>
        </div>

        <GameGrid games={games} columns={4} />
        <Pagination currentPage={page} totalPages={totalPages} className="mt-8" />
      </div>
    </>
  );
}