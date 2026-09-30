"use client";

import { useState } from "react";
import { QuoteCard } from "@/components/QuoteCard";
import { ALL_QUOTES, CATEGORY_META, type Category } from "@/lib/quotes";
import { toggleFavorite } from "@/lib/mutations";
import { useAppData } from "@/lib/useAppData";

type Filter = "todas" | "favoritas" | Category;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "todas", label: "Todas" },
  { id: "favoritas", label: "❤️ Favoritas" },
  ...(Object.keys(CATEGORY_META) as Category[]).map((c) => ({
    id: c,
    label: `${CATEGORY_META[c].emoji} ${CATEGORY_META[c].label}`,
  })),
];

function normalize(s: string): string {
  return s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

export default function LibraryPage() {
  const { data, setData, hydrated } = useAppData();
  const [filter, setFilter] = useState<Filter>("todas");
  const [search, setSearch] = useState("");

  if (!hydrated) return null;

  const term = normalize(search.trim());
  const visible = ALL_QUOTES.filter((q) => {
    if (filter === "favoritas" && !data.favorites.includes(q.id)) return false;
    if (filter !== "todas" && filter !== "favoritas" && q.cat !== filter) return false;
    return term === "" || normalize(`${q.text} ${q.source}`).includes(term);
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Biblioteca</h1>
        <p className="text-sm text-slate-400">{ALL_QUOTES.length} frases para cuando las necesites.</p>
      </div>

      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar por palabra, autor o película…"
        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-slate-100 outline-none focus:border-amber-500"
      />

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              filter === f.id ? "bg-amber-500 text-slate-950" : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-10 text-center text-sm text-slate-500">
          {filter === "favoritas" && term === ""
            ? "Aún no guardaste ninguna. Toca 🤍 en una frase que te guste."
            : "Nada coincide con esa búsqueda."}
        </p>
      ) : (
        <div className="space-y-3">
          {visible.map((q) => (
            <div key={q.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <QuoteCard
                quote={q}
                favorite={data.favorites.includes(q.id)}
                onToggleFavorite={() => toggleFavorite(setData, q.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
