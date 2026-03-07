// src/components/game/GameCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Eye, Star, Zap } from 'lucide-react';
import { formatViews, cn } from '@/lib/utils';
import type { Game } from '@/types';

interface GameCardProps {
  game: Game;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function GameCard({ game, size = 'md', className }: GameCardProps) {
  const sizes = {
    sm: { img: 'aspect-[4/3]', title: 'text-xs', card: '' },
    md: { img: 'aspect-[4/3]', title: 'text-sm', card: '' },
    lg: { img: 'aspect-video', title: 'text-base', card: '' },
  };

  const s = sizes[size];

  return (
    <Link
      href={`/juego/${game.slug}`}
      className={cn(
        'group block bg-surface rounded-xl overflow-hidden border border-border/50',
        'hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-200',
        className
      )}
    >
      {/* Thumbnail */}
      <div className={cn('relative overflow-hidden bg-surface-2', s.img)}>
        <Image
          src={game.thumbnail}
          alt={game.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-game.jpg';
          }}
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {game.isNew && (
            <span className="bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide flex items-center gap-0.5">
              <Zap className="w-2.5 h-2.5" /> Nuevo
            </span>
          )}
          {game.featured && !game.isNew && (
            <span className="bg-yellow-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide">
              ⭐ Top
            </span>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
          <div className="bg-accent text-white text-sm font-bold px-4 py-2 rounded-full transform scale-90 group-hover:scale-100 transition-transform">
            ▶ Jugar
          </div>
        </div>

        {/* Rating */}
        {game.rating > 0 && (
          <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-yellow-400 text-xs px-1.5 py-0.5 rounded flex items-center gap-0.5">
            <Star className="w-3 h-3 fill-current" />
            <span>{game.rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-2.5">
        <h3 className={cn('font-semibold text-white truncate leading-tight mb-1', s.title)}>
          {game.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-accent capitalize">{game.category}</span>
          <span className="text-[11px] text-muted flex items-center gap-0.5">
            <Eye className="w-3 h-3" />
            {formatViews(game.views)}
          </span>
        </div>
      </div>
    </Link>
  );
}
