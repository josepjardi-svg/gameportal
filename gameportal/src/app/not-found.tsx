// src/app/not-found.tsx
import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-8xl font-display font-bold text-accent opacity-20 leading-none mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-3">Página no encontrada</h1>
        <p className="text-muted mb-8 max-w-md mx-auto">
          El juego o página que buscas no existe o ha sido eliminado.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link href="/" className="btn-primary flex items-center gap-2">
            <Home className="w-4 h-4" /> Ir al inicio
          </Link>
          <Link href="/buscar" className="btn-secondary flex items-center gap-2">
            <Search className="w-4 h-4" /> Buscar juegos
          </Link>
        </div>
      </div>
    </div>
  );
}
