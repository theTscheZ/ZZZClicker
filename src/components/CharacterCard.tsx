import type {OwnedChar} from "../types";

type Props = {
    owned: OwnedChar;
    onEquip?: () => void;
};

export default function CharacterCard({ owned, onEquip }: Props) {
    const { char, level } = owned;
    const clickBonus = (char.baseClick * level).toFixed(0);
    const cpsBonus = (char.baseCps * level).toFixed(1);

    return (
        <div className="char-card">
            <div className={`rarity-${char.rarity}`}>{char.name} ({char.rarity})</div>
            <div>Level: {level}</div>
            <div>+{clickBonus} per click</div>
            <div>+{cpsBonus} CPS</div>
            {onEquip && <button onClick={onEquip}>Equip</button>}
        </div>
    );
}