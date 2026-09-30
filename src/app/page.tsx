"use client";

import { useState } from "react";
import { QuoteCard } from "@/components/QuoteCard";
import { ALL_QUOTES, CATEGORY_META, type Quote } from "@/lib/quotes";
import { SLOTS, currentSlot, dateKey, formatHour, pickQuote, slotMeta } from "@/lib/schedule";
import { toggleFavorite } from "@/lib/mutations";
import { useAppData } from "@/lib/useAppData";
import { useNow } from "@/lib/useNow";

export default function TodayPage() {
  const { data, setData, hydrated } = useAppData();
  const now = useNow();
  const [extra, setExtra] = useState<Quote | null>(null);

  if (!hydrated || !now) return null;

  const name = data.name.trim() || "Hugo";
  const current = currentSlot(now);
  const meta = slotMeta(current.slot);
  const quote = pickQuote(current.date, current.slot);
  const today = dateKey(now);
  const hour = now.getHours();

  function anotherQuote() {
    const pool = ALL_QUOTES.filter((q) => q.id !== quote.id && q.id !== extra?.id);
    setExtra(pool[Math.floor(Math.random() * pool.length)]);
  }

  return (
    <div className="space-y-6">
      <section className={`rounded-3xl border bg-gradient-to-b p-6 sm:p-8 ${meta.gradient}`}>
        <p className="mb-6 text-sm font-medium text-slate-300">
          {meta.emoji} {meta.greeting}, <span className="text-white">{name}</span>
        </p>
        <QuoteCard
          quote={quote}
          large
          favorite={data.favorites.includes(quote.id)}
          onToggleFavorite={() => toggleFavorite(setData, quote.id)}
        />
      </section>

      <div>
        <button
          type="button"
          onClick={anotherQuote}
          className="w-full rounded-2xl bg-amber-500 px-4 py-3 font-semibold text-slate-950 transition-colors hover:bg-amber-400"
        >
          ✨ Otra frase
        </button>
      </div>

      {extra && (
        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <QuoteCard
            quote={extra}
            favorite={data.favorites.includes(extra.id)}
            onToggleFavorite={() => toggleFavorite(setData, extra.id)}
          />
        </section>
      )}

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-400">Tu día</h2>
        {SLOTS.map((slot) => {
          const isCurrent = current.date === today && current.slot === slot.id;
          const isUpcoming = !isCurrent && hour < slot.hour;
          const q = pickQuote(today, slot.id);
          return (
            <div
              key={slot.id}
              className={`rounded-2xl border p-4 ${
                isCurrent ? "border-amber-500/40 bg-amber-500/5" : "border-slate-800 bg-slate-900/40"
              }`}
            >
              <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
                <span>
                  {slot.emoji} {slot.label} · {formatHour(slot.hour)}
                </span>
                {isCurrent && <span className="font-medium text-amber-400">Ahora</span>}
              </div>
              {isUpcoming ? (
                <p className="text-sm text-slate-500">Tu frase llega a las {formatHour(slot.hour)}.</p>
              ) : (
                <>
                  <p className="font-serif text-slate-200">«{q.text}»</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {CATEGORY_META[q.cat].emoji} {q.source}
                  </p>
                </>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
