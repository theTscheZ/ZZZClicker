import {type JSX, useEffect, useState} from "react";
import {
    tenPull,
    rollOne,
    applyPullsToOwned,
    type PullResult,
} from "./gacha";
import type {OwnedChar} from "./types";
import CharacterCard from "./components/CharacterCard";
import PullResults from "./components/PullResults";
import "./styles/app.css";

const ONE_PULL_COST = 160; // 1x 160
const TEN_PULL_COST = ONE_PULL_COST*10; // 10x 160

export default function App(): JSX.Element {
    const [poly, setPoly] = useState<number>(0);
    const [owned, setOwned] = useState<OwnedChar[]>([]);
    const [team, setTeam] = useState<(OwnedChar | null)[]>([null, null, null]);

    const [pulling, setPulling] = useState(false);
    const [lastResults, setLastResults] = useState<PullResult[]>([]);

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

    function handleClick() {
        setPoly((p) => p + clickValue);
    }

    async function handleOnePull() {
        if (poly < ONE_PULL_COST || pulling) return;

        setPoly((p) => p - ONE_PULL_COST);
        setPulling(true);
        setLastResults([]);

        // simple animation delay
        await new Promise((res) => setTimeout(res, 700));

        const result = rollOne();
        const { owned: newOwned, polyGainedFromB } = applyPullsToOwned(owned, [result]);

        setOwned(newOwned);
        setPoly((p) => p + polyGainedFromB);
        setLastResults([result]);
        setPulling(false);
    }

    async function handleTenPull() {
        if (poly < TEN_PULL_COST || pulling) return;
        setPoly((p) => p - TEN_PULL_COST);
        setPulling(true);
        setLastResults([]);

        // simple animation delay
        await new Promise((res) => setTimeout(res, 700));

        const { results } = tenPull();
        const { owned: newOwned, polyGainedFromB } = applyPullsToOwned(owned, results);

        setOwned(newOwned);
        setPoly((p) => p + polyGainedFromB);
        setLastResults(results);
        setPulling(false);
    }

    return (
        <div className="app-root">
            <header>
                <h1>ZZZ Clicker</h1>
            </header>

            <section className="resource">
                <div>Polychromes: {Math.floor(poly)}</div>
                <div>Per Click: {clickValue}</div>
                <div>CPS: {cps.toFixed(1)}</div>
            </section>

            <button className="big-click" onClick={handleClick}>
                Farm Polychromes
            </button>

            <section className="gacha">
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
                {owned.length === 0 && <div>Noch keine Charaktere</div>}
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

                                // Check ob char schon in einem anderen Slot ist
                                const isAlreadyEquipped = team.some((t, i) => t?.char.id === charId && i !== idx);
                                if (isAlreadyEquipped) return; // ignorieren, wenn schon ausgerüstet

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
        </div>
    );
}