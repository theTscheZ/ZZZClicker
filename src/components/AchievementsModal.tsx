import type { FC } from "react";
import { ACHIEVEMENTS, type AchievementId } from "../logic/achievements.ts";

type Props = {
    unlocked: AchievementId[];
    onClose: () => void;
};

const AchievementsModal: FC<Props> = ({ unlocked, onClose }) => {
    const unlockedSet = new Set(unlocked);

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-window" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Achievements</h2>
                    <button className="modal-close" onClick={onClose}>
                        ×
                    </button>
                </div>

                <ul className="achievement-list">
                    {ACHIEVEMENTS.map((ach) => {
                        const done = unlockedSet.has(ach.id);
                        return (
                            <li
                                key={ach.id}
                                className={`achievement-item ${
                                    done ? "complete" : "incomplete"
                                }`}
                            >
                                <div className="achievement-title">
                                    <span>{ach.title}</span>
                                    {done && (
                                        <span className="achievement-badge">Completed</span>
                                    )}
                                </div>
                                <div className="achievement-description">
                                    {ach.description}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default AchievementsModal;
