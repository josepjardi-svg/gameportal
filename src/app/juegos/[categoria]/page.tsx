// src/app/juegos/[categoria]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GameGrid from '@/components/game/GameGrid';
import CategoryMenu from '@/components/ui/CategoryMenu';
import Pagination from '@/components/ui/Pagination';
import AdBanner from '@/components/ads/AdBanner';
import { getGames, getCategories } from '@/lib/games';
import { SITE_NAME, SITE_URL } from '@/lib/utils';

interface Props {
  params: Promise<{ categoria: string }>;
  searchParams: Promise<{ page?: string; sort?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const categories = await getCategories();
  const cat = categories.find(c => c.slug === categoria);
  if (!cat) return { title: 'Categoría no encontrada' };

  const title = `Juegos de ${cat.name} Online Gratis | ${SITE_NAME}`;
  const description = `Juega a los mejores juegos de ${cat.name} HTML5 online gratis. Sin descargas ni registros. ${cat.description}`;

  return {
    title,
    description,
    openGraph: { title, description, url: `${SITE_URL}/juegos/${cat.slug}` },
    alternates: { canonical: `${SITE_URL}/juegos/${cat.slug}` },
  };
}

export const revalidate = 60;

export default async function CategoryPage({ params, searchParams }: Props) {
  const { categoria } = await params;
  const { page: pageParam, sort: sortParam } = await searchParams;
  const [categories] = await Promise.all([getCategories()]);
  const category = categories.find(c => c.slug === categoria);
  if (!category) notFound();

  const page = parseInt(pageParam || '1');
  const sort = (sortParam as 'views' | 'rating' | 'createdAt') || 'views';

  const { data: games, total, totalPages } = await getGames({
    category: category.name.toLowerCase(),
    page,
    limit: 24,
    sort,
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Juegos de ${category.name}`,
    description: category.description,
    url: `${SITE_URL}/juegos/${category.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Category header */}
      <div className="bg-hero-gradient border-b border-border/50 py-10">
        <div className="section-container">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{category.icon}</span>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
                Juegos de <span className="text-accent">{category.name}</span>
              </h1>
              <p className="text-muted mt-1">{total} juegos disponibles</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-container py-8">
        {/* Category filters */}
        <div className="mb-6 overflow-x-auto no-scrollbar">
          <CategoryMenu categories={categories} activeSlug={categoria} />
        </div>

        {/* Ad */}
        <div className="flex justify-center mb-8">
          <AdBanner type="leaderboard" />
        </div>

        {/* Sort options */}
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
              <a
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

        {/* SEO description */}
        <div className="mt-12 p-6 bg-surface rounded-xl border border-border/50">
          <h2 className="text-lg font-bold text-white mb-3">
            Los mejores juegos de {category.name} online
          </h2>
          <p className="text-muted text-sm leading-relaxed">
            {category.description ||
              `Descubre la mejor colección de juegos de ${category.name} HTML5 online. Juega gratis desde tu navegador sin instalar nada. Tenemos los mejores juegos de ${category.name} actualizados regularmente.`}
          </p>
        </div>
      </div>
    </>
  );
}
