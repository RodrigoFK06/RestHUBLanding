import Link from "next/link";
import Image from "next/image";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <header className="border-b border-white/8">
        <div className="max-w-[920px] mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="RestHUB"
              width={0}
              height={0}
              sizes="200px"
              className="invert"
              style={{ height: "1.3rem", width: "auto" }}
            />
          </Link>
          <Link
            href="/"
            className="text-[0.78rem] text-white/55 hover:text-white transition-colors"
          >
            ← Volver
          </Link>
        </div>
      </header>
      <main className="max-w-[760px] mx-auto px-6 py-16">{children}</main>
      <footer className="border-t border-white/8 mt-12">
        <div className="max-w-[920px] mx-auto px-6 py-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.75rem] text-white/45">
          <span>© 2026 RestHUB</span>
          <Link href="/legal/privacidad" className="hover:text-white">
            Privacidad
          </Link>
          <Link href="/legal/terminos" className="hover:text-white">
            Términos
          </Link>
        </div>
      </footer>
    </div>
  );
}
