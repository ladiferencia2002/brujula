import type { SetAppData } from "./useAppData";

export function toggleFavorite(setData: SetAppData, id: string): void {
  setData((prev) => ({
    ...prev,
    favorites: prev.favorites.includes(id) ? prev.favorites.filter((f) => f !== id) : [...prev.favorites, id],
  }));
}

export function setName(setData: SetAppData, name: string): void {
  setData((prev) => ({ ...prev, name }));
}

export function setNotify(setData: SetAppData, notify: boolean): void {
  setData((prev) => ({ ...prev, notify }));
}
