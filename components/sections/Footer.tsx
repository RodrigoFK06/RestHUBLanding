import Image from "next/image";
import Link from "next/link";

const productLinks = [
  { href: "#modulos", label: "Módulos" },
  { href: "#roles", label: "Roles" },
  { href: "#flujo", label: "Flujo operativo" },
  { href: "#vs", label: "Comparativa" },
];

const whyLinks = [
  { href: "#why", label: "Nuestra misión" },
  { href: "#mensajes", label: "Argumentos clave" },
  { href: "#faq", label: "FAQ" },
];

const contactLinks = [
  { href: "mailto:hola@resthub.app", label: "hola@resthub.app" },
  { href: "#cta", label: "Solicitar demo" },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/8 pt-16 pb-10">
      <div className="max-w-[1160px] mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 mb-12">
          {/* Brand */}
          <div>
            <Image src="/logo.svg" alt="RestHUB" width={0} height={0} sizes="200px" className="invert mb-4" style={{ height: '1.5rem', width: 'auto' }} />
            <p className="text-[0.84rem] text-[#64748B] leading-[1.65] max-w-[240px]">
              El hub operativo completo para restaurantes — desde la mesa hasta el balance.
            </p>
          </div>

          {/* Producto */}
          <div>
            <h5 className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-[#64748B] mb-3.5">Producto</h5>
            <ul className="flex flex-col gap-2.5">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[0.84rem] text-[#64748B] hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Por qué */}
          <div>
            <h5 className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-[#64748B] mb-3.5">Por qué RestHUB</h5>
            <ul className="flex flex-col gap-2.5">
              {whyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[0.84rem] text-[#64748B] hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h5 className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-[#64748B] mb-3.5">Contacto</h5>
            <ul className="flex flex-col gap-2.5">
              {contactLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[0.84rem] text-[#64748B] hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-white/6">
          <p className="text-[0.75rem] text-[#64748B]">© 2026 RestHUB. Todos los derechos reservados.</p>
          <span className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[rgba(148,163,184,0.35)] px-3 py-1 rounded-full bg-white/3 border border-white/5">
            v1.0 · Abril 2026
          </span>
        </div>
      </div>
    </footer>
  );
}
