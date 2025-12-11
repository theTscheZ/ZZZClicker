import type { FC } from "react";
import type { OwnedChar } from "../types.ts";
import { CHARACTER_POOL } from "../gacha.ts";
import { characterIcons } from "../characterIcons.ts";

type Props = {
    owned: OwnedChar[];
    onClose: () => void;
};

const CollectionModal: FC<Props> = ({ owned, onClose }) => {
    const ownedIds = new Set(owned.map((o) => o.char.id));

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-window" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Collection</h2>
                    <button className="modal-close" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="collection-grid">
                    {CHARACTER_POOL.map((char) => {
                        const isOwned = ownedIds.has(char.id);
                        const iconSrc = characterIcons[char.id];

                        return (
                            <div
                                key={char.id}
                                className={`collection-item ${
                                    isOwned ? "owned" : "missing"
                                }`}
                            >
                                {iconSrc ? (
                                    <img
                                        src={iconSrc}
                                        alt={char.name}
                                        className="collection-icon"
                                    />
                                ) : (
                                    <div className="collection-icon placeholder">
                                        {char.name.charAt(0)}
                                    </div>
                                )}

                                <div className="collection-name">
                                    {char.name}
                                </div>
                                <div className="collection-status">
                                    {isOwned ? "Owned" : "Not owned"}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CollectionModal;
