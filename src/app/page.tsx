// src/app/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Zap, TrendingUp, Sparkles } from 'lucide-react';
import GameGrid from '@/components/game/GameGrid';
import CategoryMenu from '@/components/ui/CategoryMenu';
import SectionHeader from '@/components/ui/SectionHeader';
import AdBanner from '@/components/ads/AdBanner';
import { getFeaturedGames, getNewGames, getCategories } from '@/lib/games';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/utils';

export const metadata: Metadata = {
  title: `${SITE_NAME} - Juegos HTML5 Online Gratis`,
  description: SITE_DESCRIPTION,
};

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function HomePage() {
  const [featuredGames, newGames, categories] = await Promise.all([
    getFeaturedGames(8),
    getNewGames(8),
    getCategories(),
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: '/buscar?q={search_term_string}' },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient py-12 md:py-16 border-b border-border/50">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-accent rounded-full filter blur-3xl opacity-20 animate-pulse-slow" />
          <div className="absolute bottom-10 right-1/4 w-48 h-48 bg-blue-500 rounded-full filter blur-3xl opacity-10 animate-pulse-slow" style={{ animationDelay: '1s' }} />
        </div>

        <div className="section-container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-sm px-3 py-1 rounded-full mb-6 font-medium">
            <Zap className="w-4 h-4" />
            +1000 juegos HTML5 gratuitos
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Juega Sin{' '}
            <span className="text-accent text-glow">Límites</span>
          </h1>
          <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Miles de juegos HTML5 directamente en tu navegador. Sin descargas, sin registros, gratis.
          </p>

          {/* Categories quick access */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.slice(0, 8).map(cat => (
              <Link
                key={cat.slug}
                href={`/juegos/${cat.slug}`}
                className="px-4 py-2 bg-surface border border-border/50 hover:border-accent/50 text-sm text-white rounded-full transition-all hover:bg-surface-2"
              >
                {cat.icon} {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="section-container py-8 space-y-12">

        {/* Ad leaderboard */}
        <div className="flex justify-center">
          <AdBanner type="leaderboard" />
        </div>

        {/* Featured / Popular */}
        {featuredGames.length > 0 && (
          <section>
            <SectionHeader
              title="Juegos Populares"
              icon="🔥"
              href="/juegos?sort=views"
            />
            <GameGrid games={featuredGames} columns={4} />
          </section>
        )}

        {/* Categories Grid */}
        {categories.length > 0 && (
          <section>
            <SectionHeader title="Categorías" icon="🎯" href="/juegos" />
            <CategoryMenu categories={categories} variant="grid" />
          </section>
        )}

        {/* Ad rectangle */}
        <div className="flex justify-center">
          <AdBanner type="rectangle" />
        </div>

        {/* New games */}
        {newGames.length > 0 && (
          <section>
            <SectionHeader
              title="Juegos Nuevos"
              icon="✨"
              href="/juegos?sort=createdAt"
            />
            <GameGrid games={newGames} columns={4} />
          </section>
        )}

        {/* SEO text */}
        <section className="bg-surface rounded-xl p-6 border border-border/50">
          <h2 className="text-lg font-bold text-white mb-3">Juegos HTML5 Online Gratis</h2>
          <p className="text-muted text-sm leading-relaxed">
            Bienvenido a {SITE_NAME}, el portal definitivo de juegos HTML5 online. Disfruta de nuestra
            colección de más de 1000 juegos gratuitos directamente en tu navegador sin necesidad de
            descargar nada. Encuentra juegos de acción, puzzle, aventura, deportes, carreras y mucho más.
            Compatible con PC, tablet y móvil.
          </p>
        </section>
      </div>
    </>
  );
}
