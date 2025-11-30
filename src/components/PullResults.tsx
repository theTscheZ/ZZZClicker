import type {PullResult} from "../gacha";

type Props = {
    results: PullResult[];
};

export default function PullResults({ results }: Props) {
    return (
        <div className="pull-results">
            {results.map((r, i) => (
                <div key={i} className="pull-item">
                    {r.type === "B" ? "B (Refund)" : `${r.char.name} (${r.char.rarity})`}
                </div>
            ))}
        </div>
    );
}