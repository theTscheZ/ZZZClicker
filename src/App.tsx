import {type JSX, useEffect, useState} from "react";
import {
    tenPull,
    rollOne,
    applyPullsToOwned,
    type PullResult,
} from "./logic/gacha.ts";
import type {OwnedChar} from "./types/types.ts";
import CharacterCard from "./components/CharacterCard/CharacterCard.tsx";
import PullResults from "./components/PullResults/PullResults.tsx";
import "./styles/app.css";
import { StarterBanner } from "./starterBanner.ts"
import CollectionModal from "./components/CollectionModal";
import { ACHIEVEMENTS, type AchievementId } from "./achievements";
import AchievementsModal from "./components/AchievementsModal";

const ONE_PULL_COST = 160; // 1x 160
const TEN_PULL_COST = ONE_PULL_COST*10; // 10x 160
const STARTER_PULL_COST = 20;

export default function App(): JSX.Element {
    const [poly, setPoly] = useState<number>(0);
    const [owned, setOwned] = useState<OwnedChar[]>([]);
    const [team, setTeam] = useState<(OwnedChar | null)[]>([null, null, null]);

    const [pulling, setPulling] = useState(false);
    const [lastResults, setLastResults] = useState<PullResult[]>([]);
    const [starterUsed, setStarterUsed] = useState<boolean>(false);

    const [menuOpen, setMenuOpen] = useState(false);
    const [showCollection, setShowCollection] = useState(false);

    const [showAchievements, setShowAchievements] = useState(false);
    const [unlockedAchievements, setUnlockedAchievements] = useState<
        AchievementId[]
    >([]);

    const [totalPulls, setTotalPulls] = useState<number>(0);

    const toggleMenu = () => setMenuOpen((m) => !m);

    const openCollection = () => {
        setShowCollection(true);
        setMenuOpen(false);
    };

    const closeCollection = () => {
        setShowCollection(false);
    };

    const openAchievements = () => {
        setShowAchievements(true);
        setShowCollection(false);
        setMenuOpen(false);
    };

    const closeAchievements = () => {
        setShowAchievements(false);
    };

    // calculate click value and cps
    const clickValue =
        1 +
        team.reduce((acc, t) => acc + (t ? t.char.baseClick * t.level : 0), 0);

    const cps = team.reduce((acc, t) => acc + (t ? t.char.baseCps * t.level : 0), 0);

    useEffect(() => {
        if (cps <= 0) return;
        const i = setInterval(() => setPoly((p) => p + cps), 1000);
        return () => clearInterval(i);
    }, [cps]);

    useEffect(() => {
        if (cps < 10) return;
        if (unlockedAchievements.includes("afk_cps_10")) return;

        const t = setTimeout(() => {
            setUnlockedAchievements((prev) => {
                if (prev.includes("afk_cps_10")) return prev;
                return [...prev, "afk_cps_10"];
            });
        }, 0);

        return () => clearTimeout(t);
    }, [cps, unlockedAchievements]);

    function handleClick() {
        setPoly((p) => p + clickValue);
    }

    async function handleOnePull() {
        if (poly < ONE_PULL_COST || pulling) return;

        setPoly((p) => p - ONE_PULL_COST);
        setPulling(true);
        setLastResults([]);

        await new Promise((res) => setTimeout(res, 700));

        const result = rollOne();
        const prevOwnedCount = owned.length;
        const { owned: newOwned, polyGainedFromB } = applyPullsToOwned(owned, [result]);

        setOwned(newOwned);
        setPoly((p) => p + polyGainedFromB);
        setLastResults([result]);
        setPulling(false);

        setTotalPulls((p) => p + 1);
        updateAchievements(prevOwnedCount, newOwned.length, totalPulls + 1);
    }

    async function handleTenPull() {
        if (poly < TEN_PULL_COST || pulling) return;
        setPoly((p) => p - TEN_PULL_COST);
        setPulling(true);
        setLastResults([]);

        await new Promise((res) => setTimeout(res, 700));

        const { results } = tenPull();

        const sCount = results.filter(
            (r) => r.type === "CHAR" && r.char.rarity === "S"
        ).length;

        if (sCount >= 2) {
            setUnlockedAchievements((prev) => {
                if (prev.includes("lucky_day")) return prev;
                return [...prev, "lucky_day"];
            });
        }

        const prevOwnedCount = owned.length;
        const { owned: newOwned, polyGainedFromB } = applyPullsToOwned(owned, results);

        setOwned(newOwned);
        setPoly((p) => p + polyGainedFromB);
        setLastResults(results);
        setPulling(false);

        setTotalPulls((p) => p + 10);
        updateAchievements(prevOwnedCount, newOwned.length, totalPulls + 10);
    }

    async function handleStarterBannerPull() {
        if (starterUsed || poly < STARTER_PULL_COST || pulling) return;

        setPoly((p) => p - STARTER_PULL_COST);
        setPulling(true);
        setLastResults([]);


        await new Promise((res) => setTimeout(res, 700));

        const { results } = StarterBanner.tenPull();
        const prevOwnedCount = owned.length;
        const { owned: newOwned, polyGainedFromB } = applyPullsToOwned(owned, results);

        setOwned(newOwned);
        setPoly((p) => p + polyGainedFromB);
        setLastResults(results);
        setPulling(false);
        setStarterUsed(true); // lock banner after first use

        setTotalPulls((p) => p + 10);
        updateAchievements(prevOwnedCount, newOwned.length, totalPulls + 10);

    }

    function updateAchievements(
        prevOwnedCount: number,
        newOwnedCount: number,
        newTotalPulls: number
    ) {
        setUnlockedAchievements((prev) => {
            const set = new Set(prev);
            let changed = false;

            // First character
            if (prevOwnedCount === 0 && newOwnedCount > 0 && !set.has("first_character")) {
                set.add("first_character");
                changed = true;
            }

            // Pull 300 times
            if (newTotalPulls >= 300 && !set.has("pull_100")) {
                set.add("pull_100");
                changed = true;
            }

            // Character Collector (20+ unique owned)
            if (newOwnedCount >= 20 && !set.has("character_collector")) {
                set.add("character_collector");
                changed = true;
            }

            return changed ? (Array.from(set) as AchievementId[]) : prev;
        });
    }

    return (

        <div className="app-root">
            <header>
                <h1>ZZZ Clicker</h1>
            </header>

            <div className="app">
                {/* TOP-RIGHT MENU */}
                <div className="top-right-menu">
                    <button className="menu-button" onClick={toggleMenu}>
                        Menu
                    </button>

                    {menuOpen && (
                        <div className="menu-dropdown">
                            <button className="menu-item" onClick={openCollection}>
                                Collection
                            </button>
                            <button className="menu-item" onClick={openAchievements}>
                                Achievements
                            </button>
                        </div>
                    )}

                </div>

            <section className="resource">
                <div>Polychromes: {Math.floor(poly)}</div>
                <div>Per Click: {clickValue}</div>
                <div>CPS: {cps.toFixed(1)}</div>
            </section>

            <button className="big-click" onClick={handleClick}>
                Farm Polychromes
            </button>

            <section className="gacha">
                <h2>Starter-Pull (One-Time)</h2>
                <button
                    onClick={handleStarterBannerPull}
                    disabled={starterUsed || poly < STARTER_PULL_COST || pulling}
                >
                    {starterUsed
                        ? "Starter Banner Used"
                        : pulling
                            ? "Pulling..."
                            : `Starter 10-Pull (${STARTER_PULL_COST})`}
                </button>

                <h2>1-Pull</h2>
                <button onClick={handleOnePull} disabled={poly < ONE_PULL_COST || pulling}>
                    {pulling ? "Pulling..." : `1-Pull (${ONE_PULL_COST})`}
                </button>

                <h2>10-Pull</h2>
                <button onClick={handleTenPull} disabled={poly < TEN_PULL_COST || pulling}>
                    {pulling ? "Pulling..." : `10-Pull (${TEN_PULL_COST})`}
                </button>

                <PullResults results={lastResults} />
            </section>


            <section className="owned">
                <h2>Owned Characters</h2>
                {owned.length === 0 && <div>No characters.</div>}
                <div className="owned-list">
                    {owned.map((o) => (
                        <CharacterCard key={o.char.id} owned={o} onEquip={undefined} />
                    ))}
                </div>
            </section>

            <section className="team">
                <h2>Team (3 Slots)</h2>
                {team.map((slot, idx) => (
                    <div key={idx} className="team-slot">
                        <div>Slot {idx + 1}: {slot ? `${slot.char.name} (Lv ${slot.level})` : "-- leer --"}</div>

                        <select
                            value={slot?.char.id ?? ""}
                            onChange={(e) => {
                                const charId = parseInt(e.target.value);
                                const selectedChar = owned.find(o => o.char.id === charId);
                                if (!selectedChar) return;


                                const isAlreadyEquipped = team.some((t, i) => t?.char.id === charId && i !== idx);
                                if (isAlreadyEquipped) return;

                                setTeam(t => {
                                    const copy = [...t];
                                    copy[idx] = selectedChar;
                                    return copy;
                                });
                            }}
                        >
                            <option value="">-- leer --</option>
                            {owned.map(o => {
                                const isEquipped = team.some((t, i) => t?.char.id === o.char.id && i !== idx);
                                return (
                                    <option key={o.char.id} value={o.char.id} disabled={isEquipped}>
                                        {o.char.name} (Lv {o.level})
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                ))}
            </section>
                {showCollection && (
                    <CollectionModal owned={owned} onClose={closeCollection} />
                )}

                {showAchievements && (
                    <AchievementsModal
                        unlocked={unlockedAchievements}
                        onClose={closeAchievements}
                    />
                )}
            </div>
        </div>
    );
}