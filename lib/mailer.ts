import nodemailer from "nodemailer";

let cached: nodemailer.Transporter | null = null;

export function getTransporter() {
  if (cached) return cached;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const secure = String(process.env.SMTP_SECURE ?? "false") === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP no configurado. Define SMTP_HOST, SMTP_USER y SMTP_PASS en .env.local.");
  }

  cached = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  return cached;
}

export const mailFrom = () =>
  process.env.SMTP_FROM ?? process.env.SMTP_USER ?? "no-reply@resthub.app";

export const contactInbox = () =>
  process.env.CONTACT_EMAIL ?? process.env.SMTP_USER ?? "hola@resthub.app";
