import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos del Servicio · RestHUB",
  description:
    "Condiciones de uso del producto RestHUB. Versión informativa, no sustituye asesoría legal.",
  robots: { index: true, follow: true },
};

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "1. Aceptación",
    body: (
      <p>
        Al usar RestHUB aceptas estos términos. Si no estás de acuerdo con alguna parte, por
        favor no uses el servicio.
      </p>
    ),
  },
  {
    title: "2. El servicio",
    body: (
      <p>
        RestHUB es una plataforma SaaS para gestión de restaurantes (POS, KDS, caja,
        contabilidad y BI). Lo ofrecemos &ldquo;tal cual&rdquo;, mejorándolo continuamente.
      </p>
    ),
  },
  {
    title: "3. Tu cuenta",
    body: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Eres responsable de mantener tus credenciales seguras.</li>
        <li>Eres responsable de la actividad realizada con tu cuenta.</li>
        <li>Avísanos de inmediato si detectas un acceso no autorizado.</li>
      </ul>
    ),
  },
  {
    title: "4. Pagos y suscripción",
    body: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Los planes se cobran por adelantado (mensual o anual) según el plan elegido.</li>
        <li>Puedes cancelar cuando quieras desde tu panel; conservas el acceso hasta el final del periodo facturado.</li>
        <li>No hacemos reembolsos por períodos parciales, salvo error técnico atribuible a nosotros.</li>
      </ul>
    ),
  },
  {
    title: "5. Uso aceptable",
    body: (
      <p>
        No puedes usar RestHUB para actividades ilegales, intentar vulnerar el sistema,
        revender el acceso a terceros sin autorización, o realizar ingeniería inversa
        del software.
      </p>
    ),
  },
  {
    title: "6. Datos y propiedad",
    body: (
      <p>
        Los datos de tu operación te pertenecen. RestHUB es propiedad de su equipo
        desarrollador. Te otorgamos una licencia de uso intransferible mientras tu
        suscripción esté activa.
      </p>
    ),
  },
  {
    title: "7. Disponibilidad",
    body: (
      <p>
        Apuntamos a 99.9% de uptime mensual en planes Profesional y Empresa. Mantenimientos
        programados se anuncian con al menos 48 horas de anticipación.
      </p>
    ),
  },
  {
    title: "8. Limitación de responsabilidad",
    body: (
      <p>
        RestHUB no se hace responsable por lucro cesante derivado de caídas o errores del
        sistema, salvo que se demuestre dolo o culpa grave de nuestra parte. Nuestra
        responsabilidad máxima se limita al monto pagado en los últimos 3 meses.
      </p>
    ),
  },
  {
    title: "9. Cambios",
    body: (
      <p>
        Podemos actualizar estos términos. Te avisaremos por correo o un aviso destacado
        con al menos 30 días de anticipación cuando los cambios sean materiales.
      </p>
    ),
  },
  {
    title: "10. Ley aplicable",
    body: (
      <p>
        Estos términos se rigen por las leyes de la República del Perú. Cualquier
        controversia se someterá a los jueces de Lima.
      </p>
    ),
  },
];

export default function TerminosPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <p className="text-[0.7rem] tracking-[0.18em] uppercase font-bold text-[#F59E0B] mb-3">
        Términos
      </p>
      <h1 className="text-[clamp(2rem,4vw,2.8rem)] font-black tracking-[-0.02em] leading-[1.05] mb-3">
        Términos del Servicio
      </h1>
      <p className="text-sm text-white/45 mb-10">Última actualización: 1 de mayo de 2026</p>

      <div className="flex flex-col gap-8">
        {SECTIONS.map((s) => (
          <section key={s.title}>
            <h2 className="text-[1.1rem] font-bold text-white mb-2">{s.title}</h2>
            <div className="text-[0.92rem] text-white/65 leading-[1.8]">{s.body}</div>
          </section>
        ))}
      </div>

      <p className="mt-12 text-[0.78rem] text-white/40 leading-relaxed">
        Esta versión es informativa y no sustituye asesoría legal especializada. Antes de
        operar comercialmente RestHUB, deberías revisarla con un abogado.
      </p>
    </article>
  );
}
