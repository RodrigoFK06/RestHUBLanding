import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad · RestHUB",
  description:
    "Cómo RestHUB recolecta, usa y protege tus datos personales. Versión informativa, no sustituye asesoría legal.",
  robots: { index: true, follow: true },
};

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "1. Quiénes somos",
    body: (
      <p>
        RestHUB es un sistema de gestión integral para restaurantes desarrollado por el equipo
        RestHUB con base en Lima, Perú. Si necesitas contactarnos sobre privacidad, escríbenos a{" "}
        <a className="text-ambar hover:underline" href="mailto:rodrigoan.torresp@gmail.com">
          rodrigoan.torresp@gmail.com
        </a>
        .
      </p>
    ),
  },
  {
    title: "2. Qué datos recolectamos",
    body: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Datos de contacto (nombre, email, teléfono, restaurante) cuando llenas el formulario.</li>
        <li>Datos de facturación cuando contratas un plan.</li>
        <li>Datos técnicos (IP, navegador) solo para prevenir abuso y medir uso agregado.</li>
        <li>Cookies estrictamente necesarias para el funcionamiento del sitio.</li>
      </ul>
    ),
  },
  {
    title: "3. Para qué usamos tus datos",
    body: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Responder tus consultas y agendar demos.</li>
        <li>Procesar tu suscripción y enviarte facturas y recibos.</li>
        <li>Mejorar el producto y comunicarte novedades relevantes (si aceptaste el newsletter).</li>
        <li>Cumplir obligaciones legales y prevenir fraude.</li>
      </ul>
    ),
  },
  {
    title: "4. Con quién los compartimos",
    body: (
      <p>
        Solo con proveedores que necesitamos para operar (correo, hosting, pasarelas de pago)
        y bajo acuerdos de confidencialidad. Nunca vendemos tus datos a terceros.
      </p>
    ),
  },
  {
    title: "5. Tus derechos",
    body: (
      <p>
        Puedes solicitar acceso, rectificación, eliminación o portabilidad de tus datos
        escribiéndonos al correo arriba. Respondemos en máximo 15 días hábiles.
      </p>
    ),
  },
  {
    title: "6. Cambios a esta política",
    body: (
      <p>
        Si actualizamos esta política te notificaremos por correo (si tenemos el tuyo) o con
        un aviso destacado en este sitio.
      </p>
    ),
  },
];

export default function PrivacidadPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="display-cond mb-3 text-[clamp(2.5rem,5vw,3.5rem)] leading-[0.92] tracking-[-0.01em]">
        Política de Privacidad
      </h1>
      <p className="text-sm text-texto-3 mb-10">
        Última actualización: 1 de mayo de 2026
      </p>

      <div className="flex flex-col gap-8">
        {SECTIONS.map((s) => (
          <section key={s.title}>
            <h2 className="text-[1.1rem] font-bold text-white mb-2">{s.title}</h2>
            <div className="text-[0.92rem] text-texto-2 leading-[1.8]">{s.body}</div>
          </section>
        ))}
      </div>

      <p className="mt-12 text-[0.78rem] text-texto-3 leading-relaxed">
        Esta versión es informativa y no sustituye asesoría legal especializada. Antes de
        operar comercialmente RestHUB, deberías revisarla con un abogado en tu jurisdicción.
      </p>
    </article>
  );
}
