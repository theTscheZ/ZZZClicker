import { CHARACTER_POOL, rollRarity, type PullResult } from "./gacha";
import type { Rarity } from "./types";

export class StarterBanner {
    /**
     * 10-pull that guarantees one random S-rank character.
     * Other 9 pulls are A/B only (no extra S).
     */
    static tenPull(): { results: PullResult[] } {
        const results: PullResult[] = [];

        // guaranteed S-Rank (only one)
        const sPool = CHARACTER_POOL.filter((c) => c.rarity === "S");
        if (sPool.length === 0) {
            // Fallback: no S chars defined; return empty for now
            return { results: [] };
        }

        const guaranteedChar = sPool[Math.floor(Math.random() * sPool.length)];
        results.push({ type: "CHAR", char: guaranteedChar });

        // other pulls
        for (let i = 0; i < 9; i++) {
            let rarity: Rarity;

            // use same rarity RNG, but reject S-Ranks
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

        // 3) shuffle so the S-rank isn't always first
        for (let i = results.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [results[i], results[j]] = [results[j], results[i]];
        }

        return { results };
    }
}
