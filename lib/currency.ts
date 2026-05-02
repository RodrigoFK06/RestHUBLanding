export type Currency = "USD" | "PEN";

// Tasa fija aproximada — actualizable desde env si fuese necesario
export const USD_TO_PEN = Number(process.env.NEXT_PUBLIC_USD_TO_PEN ?? 3.7);

export const CURRENCY_SYMBOL: Record<Currency, string> = {
  USD: "$",
  PEN: "S/ ",
};

export function convertFromUSD(amountUSD: number, target: Currency): number {
  if (target === "PEN") return Math.round(amountUSD * USD_TO_PEN);
  return amountUSD;
}

export function formatCurrency(amount: number, currency: Currency): string {
  const sym = CURRENCY_SYMBOL[currency];
  return `${sym}${amount.toFixed(currency === "USD" ? 0 : 0)}`;
}

const STORAGE_KEY = "resthub.currency";

export function readStoredCurrency(): Currency | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "USD" || v === "PEN" ? v : null;
}

export function persistCurrency(c: Currency) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, c);
}
