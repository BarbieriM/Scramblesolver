import { UserRound } from "lucide-react";

import type { GroupedCard } from "../../types/card";
import type { Player } from "../../types/player";

interface PlayerCardProps {
  card: GroupedCard;
  owner?: Player;
}

export function PlayerCard({
  card,
  owner,
}: PlayerCardProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex min-w-0 items-center gap-3">
        <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500">
          {card.quantity}
        </span>

        <div className="min-w-0">
          <p className="truncate font-medium text-slate-800">
            {card.name}
          </p>

          {owner && (
            <p className="mt-0.5 text-xs text-slate-400">
              Owned by {owner.name}
            </p>
          )}
        </div>
      </div>

      <UserRound
        size={18}
        className="shrink-0 text-slate-400"
      />
    </div>
  );
}