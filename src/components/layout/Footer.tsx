// src/components/layout/Footer.tsx
import Link from 'next/link';
import { Gamepad2, Zap } from 'lucide-react';
import { SITE_NAME } from '@/lib/utils';
import AdBanner from '@/components/ads/AdBanner';

export default function Footer() {
  const categories = [
    { slug: 'accion', name: 'Acción' },
    { slug: 'puzzle', name: 'Puzzle' },
    { slug: 'aventura', name: 'Aventura' },
    { slug: 'deportes', name: 'Deportes' },
    { slug: 'carreras', name: 'Carreras' },
    { slug: 'disparos', name: 'Disparos' },
    { slug: 'arcade', name: 'Arcade' },
  ];

  return (
    <footer className="bg-surface border-t border-border mt-16">
      {/* Footer ad */}
      <div className="border-b border-border/50 flex justify-center py-3">
        <AdBanner type="leaderboard" />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="relative">
                <Gamepad2 className="w-6 h-6 text-accent" />
                <Zap className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1" />
              </div>
              <span className="text-lg font-bold text-white font-display">{SITE_NAME}</span>
            </Link>
            <p className="text-sm text-muted leading-relaxed">
              El mejor portal de juegos HTML5 gratuitos online. Miles de juegos sin descargas ni registros.
            </p>
          </div>

          {/* Categorías */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Categorías</h3>
            <ul className="space-y-2">
              {categories.slice(0, 4).map(cat => (
                <li key={cat.slug}>
                  <Link href={`/juegos/${cat.slug}`} className="text-sm text-muted hover:text-accent transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:pt-9">
            <ul className="space-y-2">
              {categories.slice(4).map(cat => (
                <li key={cat.slug}>
                  <Link href={`/juegos/${cat.slug}`} className="text-sm text-muted hover:text-accent transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2">
              {[
                { href: '/privacidad', label: 'Política de Privacidad' },
                { href: '/terminos', label: 'Términos de Uso' },
                { href: '/cookies', label: 'Política de Cookies' },
                { href: '/contacto', label: 'Contacto' },
                { href: '/dmca', label: 'DMCA' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {SITE_NAME}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted">
            Todos los juegos son propiedad de sus respectivos desarrolladores.
          </p>
        </div>
      </div>
    </footer>
  );
}
