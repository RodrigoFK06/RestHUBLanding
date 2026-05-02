import { NextResponse } from "next/server";
import { contactInbox, getTransporter, mailFrom } from "@/lib/mailer";
import { clientIp, rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

type CheckoutPayload = {
  planId?: string;
  planName?: string;
  amount?: number;
  currency?: string;
  billing?: "monthly" | "yearly";
  customer?: {
    name?: string;
    email?: string;
    restaurant?: string;
  };
  card?: {
    last4?: string;
    brand?: string;
  };
  website?: string; // honeypot
};

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const orderId = () => {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `RH-${stamp}-${rand}`;
};

export async function POST(req: Request) {
  // Rate limit: 10 intentos por IP cada 10 minutos
  const ip = clientIp(req);
  const rl = rateLimit(`checkout:${ip}`, { limit: 10, windowMs: 10 * 60 * 1000 });
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: `Demasiados intentos. Espera ${rl.retryAfterSec}s.` },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
    );
  }

  let body: CheckoutPayload;
  try {
    body = (await req.json()) as CheckoutPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido." }, { status: 400 });
  }

  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, orderId: "RH-HONEYPOT" });
  }

  const planName = (body.planName ?? "").trim() || "Plan RestHUB";
  const planId = (body.planId ?? "").trim() || "pro";
  const amount = typeof body.amount === "number" ? body.amount : 0;
  const currency = (body.currency ?? "USD").toUpperCase();
  const billing = body.billing === "yearly" ? "yearly" : "monthly";
  const customer = {
    name: (body.customer?.name ?? "").trim(),
    email: (body.customer?.email ?? "").trim(),
    restaurant: (body.customer?.restaurant ?? "").trim(),
  };
  const card = {
    last4: (body.card?.last4 ?? "").replace(/\D/g, "").slice(-4),
    brand: (body.card?.brand ?? "Card").trim(),
  };

  if (!customer.name || !customer.email) {
    return NextResponse.json(
      { ok: false, error: "Nombre y email son obligatorios." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
    return NextResponse.json({ ok: false, error: "Email inválido." }, { status: 400 });
  }

  const id = orderId();
  const formattedAmount = `${currency === "USD" ? "$" : currency + " "}${amount.toFixed(2)}`;
  const billingLabel = billing === "yearly" ? "Anual" : "Mensual";
  const redirectUrl =
    process.env.NEXT_PUBLIC_POST_CHECKOUT_URL ?? "https://megalodon-blue.vercel.app/auth/login";

  try {
    const transporter = getTransporter();

    const customerHtml = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fff;color:#0F172A;padding:40px;border-radius:16px;max-width:560px;margin:0 auto;">
        <div style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#F59E0B;font-weight:700;margin-bottom:8px;">RestHUB · Recibo</div>
        <h1 style="font-size:26px;font-weight:800;letter-spacing:-.02em;margin:0 0 8px;">Bienvenido a RestHUB, ${escape(customer.name.split(" ")[0])}.</h1>
        <p style="font-size:15px;line-height:1.7;color:#475569;margin:0 0 24px;">
          Tu suscripción al plan <strong style="color:#0F172A;">${escape(planName)}</strong> quedó activa.
          Te enviamos este recibo para tus registros.
        </p>
        <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:14px;padding:20px;margin-bottom:20px;">
          <table style="width:100%;font-size:14px;line-height:1.7;">
            <tr><td style="color:#64748B;">Orden</td><td style="text-align:right;color:#0F172A;font-weight:600;font-family:ui-monospace,Menlo,monospace;">${escape(id)}</td></tr>
            <tr><td style="color:#64748B;">Plan</td><td style="text-align:right;color:#0F172A;font-weight:600;">${escape(planName)}</td></tr>
            <tr><td style="color:#64748B;">Facturación</td><td style="text-align:right;color:#0F172A;">${billingLabel}</td></tr>
            <tr><td style="color:#64748B;">Método</td><td style="text-align:right;color:#0F172A;">${escape(card.brand)} ····${escape(card.last4 || "0000")}</td></tr>
            <tr><td style="color:#64748B;padding-top:10px;border-top:1px solid #E2E8F0;">Total</td><td style="text-align:right;color:#0F172A;font-weight:800;font-size:18px;padding-top:10px;border-top:1px solid #E2E8F0;">${escape(formattedAmount)}</td></tr>
          </table>
        </div>
        <a href="${escape(redirectUrl)}" style="display:block;text-align:center;background:#F59E0B;color:#0F172A;font-weight:700;text-decoration:none;padding:14px 24px;border-radius:12px;margin:8px 0 24px;">Acceder a tu cuenta →</a>
        <p style="font-size:13px;color:#64748B;line-height:1.7;margin:0 0 8px;">
          Tu accesso queda en <a style="color:#F59E0B;text-decoration:none;" href="${escape(redirectUrl)}">${escape(redirectUrl)}</a>.
          Usa el correo con el que te suscribiste para iniciar sesión.
        </p>
        <p style="font-size:13px;color:#64748B;line-height:1.7;margin:0 0 24px;">
          ¿Dudas con la implementación? Escríbenos por WhatsApp al
          <a style="color:#F59E0B;text-decoration:none;" href="https://wa.me/51961869348">+51 961 869 348</a>.
        </p>
        <div style="padding-top:18px;border-top:1px solid #E2E8F0;font-size:11px;color:#94A3B8;">
          Pago procesado en modo demostración. RestHUB · ${new Date().toLocaleString("es-PE")}
        </div>
      </div>
    `;

    const adminHtml = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0F172A;color:#e2e8f0;padding:32px;border-radius:16px;max-width:560px;margin:0 auto;">
        <div style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#14B8A6;font-weight:700;margin-bottom:8px;">Nueva suscripción · ${escape(id)}</div>
        <h2 style="font-size:20px;margin:0 0 18px;color:#fff;">${escape(planName)} · ${billingLabel} · ${escape(formattedAmount)}</h2>
        <table style="width:100%;font-size:14px;line-height:1.7;">
          <tr><td style="color:#64748B;width:140px;">Cliente</td><td style="color:#fff;font-weight:600;">${escape(customer.name)}</td></tr>
          <tr><td style="color:#64748B;">Email</td><td><a style="color:#F59E0B;text-decoration:none;" href="mailto:${escape(customer.email)}">${escape(customer.email)}</a></td></tr>
          ${customer.restaurant ? `<tr><td style="color:#64748B;">Restaurante</td><td style="color:#fff;">${escape(customer.restaurant)}</td></tr>` : ""}
          <tr><td style="color:#64748B;">Tarjeta</td><td style="color:#fff;">${escape(card.brand)} ····${escape(card.last4 || "0000")}</td></tr>
          <tr><td style="color:#64748B;">Plan ID</td><td style="color:#fff;font-family:ui-monospace,Menlo,monospace;">${escape(planId)}</td></tr>
        </table>
        <div style="margin-top:18px;font-size:11px;color:#475569;">${new Date().toLocaleString("es-PE")}</div>
      </div>
    `;

    await Promise.all([
      transporter.sendMail({
        from: `"RestHUB" <${mailFrom()}>`,
        to: customer.email,
        subject: `Confirmación de suscripción · ${planName} · ${id}`,
        html: customerHtml,
        text: `Bienvenido a RestHUB, ${customer.name}.\n\nOrden: ${id}\nPlan: ${planName}\nFacturación: ${billingLabel}\nMétodo: ${card.brand} ····${card.last4}\nTotal: ${formattedAmount}\n\nAccede a tu cuenta: ${redirectUrl}\n\nWhatsApp soporte: +51 961 869 348`,
      }),
      transporter.sendMail({
        from: `"RestHUB Web" <${mailFrom()}>`,
        to: contactInbox(),
        replyTo: customer.email,
        subject: `[RestHUB] Nueva sub · ${planName} · ${customer.name}`,
        html: adminHtml,
        text: `Nueva suscripción ${id}\n${planName} ${billingLabel} ${formattedAmount}\n${customer.name} <${customer.email}>\nRestaurante: ${customer.restaurant}\nTarjeta: ${card.brand} ····${card.last4}`,
      }),
    ]);

    return NextResponse.json({ ok: true, orderId: id, redirectUrl });
  } catch (err) {
    console.error("[/api/checkout] error:", err);
    return NextResponse.json(
      { ok: false, error: "No pudimos confirmar el pago. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}
