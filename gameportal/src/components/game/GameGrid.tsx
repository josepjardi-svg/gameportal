// src/components/game/GameGrid.tsx
import GameCard from './GameCard';
import type { Game } from '@/types';
import { cn } from '@/lib/utils';

interface GameGridProps {
  games: Game[];
  columns?: 2 | 3 | 4 | 5 | 6;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const colClasses = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
  6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
};

export default function GameGrid({ games, columns = 4, size = 'md', className }: GameGridProps) {
  if (!games || games.length === 0) {
    return (
      <div className="text-center py-16 text-muted">
        <div className="text-5xl mb-4">🎮</div>
        <p className="text-lg">No se encontraron juegos</p>
      </div>
    );
  }

  return (
    <div className={cn('grid gap-3 sm:gap-4', colClasses[columns], className)}>
      {games.map((game, i) => (
        <div key={game.id} className="animate-fade-in" style={{ animationDelay: `${i * 30}ms` }}>
          <GameCard game={game} size={size} />
        </div>
      ))}
    </div>
  );
}
