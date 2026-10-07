import { SITE_HOST } from "@/lib/site";
import { NextResponse } from "next/server";
import { contactInbox, getTransporter, mailFrom } from "@/lib/mailer";
import { clientIp, rateLimit } from "@/lib/rateLimit";
import { notify } from "@/lib/notify";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  restaurant?: string;
  message?: string;
  topic?: string;
  // honeypot — bots suelen completarlo, humanos no
  website?: string;
};

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(req: Request) {
  // Rate limit: 5 envíos por IP cada 10 minutos
  const ip = clientIp(req);
  const rl = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: `Demasiados envíos. Intenta de nuevo en ${rl.retryAfterSec}s.` },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
    );
  }

  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido." }, { status: 400 });
  }

  // Honeypot: si el campo invisible viene relleno, lo descartamos en silencio
  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim().slice(0, 120);
  const email = (body.email ?? "").trim().slice(0, 200);
  const phone = (body.phone ?? "").trim().slice(0, 40);
  const restaurant = (body.restaurant ?? "").trim().slice(0, 120);
  const message = (body.message ?? "").trim().slice(0, 4000);
  const topic = (body.topic ?? "Contacto general").trim().slice(0, 80);

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Nombre, email y mensaje son obligatorios." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Email inválido." }, { status: 400 });
  }

  if (message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Cuéntanos un poco más (mín. 10 caracteres)." },
      { status: 400 }
    );
  }

  try {
    const transporter = getTransporter();

    const adminHtml = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0F172A;color:#e2e8f0;padding:32px;border-radius:16px;max-width:560px;margin:0 auto;">
        <div style="border-left:3px solid #F59E0B;padding-left:14px;margin-bottom:24px;">
          <div style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#F59E0B;font-weight:700;">RestHUB · Nuevo contacto</div>
          <div style="font-size:13px;color:#94A3B8;margin-top:4px;">${escape(topic)}</div>
        </div>
        <table style="width:100%;font-size:14px;line-height:1.6;">
          <tr><td style="color:#64748B;padding:6px 0;width:120px;">Nombre</td><td style="color:#fff;font-weight:600;">${escape(name)}</td></tr>
          <tr><td style="color:#64748B;padding:6px 0;">Email</td><td style="color:#fff;"><a style="color:#F59E0B;text-decoration:none;" href="mailto:${escape(email)}">${escape(email)}</a></td></tr>
          ${phone ? `<tr><td style="color:#64748B;padding:6px 0;">Teléfono</td><td style="color:#fff;">${escape(phone)}</td></tr>` : ""}
          ${restaurant ? `<tr><td style="color:#64748B;padding:6px 0;">Restaurante</td><td style="color:#fff;">${escape(restaurant)}</td></tr>` : ""}
        </table>
        <div style="margin-top:24px;padding:18px;background:rgba(245,158,11,.06);border:1px solid rgba(245,158,11,.18);border-radius:12px;color:#e2e8f0;font-size:14px;line-height:1.65;white-space:pre-wrap;">${escape(message)}</div>
        <div style="margin-top:24px;font-size:11px;color:#475569;">Enviado desde ${SITE_HOST} · ${new Date().toLocaleString("es-PE")}</div>
      </div>
    `;

    const userHtml = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fff;color:#0F172A;padding:40px;border-radius:16px;max-width:520px;margin:0 auto;">
        <div style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#F59E0B;font-weight:700;margin-bottom:8px;">RestHUB</div>
        <h1 style="font-size:24px;font-weight:800;letter-spacing:-.02em;margin:0 0 16px;">Recibimos tu mensaje, ${escape(name.split(" ")[0])}.</h1>
        <p style="font-size:15px;line-height:1.7;color:#475569;margin:0 0 20px;">
          Gracias por escribirnos. Un miembro del equipo te responderá en menos de 24 horas hábiles
          al correo <strong style="color:#0F172A;">${escape(email)}</strong>.
        </p>
        <div style="padding:18px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;color:#0F172A;font-size:14px;line-height:1.65;white-space:pre-wrap;">${escape(message)}</div>
        <p style="font-size:13px;color:#64748B;margin:24px 0 0;line-height:1.7;">
          Si necesitas atención inmediata, escríbenos por WhatsApp al
          <a style="color:#F59E0B;text-decoration:none;" href="https://wa.me/51961869348">+51 961 869 348</a>.
        </p>
        <div style="margin-top:32px;padding-top:20px;border-top:1px solid #E2E8F0;font-size:11px;color:#94A3B8;">
          RestHUB · Tu restaurante, bajo control.
        </div>
      </div>
    `;

    await Promise.all([
      transporter.sendMail({
        from: `"RestHUB Web" <${mailFrom()}>`,
        to: contactInbox(),
        replyTo: email,
        subject: `[RestHUB] ${topic} — ${name}`,
        html: adminHtml,
        text: `Nuevo contacto desde la web\n\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nRestaurante: ${restaurant}\nTema: ${topic}\n\nMensaje:\n${message}`,
      }),
      transporter.sendMail({
        from: `"RestHUB" <${mailFrom()}>`,
        to: email,
        subject: "Recibimos tu mensaje · RestHUB",
        html: userHtml,
        text: `Hola ${name},\n\nRecibimos tu mensaje y te responderemos en menos de 24 h hábiles.\n\nTu mensaje:\n${message}\n\n— Equipo RestHUB`,
      }),
      notify({
        title: `📨 Nuevo contacto · ${topic}`,
        body: message.length > 280 ? message.slice(0, 280) + "…" : message,
        color: "info",
        fields: [
          { name: "Nombre", value: name },
          { name: "Email", value: email },
          ...(phone ? [{ name: "Teléfono", value: phone }] : []),
          ...(restaurant ? [{ name: "Restaurante", value: restaurant }] : []),
        ],
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] error:", err);
    return NextResponse.json(
      { ok: false, error: "No pudimos enviar tu mensaje. Intenta nuevamente o escríbenos por WhatsApp." },
      { status: 500 }
    );
  }
}
