'use client';

import { useRef, useState, useCallback } from 'react';
import { Maximize2, Minimize2, RefreshCw, Loader2 } from 'lucide-react';

interface GamePlayerProps {
  gameUrl: string;
  title: string;
  width?: number;
  height?: number;
}

export default function GamePlayer({ gameUrl, title, width = 800, height = 600 }: GamePlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => setIsFullscreen(true)).catch(console.error);
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(console.error);
    }
  }, []);

  const handleReload = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      iframeRef.current.src = gameUrl;
    }
  };

  const aspectRatio = (height / width) * 100;

  return (
    <div className="w-full">
      {/* Player container */}
      <div
        ref={containerRef}
        className="relative bg-black rounded-xl overflow-hidden border border-border/50 group"
        style={{ paddingTop: `min(${aspectRatio}%, 75vh)` }}
      >
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface z-10">
            <div className="flex flex-col items-center gap-3 text-muted">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
              <span className="text-sm">Cargando juego...</span>
            </div>
          </div>
        )}

        {/* Game iframe */}
        <iframe
          ref={iframeRef}
          src={gameUrl}
          title={title}
          className="absolute inset-0 w-full h-full border-0"
          allow="fullscreen; autoplay; payment"
          allowFullScreen
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-pointer-lock"
        />

        {/* Controls overlay (shown on hover) */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <button
            onClick={handleReload}
            className="bg-black/70 text-white p-2 rounded-lg hover:bg-black/90 transition-colors"
            title="Reiniciar juego"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="bg-black/70 text-white p-2 rounded-lg hover:bg-black/90 transition-colors"
            title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Controls bar */}
      <div className="flex items-center justify-between mt-3 px-1 gap-3">
        <button
          onClick={handleReload}
          className="flex items-center gap-1.5 text-xs text-muted hover:text-white transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reiniciar
        </button>

        {/* Big fullscreen button */}
        <button
          onClick={toggleFullscreen}
          className="flex-1 flex items-center justify-center gap-2 bg-accent hover:bg-accent/80 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
        >
          <Maximize2 className="w-4 h-4" />
          {isFullscreen ? 'Salir de pantalla completa' : '⛶ Jugar en pantalla completa'}
        </button>

        <span className="text-xs text-muted hidden md:block truncate max-w-[150px]">{title}</span>
      </div>
    </div>
  );
}