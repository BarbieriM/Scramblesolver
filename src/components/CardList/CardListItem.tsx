import { X } from "lucide-react";

import type { CardEntry } from "../../types/card";
import type { Pod } from "../../types/player";
import { PLAYER_COLORS } from "../../constants/playerColors";

interface CardListItemProps {
  card: CardEntry;
  pod: Pod;
  onRemove: (id: string) => void;
}

export function CardListItem({ card, pod, onRemove }: CardListItemProps) {
  const owner = pod.find((player) => player.id === card.ownerId);

  const ownerColor = owner ? PLAYER_COLORS[owner.color] : undefined;

  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-lg
        border
        border-copper
        bg-parchment-light
        px-3 py-3
        shadow-card-sm
      "
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          className="
            flex
            h-8 w-8
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-ember
            text-xs
            font-bold
            text-cream-light
          "
        >
          x{card.quantity}
        </span>

        <span
          className="
            truncate
            font-bold
            text-ink
          "
        >
          {card.name}
        </span>
      </div>

      <div className="ml-2 flex shrink-0 items-center gap-2">
        {owner && ownerColor && (
          <span
            className="
              rounded-full
              px-3 py-1
              text-[10px]
              font-bold
              text-white
            "
            style={{
              backgroundColor: ownerColor.solid,
            }}
          >
            {owner.name}
          </span>
        )}

        <button
          type="button"
          onClick={() => onRemove(card.id)}
          className="
            text-rust
            hover:text-red-700
          "
          aria-label={`Remove ${card.name}`}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
