export type Rarity = "S" | "A" | "B";

export type Character = {
    id: number;
    name: string;
    rarity: Exclude<Rarity, "B">; // B isn't a character rarity in pool objects
    baseClick: number; // base click contribution per level
    baseCps: number; // base cps contribution per level
    faction: string; // faction for team bonuses
};

export type OwnedChar = {
    char: Character;
    level: number; // duplicates increase level
};