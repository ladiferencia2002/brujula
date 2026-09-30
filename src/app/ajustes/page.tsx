"use client";

import { useState } from "react";
import { SLOTS, formatHour } from "@/lib/schedule";
import { setName, setNotify } from "@/lib/mutations";
import { useAppData } from "@/lib/useAppData";

export default function SettingsPage() {
  const { data, setData, hydrated } = useAppData();
  const supported = typeof Notification !== "undefined";
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">(
    supported ? Notification.permission : "unsupported"
  );

  if (!hydrated) return null;

  async function toggleNotifications() {
    if (data.notify) {
      setNotify(setData, false);
      return;
    }
    if (!supported) return;
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result === "granted") setNotify(setData, true);
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Ajustes</h1>
        <p className="text-sm text-slate-400">Personaliza tu Brújula.</p>
      </div>

      <section className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
        <label htmlFor="name" className="text-sm font-semibold text-white">
          Tu nombre
        </label>
        <input
          id="name"
          type="text"
          value={data.name}
          onChange={(e) => setName(setData, e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-slate-100 outline-none focus:border-amber-500"
        />
        <p className="text-xs text-slate-500">Así te saludan: «Buenos días, {data.name.trim() || "Hugo"}».</p>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
        <h2 className="text-sm font-semibold text-white">Avisos</h2>
        <p className="text-sm text-slate-400">
          Tu frase cambia sola a las {SLOTS.map((s) => formatHour(s.hour)).join(", ")}. Dentro de la app siempre la
          verás al abrirla.
        </p>
        <button
          type="button"
          onClick={toggleNotifications}
          disabled={permission === "denied" || permission === "unsupported"}
          className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50 ${
            data.notify ? "bg-slate-800 text-white hover:bg-slate-700" : "bg-amber-500 text-slate-950 hover:bg-amber-400"
          }`}
        >
          {data.notify ? "Desactivar avisos" : "Activar avisos"}
        </button>
        {permission === "denied" && (
          <p className="text-xs text-red-300">
            Las notificaciones están bloqueadas para este sitio. Actívalas en los ajustes del navegador.
          </p>
        )}
        {permission === "unsupported" && (
          <p className="text-xs text-slate-500">Este navegador no admite notificaciones.</p>
        )}
        <p className="text-xs text-slate-500">
          Al ser una app sin servidor, el aviso solo llega si la app sigue abierta o en segundo plano; el móvil puede
          cerrarla para ahorrar batería.
        </p>
      </section>

      <section className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
        <h2 className="text-sm font-semibold text-white">Instalar en el móvil</h2>
        <p className="text-sm text-slate-400">
          Android (Chrome): menú ⋮ → «Instalar app». iPhone (Safari): compartir → «Añadir a pantalla de inicio».
        </p>
      </section>
    </div>
  );
}
