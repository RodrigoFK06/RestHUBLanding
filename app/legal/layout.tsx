import Link from "next/link";
import Image from "next/image";

// Páginas legales en el mundo de la comanda (docs/diseno/decisiones.md · D18).
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-mostrador font-brand text-white">
      <header className="border-b border-linea">
        <div className="mx-auto flex max-w-[920px] items-center justify-between px-5 py-4 sm:px-6">
          <Link href="/" className="inline-flex min-h-11 items-center" aria-label="RestHUB, ir al inicio">
            <Image src="/logo.svg" alt="RestHUB" width={110} height={22} className="h-[22px] w-auto invert" />
          </Link>
          <Link href="/" className="inline-flex min-h-11 items-center text-[15px] text-texto-2 transition-colors hover:text-white">
            ← Volver
          </Link>
        </div>
      </header>
      <main className="legal-texto mx-auto max-w-[760px] px-5 py-16 sm:px-6">{children}</main>
      <footer className="mt-12 border-t border-linea">
        <div className="mx-auto flex max-w-[920px] flex-wrap gap-x-6 gap-y-2 px-5 py-6 text-[15px] text-texto-3 sm:px-6">
          <span>© 2026 RestHUB</span>
          <Link href="/legal/privacidad" className="transition-colors hover:text-white">
            Privacidad
          </Link>
          <Link href="/legal/terminos" className="transition-colors hover:text-white">
            Términos
          </Link>
        </div>
      </footer>
    </div>
  );
}
