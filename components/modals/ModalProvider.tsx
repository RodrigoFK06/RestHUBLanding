"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import ContactModal, { ContactTopic } from "./ContactModal";
import CheckoutModal, { CheckoutPlan } from "./CheckoutModal";

type ContactOptions = {
  topic?: ContactTopic;
  prefillMessage?: string;
};

type ModalContextValue = {
  openContact: (opts?: ContactOptions) => void;
  openCheckout: (plan: CheckoutPlan) => void;
  closeAll: () => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModals() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModals debe usarse dentro de <ModalProvider>");
  return ctx;
}

export default function ModalProvider({ children }: { children: React.ReactNode }) {
  const [contactOpen, setContactOpen] = useState(false);
  const [contactOpts, setContactOpts] = useState<ContactOptions>({});
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<CheckoutPlan | null>(null);

  const openContact = useCallback((opts?: ContactOptions) => {
    setContactOpts(opts ?? {});
    setContactOpen(true);
  }, []);

  const openCheckout = useCallback((plan: CheckoutPlan) => {
    setCheckoutPlan(plan);
    setCheckoutOpen(true);
  }, []);

  const closeAll = useCallback(() => {
    setContactOpen(false);
    setCheckoutOpen(false);
  }, []);

  const value = useMemo<ModalContextValue>(
    () => ({ openContact, openCheckout, closeAll }),
    [openContact, openCheckout, closeAll]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        topic={contactOpts.topic}
        prefillMessage={contactOpts.prefillMessage}
      />
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        plan={checkoutPlan}
      />
    </ModalContext.Provider>
  );
}
