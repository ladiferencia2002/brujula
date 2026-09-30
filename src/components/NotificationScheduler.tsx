"use client";

import { useEffect } from "react";
import { useAppData } from "@/lib/useAppData";
import { nextSlotTime, pickQuote, slotMeta } from "@/lib/schedule";

// Avisa a las 7:00, 14:00 y 20:00 mientras la app esté abierta o en segundo plano
// y el navegador la mantenga viva. Sin servidor no hay notificaciones push reales.
export function NotificationScheduler() {
  const { data, hydrated } = useAppData();
  const { notify, name } = data;

  useEffect(() => {
    if (!hydrated || !notify) return;
    if (typeof Notification === "undefined" || Notification.permission !== "granted") return;

    let timer = 0;
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

    const arm = () => {
      const next = nextSlotTime(new Date());
      timer = window.setTimeout(async () => {
        const quote = pickQuote(next.date, next.slot);
        const title = `${slotMeta(next.slot).greeting}, ${name.trim() || "Hugo"}`;
        const options = {
          body: `«${quote.text}» — ${quote.source}`,
          icon: `${base}/icon-192.png`,
          tag: `brujula-${next.date}-${next.slot}`,
        };
        try {
          const reg = await navigator.serviceWorker?.getRegistration();
          if (reg) await reg.showNotification(title, options);
          else new Notification(title, options);
        } catch {
          // notification blocked: the quote is still waiting inside the app
        }
        arm();
      }, Math.max(1000, next.at.getTime() - Date.now()));
    };

    arm();
    return () => window.clearTimeout(timer);
  }, [hydrated, notify, name]);

  return null;
}
