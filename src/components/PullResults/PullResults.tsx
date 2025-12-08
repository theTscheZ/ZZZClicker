import type {PullResult} from "../../logic/gacha.ts";

type Props = {
    results: PullResult[];
};

export default function PullResults({ results }: Props) {
    return (
        <div className="pull-results">
            {results.map((r, i) => (
                <div key={i} className="pull-item">
                    {r.type === "B" ? "Polychrome*20 (B)" : `${r.char.name} (${r.char.rarity})`}
                </div>
            ))}
        </div>
    );
}