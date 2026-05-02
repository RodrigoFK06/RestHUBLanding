"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useModals } from "./ModalProvider";
import type { ContactTopic } from "./ContactModal";

const PLAN_CATALOG: Record<
  string,
  { name: string; monthly: number; yearly: number; description?: string }
> = {
  esencial: {
    name: "RestHUB Esencial",
    monthly: 0,
    yearly: 0,
    description: "Para empezar a operar desde el día uno.",
  },
  pro: {
    name: "RestHUB Profesional",
    monthly: 149,
    yearly: 119,
    description: "Todo lo que un restaurante necesita. Sin compromisos.",
  },
  empresa: {
    name: "RestHUB Empresa",
    monthly: 0,
    yearly: 0,
    description: "Para grupos y cadenas con múltiples locales.",
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
      // Esencial / Empresa → contacto, no checkout
      if (plan === "esencial") {
        openContact({
          topic: "Solicitar acceso",
          prefillMessage: "Quiero comenzar con el plan Esencial (gratis).",
        });
      } else if (plan === "empresa") {
        openContact({
          topic: "Contactar ventas",
          prefillMessage: "Estoy interesado en el plan Empresa.",
        });
      } else {
        const monthlyAmount = catalog.monthly;
        const amount = billing === "yearly" ? catalog.yearly * 12 : monthlyAmount;
        openCheckout({
          id: plan,
          name: catalog.name,
          amount,
          currency: "USD",
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
