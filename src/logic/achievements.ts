export type AchievementId = typeof ACHIEVEMENTS[number]["id"];

export const ACHIEVEMENTS = [
    {
        id: "first_character",
        title: "Let There Be Life",
        description: "Acquire your first character.",
    },
    {
        id: "pull_100",
        title: "Pull, Pull, Pull!",
        description: "Pull a total of 100 times.",
    },
    {
        id: "afk_cps_10",
        title: "AFK Strategy",
        description: "Have 10 or more CPS.",
    },
    {
        id: "lucky_day",
        title: "Lucky Day",
        description: "Pull 2 or more S-Rank characters in one 10-Pull.",
    },
    {
        id: "character_collector",
        title: "Character Collector",
        description: "Own a total of 20 characters or more",
    },
] as const;

