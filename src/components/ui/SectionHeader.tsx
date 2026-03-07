// src/components/ui/SectionHeader.tsx
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  icon?: string;
  href?: string;
  className?: string;
}

export default function SectionHeader({ title, icon, href, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between mb-4', className)}>
      <h2 className="text-lg font-bold text-white flex items-center gap-2">
        {icon && <span className="text-xl">{icon}</span>}
        <span className="relative">
          {title}
          <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-accent/50 rounded" />
        </span>
      </h2>
      {href && (
        <Link
          href={href}
          className="text-sm text-accent hover:text-accent-dark flex items-center gap-0.5 transition-colors"
        >
          Ver todos <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
