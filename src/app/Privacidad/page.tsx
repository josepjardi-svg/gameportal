import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Política de Privacidad | ${SITE_NAME}`,
  description: `Política de privacidad de ${SITE_NAME}`,
};

export default function PrivacidadPage() {
  return (
    <div className="section-container py-12 max-w-3xl mx-auto">
      <h1 className="font-display text-3xl font-bold text-white mb-8">Política de Privacidad</h1>
      
      <div className="space-y-6 text-muted text-sm leading-relaxed">
        <section>
          <h2 className="text-white font-semibold text-lg mb-2">1. Información general</h2>
          <p>En {SITE_NAME} ({SITE_URL}), accesible desde juegoshtml5.com, nos tomamos muy en serio la privacidad de nuestros usuarios. Esta política de privacidad describe qué información recopilamos y cómo la utilizamos.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-lg mb-2">2. Datos que recopilamos</h2>
          <p>No recopilamos información personal identificable de nuestros usuarios. Los juegos de terceros alojados en nuestra plataforma pueden recopilar datos según sus propias políticas de privacidad.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-lg mb-2">3. Cookies</h2>
          <p>Utilizamos cookies para mejorar la experiencia del usuario. Google AdSense, nuestro proveedor de publicidad, puede utilizar cookies para mostrar anuncios relevantes. Puedes desactivar las cookies en la configuración de tu navegador.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-lg mb-2">4. Publicidad</h2>
          <p>Utilizamos Google AdSense para mostrar anuncios. Google puede utilizar cookies para personalizar los anuncios según tus intereses. Puedes optar por no recibir anuncios personalizados visitando <a href="https://www.google.com/settings/ads" className="text-accent hover:underline">Configuración de anuncios de Google</a>.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-lg mb-2">5. Enlaces a terceros</h2>
          <p>Nuestra web contiene juegos y enlaces a sitios de terceros. No somos responsables de las prácticas de privacidad de estos sitios.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-lg mb-2">6. Cambios en esta política</h2>
          <p>Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Los cambios serán publicados en esta página.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-lg mb-2">7. Contacto</h2>
          <p>Si tienes alguna pregunta sobre esta política de privacidad, puedes contactarnos a través de nuestra página de contacto.</p>
        </section>
      </div>
    </div>
  );
}