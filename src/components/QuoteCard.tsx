"use client";

import { useState } from "react";
import { CATEGORY_META, type Quote } from "@/lib/quotes";

export function QuoteCard({
  quote,
  favorite,
  onToggleFavorite,
  large = false,
}: {
  quote: Quote;
  favorite: boolean;
  onToggleFavorite: () => void;
  large?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const meta = CATEGORY_META[quote.cat];

  async function share() {
    const text = `«${quote.text}» — ${quote.source}`;
    try {
      if (navigator.share) {
        await navigator.share({ text });
        return;
      }
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // share sheet dismissed or clipboard blocked: nothing to do
    }
  }

  return (
    <figure className="space-y-4">
      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${meta.badge}`}>
        <span>{meta.emoji}</span> {meta.label}
      </span>
      <blockquote
        className={`font-serif leading-relaxed text-white ${large ? "text-2xl sm:text-3xl" : "text-lg"}`}
      >
        «{quote.text}»
      </blockquote>
      <figcaption className="text-sm text-slate-400">— {quote.source}</figcaption>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleFavorite}
          aria-pressed={favorite}
          className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
            favorite
              ? "border-rose-500/40 bg-rose-500/10 text-rose-300"
              : "border-slate-700 text-slate-300 hover:border-slate-500"
          }`}
        >
          {favorite ? "❤️ Guardada" : "🤍 Guardar"}
        </button>
        <button
          type="button"
          onClick={share}
          className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300 transition-colors hover:border-slate-500"
        >
          {copied ? "¡Copiada!" : "📤 Compartir"}
        </button>
      </div>
    </figure>
  );
}
