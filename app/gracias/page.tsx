"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";
import Confetti from "@/components/ui/Confetti";

const POST_CHECKOUT_URL =
  process.env.NEXT_PUBLIC_POST_CHECKOUT_URL ?? "https://megalodon-blue.vercel.app/auth/login";
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "51961869348";

function GraciasContent() {
  const params = useSearchParams();
  const orderId = params.get("orden");
  const planName = params.get("plan") ?? "tu plan";
  const email = params.get("email");

  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 3500);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 20%, rgba(245,158,11,0.18) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(20,184,166,0.12) 0%, transparent 60%)",
        }}
      />
      {showConfetti && (
        <div className="absolute top-0 left-0 right-0 h-[60vh]">
          <Confetti count={60} />
        </div>
      )}

      <div className="relative z-10 max-w-[520px] text-center">
        <Link href="/" className="inline-flex items-center mb-10">
          <Image
            src="/logo.svg"
            alt="RestHUB"
            width={0}
            height={0}
            sizes="200px"
            className="invert"
            style={{ height: "1.5rem", width: "auto" }}
          />
        </Link>

        <div
          className="mx-auto mb-7 w-20 h-20 rounded-full flex items-center justify-center relative"
          style={{
            background: "rgba(20,184,166,0.15)",
            border: "1px solid rgba(20,184,166,0.4)",
            animation: "pop 480ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <CheckCircle2 className="w-10 h-10 text-[#14B8A6]" strokeWidth={2} />
        </div>

        <div
          className="inline-flex items-center gap-2 text-[0.62rem] font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full mb-4"
          style={{
            background: "rgba(245,158,11,0.12)",
            border: "1px solid rgba(245,158,11,0.3)",
            color: "#F59E0B",
          }}
        >
          Suscripción confirmada
        </div>

        <h1 className="text-[clamp(2.2rem,5vw,3rem)] font-black tracking-[-0.025em] leading-[1.05] mb-4">
          ¡Bienvenido a RestHUB!
        </h1>
        <p className="text-base text-white/65 leading-[1.7] mb-2">
          Activamos tu plan <strong className="text-white/90">{planName}</strong>.
          {email && (
            <>
              <br />
              Te enviamos el recibo a <strong className="text-white/90">{email}</strong>.
            </>
          )}
        </p>
        {orderId && (
          <div className="text-[0.72rem] text-white/35 font-mono mb-8 mt-3">
            Orden {orderId}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <a
            href={POST_CHECKOUT_URL}
            className="inline-flex items-center justify-center gap-2 font-bold text-[#0F172A] px-7 py-3.5 rounded-full text-sm transition-all hover:scale-[1.02]"
            style={{ background: "#F59E0B", boxShadow: "0 8px 32px rgba(245,158,11,0.35)" }}
          >
            Acceder a tu cuenta
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              `Hola, acabo de suscribirme a ${planName}${orderId ? ` (orden ${orderId})` : ""}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 font-semibold text-white px-7 py-3.5 rounded-full text-sm border border-white/15 hover:border-[#25D366]/60 hover:bg-[#25D366]/10 transition-all"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            WhatsApp soporte
          </a>
        </div>

        <Link
          href="/"
          className="inline-block mt-10 text-[0.78rem] text-white/45 hover:text-white/85 transition-colors"
        >
          ← Volver a la web
        </Link>
      </div>

      <style>{`
        @keyframes pop { 0% { transform: scale(0.5); opacity: 0; } 70% { transform: scale(1.08); opacity: 1; } 100% { transform: scale(1); } }
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
