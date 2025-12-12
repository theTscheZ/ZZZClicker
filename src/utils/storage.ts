import type { OwnedChar } from "../types/types.ts";

export type SaveData = {
    poly: number;
    owned: OwnedChar[];
    team: (OwnedChar | null)[];
};

const STORAGE_KEY = "zzzSave";

export function saveState(state: SaveData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadState(): SaveData | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        console.error("Save corrupted");
        return null;
    }
}
