import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Contacto | ${SITE_NAME}`,
  description: `Contacta con ${SITE_NAME}`,
};

export default function ContactoPage() {
  return (
    <div className="section-container py-12 max-w-3xl mx-auto">
      <h1 className="font-display text-3xl font-bold text-white mb-8">Contacto</h1>
      <div className="space-y-6 text-muted text-sm leading-relaxed">
        <section>
          <h2 className="text-white font-semibold text-lg mb-2">¿Tienes alguna pregunta?</h2>
          <p>Si tienes alguna pregunta, sugerencia o problema con algún juego, no dudes en contactarnos.</p>
        </section>
        <section>
          <h2 className="text-white font-semibold text-lg mb-2">Email</h2>
          <p>Puedes contactarnos en: <a href="mailto:info@juegoshtml5.com" className="text-accent hover:underline">info@juegoshtml5.com</a></p>
        </section>
        <section>
          <h2 className="text-white font-semibold text-lg mb-2">Tiempo de respuesta</h2>
          <p>Intentamos responder a todos los mensajes en un plazo de 48 horas.</p>
        </section>
      </div>
    </div>
  );
}