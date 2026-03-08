// src/app/juego/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Eye, Star, Tag, Calendar, User, ChevronRight } from 'lucide-react';
import GamePlayer from '@/components/game/GamePlayer';
import GameGrid from '@/components/game/GameGrid';
import AdBanner from '@/components/ads/AdBanner';
import { getGameBySlug, getRelatedGames, incrementViews } from '@/lib/games';
import { formatViews, formatDate, SITE_NAME, SITE_URL } from '@/lib/utils';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = await getGameBySlug(params.slug);
  if (!game) return { title: 'Juego no encontrado' };

  const title = `${game.title} - Jugar Online Gratis | ${SITE_NAME}`;
  const description = game.description.substring(0, 160);

  return {
    title,
    description,
    keywords: [game.title, game.category, 'juego online', 'html5', 'gratis', ...game.tags],
    openGraph: {
      title,
      description,
      images: [{ url: game.thumbnail, width: 460, height: 345 }],
      url: `${SITE_URL}/juego/${game.slug}`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description, images: [game.thumbnail] },
    alternates: { canonical: `${SITE_URL}/juego/${game.slug}` },
  };
}

export const revalidate = 30;

export default async function GamePage({ params }: Props) {
  const game = await getGameBySlug(params.slug);
  if (!game) notFound();

  // Fire-and-forget view counter
  incrementViews(params.slug).catch(() => {});

  const relatedGames = await getRelatedGames(game, 6);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: game.title,
    description: game.description,
    image: game.thumbnail,
    url: `${SITE_URL}/juego/${game.slug}`,
    genre: game.category,
    keywords: game.tags.join(', '),
    datePublished: game.createdAt,
    author: game.developer ? { '@type': 'Organization', name: game.developer } : undefined,
    aggregateRating: game.rating > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: game.rating,
      bestRating: 5,
      ratingCount: Math.floor(game.views / 10),
    } : undefined,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <div className="section-container pt-4 pb-1">
        <nav className="flex items-center gap-1.5 text-xs text-muted" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-accent transition-colors">Inicio</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/juegos/${game.category.toLowerCase()}`} className="hover:text-accent transition-colors capitalize">
            {game.category}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white truncate max-w-[200px]">{game.title}</span>
        </nav>
      </div>

      <div className="section-container py-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">

          {/* Main column */}
          <div className="space-y-6">
            {/* Game title */}
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">{game.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                <span className="flex items-center gap-1 capitalize">
                  <span className="text-accent">#</span>{game.category}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {formatViews(game.views)} partidas
                </span>
                {game.rating > 0 && (
                  <span className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {game.rating.toFixed(1)} / 5
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(game.createdAt)}
                </span>
                {game.developer && (
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {game.developer}
                  </span>
                )}
              </div>
            </div>

            {/* Ad before game */}
            <div className="flex justify-center">
              <AdBanner type="leaderboard" />
            </div>

            {/* Game player */}
            <GamePlayer
              gameUrl={game.gameUrl}
              title={game.title}
              width={game.width}
              height={game.height}
            />

            {/* Description */}
            <div className="bg-surface rounded-xl p-5 border border-border/50">
              <h2 className="font-bold text-white mb-3 text-base">Sobre el juego</h2>
              <p className="text-muted text-sm leading-relaxed">{game.description}</p>
            </div>

            {/* Instructions */}
            {game.instructions && (
              <div className="bg-surface rounded-xl p-5 border border-border/50">
                <h2 className="font-bold text-white mb-3 text-base">🎮 Instrucciones</h2>
                <div className="text-muted text-sm leading-relaxed whitespace-pre-line">
                  {game.instructions}
                </div>
              </div>
            )}

            {/* Tags */}
            {game.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <Tag className="w-4 h-4 text-muted" />
                {game.tags.map(tag => (
                  <Link key={tag} href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`} className="tag-chip">
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Related games */}
            {relatedGames.length > 0 && (
              <section>
                <h2 className="font-bold text-white text-base mb-4 flex items-center gap-2">
                  <span>🕹️</span> Juegos relacionados
                </h2>
                <AdBanner type="rectangle" className="mb-4 flex justify-center" />
                <GameGrid games={relatedGames} columns={3} size="sm" />
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col gap-4">
            {/* Sidebar ad - skyscraper */}
            <div className="sticky top-20">
              <AdBanner type="skyscraper" />
              <div className="mt-4">
                <AdBanner type="rectangle" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
