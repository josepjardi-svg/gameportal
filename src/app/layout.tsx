// src/app/layout.tsx
import type { Metadata } from 'next';
import { Rajdhani, Exo_2 } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/utils';

const displayFont = Rajdhani({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const bodyFont = Exo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} - Juegos HTML5 Online Gratis`, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  keywords: ['juegos online', 'juegos html5', 'juegos gratis', 'juegos navegador', 'juegos sin descargas'],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Juegos HTML5 Online Gratis`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} - Juegos HTML5 Online Gratis`,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="bg-background text-white font-body antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
