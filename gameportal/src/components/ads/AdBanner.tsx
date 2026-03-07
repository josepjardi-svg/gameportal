// src/components/ads/AdBanner.tsx
'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type AdType = 'leaderboard' | 'rectangle' | 'skyscraper' | 'inline';

interface AdBannerProps {
  type: AdType;
  className?: string;
  slot?: string;
}

const adConfigs: Record<AdType, { width: number; height: number; label: string }> = {
  leaderboard: { width: 728, height: 90, label: 'Banner 728×90' },
  rectangle: { width: 300, height: 250, label: 'Rectángulo 300×250' },
  skyscraper: { width: 160, height: 600, label: 'Rascacielos 160×600' },
  inline: { width: 300, height: 250, label: 'Inline 300×250' },
};

export default function AdBanner({ type, className, slot }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const config = adConfigs[type];

  useEffect(() => {
    // Google AdSense initialization
    // In production: replace with actual AdSense code
    if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {
        // Ad already initialized
      }
    }
  }, []);

  return (
    <div
      ref={adRef}
      className={cn(
        'flex items-center justify-center overflow-hidden shrink-0',
        className
      )}
      style={{ minWidth: Math.min(config.width, 320), minHeight: config.height }}
    >
      {/* 
        Production: Replace this div with Google AdSense ins tag:
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: config.width, height: config.height }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      */}
      <div
        className="border border-dashed border-border/40 rounded flex items-center justify-center bg-surface-2/30 text-muted text-xs"
        style={{ width: '100%', height: config.height, maxWidth: config.width }}
      >
        {config.label}
      </div>
    </div>
  );
}
