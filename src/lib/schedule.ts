import { QUOTES_BY_CATEGORY, type Category, type Quote } from "./quotes";

export type Slot = "manana" | "tarde" | "noche";

export const SLOTS: { id: Slot; hour: number; greeting: string; label: string; emoji: string; gradient: string }[] = [
  { id: "manana", hour: 7, greeting: "Buenos días", label: "Mañana", emoji: "🌅", gradient: "from-amber-500/25 via-orange-500/10 to-transparent border-amber-500/30" },
  { id: "tarde", hour: 14, greeting: "Buenas tardes", label: "Tarde", emoji: "☀️", gradient: "from-sky-500/25 via-cyan-500/10 to-transparent border-sky-500/30" },
  { id: "noche", hour: 20, greeting: "Buenas noches", label: "Noche", emoji: "🌙", gradient: "from-indigo-500/30 via-violet-500/10 to-transparent border-indigo-500/30" },
];

export function slotMeta(id: Slot) {
  return SLOTS.find((s) => s.id === id)!;
}

export function formatHour(hour: number): string {
  return `${String(hour).padStart(2, "0")}:00`;
}

// Cada día de un ciclo de 4 reparte 3 categorías distintas (mañana, tarde, noche);
// en el ciclo cada categoría sale exactamente 3 veces, así todas rotan por igual.
const PATTERNS: Category[][] = [
  ["biblia", "mafia", "estoico"],
  ["estoico", "cine", "biblia"],
  ["cine", "mafia", "estoico"],
  ["biblia", "cine", "mafia"],
];

const SLOT_INDEX: Record<Slot, number> = { manana: 0, tarde: 1, noche: 2 };

const mod = (n: number, m: number) => ((n % m) + m) % m;

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function coprimeStride(len: number): number {
  for (const s of [7, 11, 13, 17, 19, 23, 29, 31]) if (gcd(s, len) === 1) return s;
  return 1;
}

export function dateKey(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function dayNumber(key: string): number {
  const [y, m, d] = key.split("-").map(Number);
  return Math.floor((Date.UTC(y, m - 1, d) - Date.UTC(2026, 0, 1)) / 86_400_000);
}

// Determinista: la misma fecha y franja siempre dan la misma frase, y no se repite
// ninguna de una categoría hasta haberlas recorrido todas.
export function pickQuote(key: string, slot: Slot): Quote {
  const d = dayNumber(key);
  const cycleDay = mod(d, PATTERNS.length);
  const cat = PATTERNS[cycleDay][SLOT_INDEX[slot]];
  const perCycle = PATTERNS.flat().filter((c) => c === cat).length;
  let before = 0;
  for (let i = 0; i < cycleDay; i++) before += PATTERNS[i].filter((c) => c === cat).length;
  const count = Math.floor(d / PATTERNS.length) * perCycle + before;
  const list = QUOTES_BY_CATEGORY[cat];
  return list[mod(count * coprimeStride(list.length), list.length)];
}

// Antes de las 7:00 sigue vigente la frase de la noche anterior.
export function currentSlot(now: Date): { slot: Slot; date: string } {
  const h = now.getHours();
  if (h >= 20) return { slot: "noche", date: dateKey(now) };
  if (h >= 14) return { slot: "tarde", date: dateKey(now) };
  if (h >= 7) return { slot: "manana", date: dateKey(now) };
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  return { slot: "noche", date: dateKey(yesterday) };
}

export function nextSlotTime(now: Date): { at: Date; slot: Slot; date: string } {
  for (const s of SLOTS) {
    const at = new Date(now.getFullYear(), now.getMonth(), now.getDate(), s.hour, 0, 0, 0);
    if (at > now) return { at, slot: s.id, date: dateKey(at) };
  }
  const at = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, SLOTS[0].hour, 0, 0, 0);
  return { at, slot: "manana", date: dateKey(at) };
}
