import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Términos de Uso | ${SITE_NAME}`,
  description: `Términos de uso de ${SITE_NAME}`,
};

export default function TerminosPage() {
  return (
    <div className="section-container py-12 max-w-3xl mx-auto">
      <h1 className="font-display text-3xl font-bold text-white mb-8">Términos de Uso</h1>
      <div className="space-y-6 text-muted text-sm leading-relaxed">
        <section>
          <h2 className="text-white font-semibold text-lg mb-2">1. Aceptación de los términos</h2>
          <p>Al acceder y usar {SITE_NAME}, aceptas estos términos de uso. Si no estás de acuerdo, por favor no uses el sitio.</p>
        </section>
        <section>
          <h2 className="text-white font-semibold text-lg mb-2">2. Uso del servicio</h2>
          <p>{SITE_NAME} es un portal de juegos HTML5 gratuitos. Los juegos son proporcionados por terceros y son propiedad de sus respectivos desarrolladores.</p>
        </section>
        <section>
          <h2 className="text-white font-semibold text-lg mb-2">3. Propiedad intelectual</h2>
          <p>Los juegos alojados en este portal son propiedad de sus respectivos desarrolladores. {SITE_NAME} no reclama ningún derecho sobre los juegos de terceros.</p>
        </section>
        <section>
          <h2 className="text-white font-semibold text-lg mb-2">4. Limitación de responsabilidad</h2>
          <p>{SITE_NAME} no se hace responsable de los contenidos de los juegos de terceros ni de los daños que puedan derivarse de su uso.</p>
        </section>
        <section>
          <h2 className="text-white font-semibold text-lg mb-2">5. Modificaciones</h2>
          <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán publicados en esta página.</p>
        </section>
      </div>
    </div>
  );
}