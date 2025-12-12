import { CHARACTER_POOL, rollRarity, type PullResult } from "./logic/gacha.ts";
import type { Rarity } from "./types/types.ts";

export class StarterBanner {
    static tenPull(): { results: PullResult[] } {
        const results: PullResult[] = [];

        // guaranteed S-Rank (only one)
        const sPool = CHARACTER_POOL.filter((c) => c.rarity === "S");
        if (sPool.length === 0) {

            return { results: [] };
        }

        const guaranteedChar = sPool[Math.floor(Math.random() * sPool.length)];
        results.push({ type: "CHAR", char: guaranteedChar });

        // other pulls
        for (let i = 0; i < 9; i++) {
            let rarity: Rarity;


            do {
                rarity = rollRarity();
            } while (rarity === "S");

            if (rarity === "B") {
                results.push({ type: "B" });
            } else {
                const pool = CHARACTER_POOL.filter((c) => c.rarity === rarity);
                const char = pool[Math.floor(Math.random() * pool.length)];
                results.push({ type: "CHAR", char });
            }
        }

        // shuffle so the S-rank isn't always first
        for (let i = results.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [results[i], results[j]] = [results[j], results[i]];
        }

        return { results };
    }
}
