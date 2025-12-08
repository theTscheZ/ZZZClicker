export type Faction =
    | "Cunning Hares"
    | "Obol Squad"
    | "Sons of Calydon"
    | "Hollow Special Operations Section 6"
    | "Spook Shack"
    | "Victoria Housekeeping Co."
    | "Belobog Heavy Industries"
    | "Criminal Investigation Special Response Team"
    | "Krampus Compliance Authority"
    | "Stars of Lyra"
    | "Mockingbird"
    | "Yunkui Summit"
    | "Krampus Compliance Authority"
    | "Yunkui Summit";

export type FactionBonusDef = {
    two?: { click: number; cps: number };
    three?: { click: number; cps: number };
};

export const factionBonuses: Record<Faction, FactionBonusDef> = {
    "Cunning Hares": {
        two: { click: 0.1, cps: 0.1 },  // +10%
        three: { click: 0.25, cps: 0.25 } // +25%
    },
    "Obol Squad": {
        two: { click: 0.08, cps: 0.1 },
        three: { click: 0.2, cps: 0.25 }
    },
    "Sons of Calydon": {
        two: { click: 0.12, cps: 0.05 },
        three: { click: 0.3, cps: 0.1 }
    },
    "Hollow Special Operations Section 6": {
        two: { click: 0.1, cps: 0.15 },
        three: { click: 0.25, cps: 0.3 }
    },
    "Spook Shack": {
        two:   { click: 0.10, cps: 0.10 },
        three: { click: 0.22, cps: 0.22 }
    },
    "Victoria Housekeeping Co.": {
        two:   { click: 0.09, cps: 0.12 },
        three: { click: 0.23, cps: 0.28 }
    },
    "Belobog Heavy Industries": {
        two:   { click: 0.11, cps: 0.08 },
        three: { click: 0.27, cps: 0.20 }
    },
    "Criminal Investigation Special Response Team": {
        two:   { click: 0.10, cps: 0.14 },
        three: { click: 0.26, cps: 0.30 }
    },
    "Krampus Compliance Authority": {
        two:   { click: 0.12, cps: 0.12 },
        three: { click: 0.28, cps: 0.30 }
    },
    "Yunkui Summit": {
        two:   { click: 0.11, cps: 0.10 },
        three: { click: 0.27, cps: 0.25 }
    },
    // --- Only 2 members ---
    "Stars of Lyra": {
        two: { click: 0.25, cps: 0.25 }
    },
    "Mockingbird": {
        two: { click: 0.22, cps: 0.28 }
    },
};
