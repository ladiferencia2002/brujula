import type { AppData } from "./types";

const STORAGE_KEY = "brujula-data-v1";

export function emptyData(): AppData {
  return { name: "Hugo", favorites: [], notify: false };
}

export function loadData(): AppData {
  if (typeof window === "undefined") return emptyData();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyData();
    const parsed = JSON.parse(raw) as Partial<AppData>;
    const base = emptyData();
    return {
      name: typeof parsed.name === "string" ? parsed.name : base.name,
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites.filter((f) => typeof f === "string") : [],
      notify: parsed.notify === true,
    };
  } catch {
    return emptyData();
  }
}

export function saveData(data: AppData): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage unavailable (private mode, quota exceeded): state still works for this session.
  }
}
