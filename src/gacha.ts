import type {Character, OwnedChar, Rarity} from "./types";

export const CHARACTER_POOL: Character[] = [
    {id: 1, name: "Ye Shunguang", rarity: "S", baseClick: 5, baseCps: 2.5, faction: "Yunkui Summit"},
    {id: 2, name: "Zhao", rarity: "S", baseClick: 4, baseCps: 2, faction: "Krampus Compliance Authority"},
    {id: 3, name: "Banyue", rarity: "S", baseClick: 6, baseCps: 3, faction: "Krampus Compliance Authority"},
    {id: 4, name: "Dialyn", rarity: "S", baseClick: 5, baseCps: 2.5, faction: "Krampus Compliance Authority"},
    {id: 5, name: "Yidhari", rarity: "S", baseClick: 6, baseCps: 3.5, faction: "Spook Shack"},
    {id: 6, name: "Lucia", rarity: "S", baseClick: 5, baseCps: 2.5, faction: "Spook Shack"},
    {id: 7, name: "Manato", rarity: "A", baseClick: 2, baseCps: 1, faction: "Spook Shack"},
    {id: 8, name: "Orphie", rarity: "S", baseClick: 6, baseCps: 3.5, faction: "Obol Squad"},
    {id: 9, name: "Seed", rarity: "S", baseClick: 5, baseCps: 3, faction: "Obol Squad"},
    {id: 10, name: "Alice", rarity: "S", baseClick: 4, baseCps: 2, faction: "Spook Shack"},
    {id: 11, name: "Yuzuha", rarity: "S", baseClick: 5, baseCps: 3, faction: "Spook Shack"},
    {id: 12, name: "Ju Fufu", rarity: "S", baseClick: 6, baseCps: 3.5, faction: "Yunkui Summit"},
    {id: 13, name: "Yixuan", rarity: "S", baseClick: 5, baseCps: 2.5, faction: "Yunkui Summit"},
    {id: 14, name: "Pan Yinhu", rarity: "A", baseClick: 2, baseCps: 1.2, faction: "Yunkui Summit"},
    {id: 15, name: "Hugo", rarity: "S", baseClick: 4, baseCps: 2, faction: "Mockingbird"},
    {id: 16, name: "Vivian", rarity: "S", baseClick: 6, baseCps: 3.5, faction: "Mockingbird"},
    {id: 17, name: "Trigger", rarity: "S", baseClick: 5, baseCps: 3, faction: "Obol Squad"},
    {id: 18, name: "Soldier 0 Anby", rarity: "S", baseClick: 7, baseCps: 2.8, faction: "Cunning Hares"},
    {id: 19, name: "Pulchra", rarity: "A", baseClick: 3, baseCps: 1.3, faction: "Sons of Calydon"},
    {id: 20, name: "Evelyn", rarity: "S", baseClick: 6, baseCps: 4, faction: "Stars of Lyra"},
    {id: 21, name: "Astra", rarity: "S", baseClick: 6, baseCps: 3.5, faction: "Stars of Lyra"},
    {id: 22, name: "Harumasa", rarity: "S", baseClick: 5, baseCps: 3, faction: "Hollow Special Operations Section 6"},
    {id: 23, name: "Miyabi", rarity: "S", baseClick: 4, baseCps: 2.5, faction: "Hollow Special Operations Section 6"},
    {id: 24, name: "Lighter", rarity: "S", baseClick: 6, baseCps: 3.5, faction: "Sons of Calydon"},
    {id: 25, name: "Yanagi", rarity: "S", baseClick: 5, baseCps: 2.5, faction: "Hollow Special Operations Section 6"},
    {id: 26, name: "Burnice", rarity: "S", baseClick: 4, baseCps: 2, faction: "Sons of Calydon"},
    {id: 27, name: "Caesar", rarity: "S", baseClick: 6, baseCps: 3.5, faction: "Sons of Calydon"},
    {id: 28, name: "Jane", rarity: "S", baseClick: 5, baseCps: 3, faction: "Criminal Investigation Special Response Team"},
    {id: 29, name: "Seth", rarity: "A", baseClick: 2, baseCps: 1.2, faction: "Criminal Investigation Special Response Team"},
    {id: 30, name: "Qingyi", rarity: "S", baseClick: 5, baseCps: 3, faction: "Criminal Investigation Special Response Team"},
    {id: 31, name: "Zhu Yuan", rarity: "S", baseClick: 4, baseCps: 2.5, faction: "Criminal Investigation Special Response Team"},
    {id: 32, name: "Ellen", rarity: "S", baseClick: 5, baseCps: 3, faction: "Victoria Housekeeping Co."},
    {id: 33, name: "Grace", rarity: "S", baseClick: 6, baseCps: 3.5, faction: "Belobog Heavy Industries"},
    {id: 34, name: "Soldier 11", rarity: "S", baseClick: 11, baseCps: 0.5, faction: "Obol Squad"},
    {id: 35, name: "Nekomata", rarity: "S", baseClick: 5, baseCps: 3, faction: "Cunning Hares"},
    {id: 36, name: "Lycaon", rarity: "S", baseClick: 6, baseCps: 4, faction: "Victoria Housekeeping Co."},
    {id: 37, name: "Koleda", rarity: "S", baseClick: 2, baseCps: 7, faction: "Belobog Heavy Industries"},
    {id: 38, name: "Rina", rarity: "S", baseClick: 3, baseCps: 1.3, faction: "Victoria Housekeeping Co."},
    {id: 39, name: "Piper", rarity: "A", baseClick: 2, baseCps: 1, faction: "Sons of Calydon"},
    {id: 40, name: "Lucy", rarity: "A", baseClick: 3, baseCps: 1.2, faction: "Sons of Calydon"},
    {id: 41, name: "Corin", rarity: "A", baseClick: 3, baseCps: 1.5, faction: "Victoria Housekeeping Co."},
    {id: 42, name: "Anton", rarity: "A", baseClick: 2, baseCps: 1.1, faction: "Belobog Heavy Industries"},
    {id: 43, name: "Ben", rarity: "A", baseClick: 2, baseCps: 1, faction: "Belobog Heavy Industries"},
    {id: 44, name: "Soukaku", rarity: "A", baseClick: 2, baseCps: 1.3, faction: "Hollow Special Operations Section 6"},
    {id: 45, name: "Nicole", rarity: "A", baseClick: 2, baseCps: 1.2, faction: "Cunning Hares"},
    {id: 46, name: "Anby", rarity: "A", baseClick: 2, baseCps: 1, faction: "Cunning Hares"},
    {id: 47, name: "Billy", rarity: "A", baseClick: 1, baseCps: 1.6, faction: "Cunning Hares"},
];

// Pity-Counter global
let singlePullCount = 0;
let totalPulls = 0;

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
    totalPulls++;
    singlePullCount++;

    let rarity: Rarity = rollRarity();

    // Garantierter S-Rank bei Pull 90
    if (totalPulls >= 90) {
        rarity = "S";
        singlePullCount = 0;
        totalPulls = 0;
    } else if (singlePullCount >= 10 && rarity === "B") {
        // Garantierter A-Rank nach 9 B-Pulls
        const isS = Math.random() < 0.05; // 5% Chance auf S
        rarity = isS ? "S" : "A";
        singlePullCount = 0;
    }

    if (rarity === "B") return {type: "B"};

    const pool = CHARACTER_POOL.filter((c) => c.rarity === rarity);
    const char = pool[Math.floor(Math.random() * pool.length)];
    if (rarity === "A" || rarity === "S") singlePullCount = 0; // reset pity counter
    return { type: "CHAR", char };
}

export function tenPull(): { results: PullResult[] } {
    const results: PullResult[] = [];
    for (let i = 0; i < 10; i++) {
        results.push(rollOne());
    }
    return { results };
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