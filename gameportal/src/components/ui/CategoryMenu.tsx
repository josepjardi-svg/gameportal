// src/components/ui/CategoryMenu.tsx
import Link from 'next/link';
import type { Category } from '@/types';
import { cn } from '@/lib/utils';

interface CategoryMenuProps {
  categories: Category[];
  activeSlug?: string;
  className?: string;
  variant?: 'horizontal' | 'grid';
}

export default function CategoryMenu({ categories, activeSlug, className, variant = 'horizontal' }: CategoryMenuProps) {
  if (variant === 'grid') {
    return (
      <div className={cn('grid grid-cols-2 sm:grid-cols-4 gap-3', className)}>
        {categories.map(cat => (
          <Link
            key={cat.slug}
            href={`/juegos/${cat.slug}`}
            className={cn(
              'flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200',
              'hover:border-accent/50 hover:bg-surface-2',
              activeSlug === cat.slug
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-border/50 bg-surface text-muted'
            )}
          >
            <span className="text-2xl">{cat.icon}</span>
            <span className="text-sm font-medium text-white">{cat.name}</span>
            {cat.gameCount > 0 && (
              <span className="text-[11px] text-muted">{cat.gameCount} juegos</span>
            )}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      <Link
        href="/juegos"
        className={cn(
          'px-3 py-1.5 rounded-full text-sm font-medium border transition-colors',
          !activeSlug
            ? 'bg-accent text-white border-accent'
            : 'bg-surface border-border text-muted hover:text-white hover:border-accent/50'
        )}
      >
        🎮 Todos
      </Link>
      {categories.map(cat => (
        <Link
          key={cat.slug}
          href={`/juegos/${cat.slug}`}
          className={cn(
            'px-3 py-1.5 rounded-full text-sm font-medium border transition-colors',
            activeSlug === cat.slug
              ? 'bg-accent text-white border-accent'
              : 'bg-surface border-border text-muted hover:text-white hover:border-accent/50'
          )}
        >
          {cat.icon} {cat.name}
        </Link>
      ))}
    </div>
  );
}
