"use client";

import { useState, useEffect, useCallback } from "react";
import clsx from "clsx";

const CONSENT_KEY = "scuolario_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show banner only when consent has not been recorded
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, []);

  const accept = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  }, []);

  const reject = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={clsx(
        "fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface px-4 py-4 shadow-lg sm:px-6",
      )}
      role="dialog"
      aria-label="Consenso cookie"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-text-secondary leading-relaxed">
          Questo sito utilizza cookie tecnici per migliorare la tua esperienza.
          Consulta la nostra{" "}
          <a href="/privacy" className="underline text-primary hover:text-primary-dark transition-colors">
            informativa sulla privacy
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={reject}
            className="rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-text-secondary hover:bg-bg transition-colors"
          >
            Rifiuta
          </button>
          <button
            type="button"
            onClick={accept}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  );
}
