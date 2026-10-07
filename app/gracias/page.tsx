"use client";

import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";

// Después del pago (docs/diseno/decisiones.md · D18): el recibo de la suscripción, en papel
// sobre el mostrador, con el acceso a la cuenta como acción principal.

const POST_CHECKOUT_URL = process.env.NEXT_PUBLIC_POST_CHECKOUT_URL ?? "https://rest-hub.vercel.app/";
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "51961869348";

function GraciasContent() {
  const params = useSearchParams();
  const orderId = params.get("orden");
  const planName = params.get("plan") ?? "tu plan";
  const email = params.get("email");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-mostrador px-5 py-16 font-brand text-white">
      <Link href="/" className="mb-10 inline-flex min-h-11 items-center" aria-label="RestHUB, ir al inicio">
        <Image src="/logo.svg" alt="RestHUB" width={120} height={24} className="h-6 w-auto invert" />
      </Link>

      <div className="gracias-entra comanda-papel w-full max-w-[480px] bg-papel text-mostrador shadow-[0_34px_64px_-26px_rgba(0,0,0,0.9)]">
        <div aria-hidden="true" className="comanda-troquel h-3" />
        <div className="px-6 pb-7 pt-3 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1 border-b-2 border-mostrador pb-2.5">
            <span className="display-cond text-[26px] uppercase leading-none">Recibo</span>
            {orderId && <span className="display-cond text-[19px] leading-none text-numerador tabular-nums">Orden {orderId}</span>}
          </div>

          <CheckCircle2 className="mt-6 size-10 text-menta-oscura" strokeWidth={2.2} aria-hidden="true" />
          <h1 className="display-cond mt-3 text-[clamp(2.5rem,8vw,3.25rem)] uppercase leading-[0.92]">¡Bienvenido a RestHUB!</h1>
          <p className="mt-4 text-[17px] leading-[1.5]">
            Activamos tu plan <strong className="font-extrabold">{planName}</strong>.
            {email && (
              <>
                <br />
                Te enviamos el recibo a <strong className="font-extrabold">{email}</strong>.
              </>
            )}
          </p>
          <p className="mt-3 text-[15px] font-semibold italic text-tinta">Suscripción confirmada.</p>

          <a
            href={POST_CHECKOUT_URL}
            className="comanda-mandar mt-7 flex h-13 w-full items-center justify-center gap-2 rounded-lg bg-mostrador text-[17px] font-extrabold text-white"
          >
            Acceder a tu cuenta
            <ArrowRight className="size-[18px]" strokeWidth={2.5} aria-hidden="true" />
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              `Hola, acabo de suscribirme a ${planName}${orderId ? ` (orden ${orderId})` : ""}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="comanda-plato mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-lg border-[1.5px] border-mostrador text-[17px] font-extrabold"
          >
            <MessageCircle className="size-[18px] text-[#128C4A]" strokeWidth={2.4} aria-hidden="true" />
            WhatsApp soporte
          </a>
        </div>
      </div>

      <Link href="/" className="mt-8 inline-flex min-h-11 items-center text-[15px] text-texto-3 transition-colors hover:text-white">
        ← Volver a la web
      </Link>

      <style>{`
        @keyframes gracias-entra { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        .gracias-entra { animation: gracias-entra 400ms cubic-bezier(0.23, 1, 0.32, 1) both; }
        @media (prefers-reduced-motion: reduce) { .gracias-entra { animation: none; } }
      `}</style>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <GraciasContent />
    </Suspense>
  );
}
