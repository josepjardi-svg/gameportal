import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Política de Cookies | ${SITE_NAME}`,
  description: `Política de cookies de ${SITE_NAME}`,
};

export default function CookiesPage() {
  return (
    <div className="section-container py-12 max-w-3xl mx-auto">
      <h1 className="font-display text-3xl font-bold text-white mb-8">Política de Cookies</h1>
      <div className="space-y-6 text-muted text-sm leading-relaxed">
        <section>
          <h2 className="text-white font-semibold text-lg mb-2">¿Qué son las cookies?</h2>
          <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web.</p>
        </section>
        <section>
          <h2 className="text-white font-semibold text-lg mb-2">¿Qué cookies usamos?</h2>
          <p>Usamos cookies de Google AdSense para mostrar anuncios relevantes. Estas cookies pueden recopilar información sobre tus hábitos de navegación.</p>
        </section>
        <section>
          <h2 className="text-white font-semibold text-lg mb-2">¿Cómo desactivar las cookies?</h2>
          <p>Puedes desactivar las cookies en la configuración de tu navegador. Ten en cuenta que esto puede afectar al funcionamiento de algunos servicios.</p>
        </section>
        <section>
          <h2 className="text-white font-semibold text-lg mb-2">Cookies de terceros</h2>
          <p>Los juegos de terceros alojados en nuestra plataforma pueden usar sus propias cookies. No controlamos estas cookies.</p>
        </section>
      </div>
    </div>
  );
}