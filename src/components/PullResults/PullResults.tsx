import type {PullResult} from "../../logic/gacha.ts";

type Props = {
    results: PullResult[];
};

export default function PullResults({results}: Props) {

    return (
        <div className="pull-results">
            {results.map((r, i) => {
                // rarity bestimmen – fallback auf "B"
                const rarity = r.type === "B" ? "B" : r.char.rarity;

                return (
                    <div key={i} className={`pull-item rarity-${rarity}`}>
                        {r.type === "B"
                            ? "Polychrome*20 (B)"
                            : `${r.char.name} (${r.char.rarity})`
                        }
                    </div>
                );
            })}
        </div>
    );
}