/**
 * Envía una notificación a un webhook (Slack o Discord) si NOTIFY_WEBHOOK_URL
 * está configurado. Detecta el formato según la URL. Falla silencioso para
 * no romper el flujo de email principal.
 */

type NotifyPayload = {
  title: string;
  body: string;
  fields?: { name: string; value: string }[];
  color?: "success" | "info" | "alert";
};

const COLOR_HEX: Record<NonNullable<NotifyPayload["color"]>, number> = {
  success: 0x14b8a6,
  info: 0xf59e0b,
  alert: 0xef4444,
};

function isDiscord(url: string) {
  return /discord(app)?\.com\/api\/webhooks/i.test(url);
}
function isSlack(url: string) {
  return /hooks\.slack\.com\/services/i.test(url);
}

export async function notify(p: NotifyPayload): Promise<void> {
  const url = process.env.NOTIFY_WEBHOOK_URL;
  if (!url) return;

  try {
    let body: string;
    if (isDiscord(url)) {
      body = JSON.stringify({
        embeds: [
          {
            title: p.title,
            description: p.body,
            color: COLOR_HEX[p.color ?? "info"],
            fields: (p.fields ?? []).map((f) => ({
              name: f.name,
              value: f.value || "—",
              inline: true,
            })),
            timestamp: new Date().toISOString(),
          },
        ],
      });
    } else if (isSlack(url)) {
      const fieldText = (p.fields ?? [])
        .map((f) => `*${f.name}:* ${f.value || "—"}`)
        .join("\n");
      body = JSON.stringify({
        text: `*${p.title}*\n${p.body}${fieldText ? "\n\n" + fieldText : ""}`,
      });
    } else {
      // Genérico
      body = JSON.stringify(p);
    }

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      // Evita bloquear demasiado: 4 s
      signal: AbortSignal.timeout(4000),
    });
  } catch (err) {
    console.warn("[notify] webhook failed:", err);
  }
}
