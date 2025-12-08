import { factionBonuses, type Faction, type FactionBonusDef } from "./factions";
import type {OwnedChar} from "../types/types.ts";

export function calculateTeamBonus(team: (OwnedChar | null)[]) {
    const equipped = team.filter(Boolean) as OwnedChar[];
    if (equipped.length < 2) return { bonusClick: 0, bonusCps: 0, activeFactions: [] };

    const factionCount: Record<string, number> = {};
    for (const e of equipped) {
        const f = e.char.faction ?? "unknown";
        factionCount[f] = (factionCount[f] ?? 0) + 1;
    }

    let bonusClick = 0;
    let bonusCps = 0;
    const activeFactions: string[] = [];

    for (const [faction, count] of Object.entries(factionCount)) {
        // narrow the key for TypeScript safety
        const key = faction as Faction;
        const bonusDef: FactionBonusDef | undefined = factionBonuses[key];

        if (!bonusDef) continue;

        if (count >= 3 && bonusDef.three) {
            bonusClick += bonusDef.three.click;
            bonusCps += bonusDef.three.cps;
            activeFactions.push(`${faction}-3`);
        } else if (count === 2 && bonusDef.two) {
            bonusClick += bonusDef.two.click;
            bonusCps += bonusDef.two.cps;
            activeFactions.push(`${faction}-2`);
        }
    }

    return { bonusClick, bonusCps, activeFactions };
}