// src/components/ui/SearchBar.tsx
'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  defaultValue?: string;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function SearchBar({
  defaultValue = '',
  placeholder = 'Buscar juegos...',
  size = 'md',
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        router.push(`/buscar?q=${encodeURIComponent(query.trim())}`);
      }
    },
    [query, router]
  );

  const sizeClasses = {
    sm: 'h-8 text-sm pl-8',
    md: 'h-9 text-sm pl-9',
    lg: 'h-11 text-base pl-11',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5 left-2.5',
    md: 'w-4 h-4 left-2.5',
    lg: 'w-5 h-5 left-3',
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className={`absolute top-1/2 -translate-y-1/2 text-muted pointer-events-none ${iconSizes[size]}`} />
      <input
        type="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-surface-2 border border-border rounded-lg text-white placeholder:text-muted
          focus:outline-none focus:border-accent/70 focus:ring-1 focus:ring-accent/30 transition-colors
          pr-4 ${sizeClasses[size]}`}
        aria-label="Buscar juegos"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery('')}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors"
          aria-label="Limpiar búsqueda"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </form>
  );
}
