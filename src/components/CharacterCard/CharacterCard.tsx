import type { OwnedChar } from "../../types/types.ts";
import { characterIcons } from "../../logic/characterIcons.ts";
import {factionBonuses} from "../../logic/factions.ts";

type Props = {
    owned: OwnedChar;
    activeFactions: string[];
};

const CharacterCard: React.FC<Props> = ({ owned, activeFactions = [] }) => {
    const { char, level } = owned;
    const iconSrc = characterIcons[char.id];

    const clickBonus = (char.baseClick * level).toFixed(0);
    const cpsBonus = (char.baseCps * level).toFixed(1);

    // Prüfen ob 2- oder 3-Member Bonus aktiv ist
    const is2Active = activeFactions.includes(`${char.faction}-2`);
    const is3Active = activeFactions.includes(`${char.faction}-3`);

    return (
        <div className="character-card">
            {iconSrc && (
                <img src={iconSrc} alt={char.name} className="character-icon" />
            )}

            <div className={`rarity-${char.rarity}`}>{char.name} ({char.rarity})</div>
            <div className="character-level">Level {level}</div>
            <div>+{clickBonus} per click</div>
            <div>+{cpsBonus} CPS</div>

            <div className="faction-name">{char.faction}</div>

            <div className="faction-bonus">
                <div style={{ color: is2Active ? "green" : "red" }}>
                    2-Member Bonus:<br /> Click +{Number(char.faction in factionBonuses && (factionBonuses[char.faction as keyof typeof factionBonuses]?.two?.click ?? 0) * 100).toFixed(0)}%, CPS +{Number(char.faction in factionBonuses && (factionBonuses[char.faction as keyof typeof factionBonuses]?.two?.cps ?? 0) * 100).toFixed(0)}%
                </div>
                <div style={{ color: is3Active ? "green" : "red" }}>
                    3-Member Bonus:<br /> Click +{Number(char.faction in factionBonuses && (factionBonuses[char.faction as keyof typeof factionBonuses]?.three?.click ?? 0) * 100).toFixed(0)}%, CPS +{Number(char.faction in factionBonuses && (factionBonuses[char.faction as keyof typeof factionBonuses]?.three?.cps ?? 0) * 100).toFixed(0)}%
                </div>
            </div>
        </div>
    );
};

export default CharacterCard;
