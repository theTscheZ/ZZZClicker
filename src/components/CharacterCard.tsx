import type {OwnedChar} from "../types";
import {characterIcons} from "../characterIcons";

type Props = {
    owned: OwnedChar;
    onEquip?: () => void;
};

const CharacterCard: React.FC<Props> = ({owned, onEquip}) => {
    const {char, level} = owned;
    const iconSrc = characterIcons[char.id];
    const clickBonus = (char.baseClick * level).toFixed(0);
    const cpsBonus = (char.baseCps * level).toFixed(1);

    return (
        <div className="char-card">
            {iconSrc && (
                <img
                    src={iconSrc}
                    alt={char.name}
                    className="character-icon"
                />
            )}

            <div className={`rarity-${char.rarity}`}>{char.name} ({char.rarity})</div>
            <div className="character-level">Level {level}</div>
            <div>+{clickBonus} per click</div>
            <div>+{cpsBonus} CPS</div>

            {onEquip && (
                <button onClick={onEquip} className="character-equip-btn">
                    Equip
                </button>
            )}
        </div>
    );
};

export default CharacterCard;
