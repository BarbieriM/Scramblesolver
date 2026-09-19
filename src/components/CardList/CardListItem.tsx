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
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex min-w-0 items-center gap-3">
        <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500">
          x{card.quantity}
        </span>

        <span className="truncate font-medium text-slate-800">{card.name}</span>
      </div>

      <div className="ml-3 flex shrink-0 items-center gap-3">
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
          {owner && ownerColor && (
            <span
              className="flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                backgroundColor: ownerColor.lightBg,
                color: ownerColor.text,
              }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: ownerColor.bg,
                }}
              />

              {owner.name}
            </span>
          )}{" "}
        </span>

        <button
          type="button"
          onClick={() => onRemove(card.id)}
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
          aria-label={`Remove ${card.name}`}
        >
          <X size={17} />
        </button>
      </div>
    </div>
  );
}
