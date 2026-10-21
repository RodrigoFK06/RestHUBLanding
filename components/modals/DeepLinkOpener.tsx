"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useModals } from "./ModalProvider";
import type { ContactTopic } from "./ContactModal";

const PLAN_CATALOG: Record<
  string,
  { name: string; monthly: number; yearly: number; description?: string }
> = {
  // Los enlaces viejos (?plan=starter|esencial|pro|empresa) siguen abriendo algo, pero con la única
  // oferta vigente: precio fundador de S/ 100 al mes por local.
  starter: {
    name: "RestHUB · Precio fundador",
    monthly: 100,
    yearly: 100,
    description: "Todo incluido: todos los módulos y todos los usuarios.",
  },
  esencial: {
    name: "RestHUB · Precio fundador",
    monthly: 100,
    yearly: 100,
    description: "Todo incluido: todos los módulos y todos los usuarios.",
  },
  pro: {
    name: "RestHUB · Precio fundador",
    monthly: 100,
    yearly: 100,
    description: "Todo incluido: todos los módulos y todos los usuarios.",
  },
  empresa: {
    name: "RestHUB · Precio fundador",
    monthly: 100,
    yearly: 100,
    description: "Todo incluido: todos los módulos y todos los usuarios.",
  },
};

const TOPIC_MAP: Record<string, ContactTopic> = {
  demo: "Agendar demo",
  acceso: "Solicitar acceso",
  ventas: "Contactar ventas",
  general: "Contacto general",
};

export default function DeepLinkOpener() {
  const params = useSearchParams();
  const { openContact, openCheckout } = useModals();

  useEffect(() => {
    const plan = params.get("plan");
    const billing = params.get("billing") === "yearly" ? "yearly" : "monthly";
    const contact = params.get("contact");

    if (plan && PLAN_CATALOG[plan]) {
      const catalog = PLAN_CATALOG[plan];
      // Starter → contacto directo; Empresa → ventas; Pro → checkout en soles
      if (plan === "esencial" || plan === "starter") {
        openContact({
          topic: "Solicitar acceso",
          prefillMessage: "Quiero empezar con RestHUB a precio fundador (S/ 100 al mes).",
        });
      } else if (plan === "empresa") {
        openContact({
          topic: "Contactar ventas",
          prefillMessage: "Tengo varios locales y me interesa RestHUB.",
        });
      } else {
        const monthlyAmount = catalog.monthly;
        const amount = billing === "yearly" ? catalog.yearly * 12 : monthlyAmount;
        openCheckout({
          id: plan,
          name: catalog.name,
          amount,
          currency: "PEN",
          billing,
          description: catalog.description,
        });
      }
      return;
    }

    if (contact && TOPIC_MAP[contact]) {
      openContact({ topic: TOPIC_MAP[contact] });
    }
    // Solo correr una vez al montar — los searchParams no cambian sin nav.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
