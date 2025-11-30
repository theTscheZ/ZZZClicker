import type {Character, OwnedChar, Rarity} from "./types";

export const CHARACTER_POOL: Character[] = [
    {id: 1, name: "Ye Shunguang", rarity: "S", baseClick: 5, baseCps: 2.5},
    {id: 2, name: "Zhao", rarity: "S", baseClick: 4, baseCps: 2},
    {id: 3, name: "Banyue", rarity: "S", baseClick: 6, baseCps: 3},
    {id: 4, name: "Dialyn", rarity: "S", baseClick: 5, baseCps: 2.5},
    {id: 5, name: "Yidhari", rarity: "S", baseClick: 6, baseCps: 3.5},
    {id: 6, name: "Lucia", rarity: "S", baseClick: 5, baseCps: 2.5},
    {id: 7, name: "Manato", rarity: "A", baseClick: 2, baseCps: 1},
    {id: 8, name: "Orphie", rarity: "S", baseClick: 6, baseCps: 3.5},
    {id: 9, name: "Seed", rarity: "S", baseClick: 5, baseCps: 3},
    {id: 10, name: "Alice", rarity: "S", baseClick: 4, baseCps: 2},
    {id: 11, name: "Yuzuha", rarity: "S", baseClick: 5, baseCps: 3},
    {id: 12, name: "Ju Fufu", rarity: "S", baseClick: 6, baseCps: 3.5},
    {id: 13, name: "Yixuan", rarity: "S", baseClick: 5, baseCps: 2.5},
    {id: 14, name: "Pan Yinhu", rarity: "A", baseClick: 2, baseCps: 1.2},
    {id: 15, name: "Hugo", rarity: "S", baseClick: 4, baseCps: 2},
    {id: 16, name: "Vivian", rarity: "S", baseClick: 6, baseCps: 3.5},
    {id: 17, name: "Trigger", rarity: "S", baseClick: 5, baseCps: 3},
    {id: 18, name: "Soldier 0 Anby", rarity: "A", baseClick: 2, baseCps: 1.1},
    {id: 19, name: "Pulchra", rarity: "A", baseClick: 3, baseCps: 1.3},
    {id: 20, name: "Evelyn", rarity: "S", baseClick: 6, baseCps: 4},
    {id: 21, name: "Astra", rarity: "S", baseClick: 6, baseCps: 3.5},
    {id: 22, name: "Harumasa", rarity: "S", baseClick: 5, baseCps: 3},
    {id: 23, name: "Miyabi", rarity: "S", baseClick: 4, baseCps: 2.5},
    {id: 24, name: "Lighter", rarity: "S", baseClick: 6, baseCps: 3.5},
    {id: 25, name: "Yanagi", rarity: "S", baseClick: 5, baseCps: 2.5},
    {id: 26, name: "Burnice", rarity: "S", baseClick: 4, baseCps: 2},
    {id: 27, name: "Caesar", rarity: "S", baseClick: 6, baseCps: 3.5},
    {id: 28, name: "Jane", rarity: "S", baseClick: 5, baseCps: 3},
    {id: 29, name: "Seth", rarity: "A", baseClick: 2, baseCps: 1.2},
    {id: 30, name: "Qingyi", rarity: "S", baseClick: 5, baseCps: 3},
    {id: 31, name: "Zhu Yuan", rarity: "S", baseClick: 4, baseCps: 2.5},
    {id: 32, name: "Ellen", rarity: "S", baseClick: 5, baseCps: 3},
    {id: 33, name: "Grace", rarity: "S", baseClick: 6, baseCps: 3.5},
    {id: 34, name: "Soldier 11", rarity: "A", baseClick: 3, baseCps: 1.4},
    {id: 35, name: "Nekomata", rarity: "S", baseClick: 5, baseCps: 3},
    {id: 36, name: "Lycaon", rarity: "S", baseClick: 6, baseCps: 4},
    {id: 37, name: "Koleda", rarity: "A", baseClick: 2, baseCps: 1.2},
    {id: 38, name: "Rina", rarity: "A", baseClick: 3, baseCps: 1.3},
    {id: 39, name: "Piper", rarity: "A", baseClick: 2, baseCps: 1},
    {id: 40, name: "Lucy", rarity: "A", baseClick: 3, baseCps: 1.2},
    {id: 41, name: "Corin", rarity: "A", baseClick: 3, baseCps: 1.5},
    {id: 42, name: "Anton", rarity: "A", baseClick: 2, baseCps: 1.1},
    {id: 43, name: "Ben", rarity: "A", baseClick: 2, baseCps: 1},
    {id: 44, name: "Soukaku", rarity: "A", baseClick: 2, baseCps: 1.3},
    {id: 45, name: "Nicole", rarity: "A", baseClick: 2, baseCps: 1.2},
    {id: 46, name: "Anby", rarity: "A", baseClick: 2, baseCps: 1}
];

// probabilities per single pull
// S = 1%, A = 5%, B = 94%
export function rollRarity(): Rarity {
    const r = Math.random();
    if (r < 0.01) return "S";
    if (r < 0.06) return "A";
    return "B";
}

export type PullResult =
    | { type: "B" }
    | { type: "CHAR"; char: Character };

export function rollOne(): PullResult {
    const rarity = rollRarity();
    if (rarity === "B") return {type: "B"};

    const pool = CHARACTER_POOL.filter((c) => c.rarity === rarity);
    const char = pool[Math.floor(Math.random() * pool.length)];
    return {type: "CHAR", char};
}

export function tenPull(): { results: PullResult[]; guaranteedAIndex?: number } {
    const results: PullResult[] = [];
    let gotA = false;

    for (let i = 0; i < 10; i++) {
        const r = rollOne();
        if (r.type === "CHAR" && r.char.rarity === "A") gotA = true;
        results.push(r);
    }

    let guaranteedAIndex: number | undefined = undefined;
    if (!gotA) {
        // force a random A into the last slot
        const aPool = CHARACTER_POOL.filter((c) => c.rarity === "A");
        const forced = aPool[Math.floor(Math.random() * aPool.length)];
        results[9] = {type: "CHAR", char: forced};
        guaranteedAIndex = 9;
    }

    return {results, guaranteedAIndex};
}

// helper: apply pull results to a OwnedChar list (adds dupes as levels)
export function applyPullsToOwned(
    owned: OwnedChar[],
    pulls: PullResult[],
    refundOnB = 20
): { owned: OwnedChar[]; polyGainedFromB: number } {
    let polyGained = 0;
    const updated = [...owned];

    for (const p of pulls) {
        if (p.type === "B") {
            polyGained += refundOnB; // refund value for B
            continue;
        }

        const idx = updated.findIndex((o) => o.char.id === p.char.id);
        if (idx >= 0) {
            updated[idx] = {...updated[idx], level: updated[idx].level + 1};
        } else {
            updated.push({char: p.char, level: 1});
        }
    }

    return {owned: updated, polyGainedFromB: polyGained};
}