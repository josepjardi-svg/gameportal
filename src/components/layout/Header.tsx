// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Gamepad2, Zap } from 'lucide-react';
import SearchBar from '@/components/ui/SearchBar';
import { SITE_NAME } from '@/lib/utils';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/juegos/accion', label: 'Acción' },
  { href: '/juegos/arcade', label: 'Arcade' },
  { href: '/juegos/aventura', label: 'Aventura' },
  { href: '/juegos/carreras', label: 'Carreras' },
  { href: '/juegos/deportes', label: 'Deportes' },
  { href: '/juegos/disparos', label: 'Disparos' },
  { href: '/juegos/puzzle', label: 'Puzzle' },
];

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border">
      {/* Ad banner top */}
      <div className="bg-background/80 flex items-center justify-center py-1.5 border-b border-border/50">
        <div className="ad-banner-leaderboard h-[50px] flex items-center justify-center text-muted text-xs">
          {/* Ad: 728x90 Leaderboard */}
          <span className="border border-dashed border-border/50 rounded px-4 py-1">Publicidad 728×90</span>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center gap-4 h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="relative">
              <Gamepad2 className="w-7 h-7 text-accent group-hover:animate-glow transition-all" />
              <Zap className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight font-display">
              {SITE_NAME}
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-1 flex-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm text-muted hover:text-white hover:bg-surface-2 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="hidden md:block flex-1 max-w-sm">
            <SearchBar />
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden ml-auto p-2 text-muted hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-surface border-t border-border px-4 pb-4 animate-fade-in">
          <div className="pt-3 pb-2">
            <SearchBar />
          </div>
          <nav className="flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-muted hover:text-white hover:bg-surface-2 rounded-md transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
