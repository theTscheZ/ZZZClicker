export type AchievementId = "first_character";

export interface Achievement {
    id: AchievementId;
    title: string;
    description: string;
}

export const ACHIEVEMENTS: Achievement[] = [
    {
        id: "first_character",
        title: "Let There Be Life",
        description: "Acquire your first character.",
    },
];
