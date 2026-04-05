import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `DMCA | ${SITE_NAME}`,
  description: `Política DMCA de ${SITE_NAME}`,
};

export default function DmcaPage() {
  return (
    <div className="section-container py-12 max-w-3xl mx-auto">
      <h1 className="font-display text-3xl font-bold text-white mb-8">DMCA</h1>
      <div className="space-y-6 text-muted text-sm leading-relaxed">
        <section>
          <h2 className="text-white font-semibold text-lg mb-2">Política de derechos de autor</h2>
          <p>{SITE_NAME} respeta los derechos de propiedad intelectual y espera que sus usuarios hagan lo mismo. Todos los juegos alojados en nuestra plataforma son proporcionados por terceros y son propiedad de sus respectivos desarrolladores.</p>
        </section>
        <section>
          <h2 className="text-white font-semibold text-lg mb-2">Notificación de infracción</h2>
          <p>Si crees que algún contenido de nuestra plataforma infringe tus derechos de autor, envíanos una notificación a <a href="mailto:dmca@juegoshtml5.com" className="text-accent hover:underline">dmca@juegoshtml5.com</a> con la siguiente información:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Identificación del contenido protegido por derechos de autor</li>
            <li>URL del contenido que infringe los derechos</li>
            <li>Tu información de contacto</li>
            <li>Una declaración de que la información es correcta</li>
          </ul>
        </section>
        <section>
          <h2 className="text-white font-semibold text-lg mb-2">Respuesta</h2>
          <p>Revisaremos todas las notificaciones y eliminaremos el contenido infractor en un plazo de 48 horas si la notificación es válida.</p>
        </section>
      </div>
    </div>
  );
}