// src/components/ui/Pagination.tsx
'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  className?: string;
}

export default function Pagination({ currentPage, totalPages, className }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const navigateTo = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page === 1) params.delete('page');
    else params.set('page', String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  // Generate page numbers to show
  const getPages = () => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  const pages = getPages();

  return (
    <div className={cn('flex items-center justify-center gap-1.5', className)}>
      <button
        onClick={() => navigateTo(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg text-muted hover:text-white hover:bg-surface-2 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Página anterior"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((page, i) =>
        page === '...' ? (
          <span key={`ellipsis-${i}`} className="px-2 text-muted">···</span>
        ) : (
          <button
            key={page}
            onClick={() => navigateTo(page)}
            className={cn(
              'w-9 h-9 rounded-lg text-sm font-medium transition-colors',
              page === currentPage
                ? 'bg-accent text-white'
                : 'text-muted hover:text-white hover:bg-surface-2'
            )}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => navigateTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg text-muted hover:text-white hover:bg-surface-2 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Página siguiente"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
