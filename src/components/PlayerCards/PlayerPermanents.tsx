import { Check, UserRound } from "lucide-react";
import { PLAYER_COLORS } from "../../constants/playerColors";
import type { GroupedCard } from "../../types/card";
import type { Player, Pod } from "../../types/player";

interface PlayerPermanentsProps {
  player: Player;
  cards: GroupedCard[];
  pod: Pod;
}


export function PlayerPermanents({ player, cards, pod }: PlayerPermanentsProps) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-3">
        <div className="h-px flex-1 bg-umber" />
        <h2 className="text-xs font-bold uppercase tracking-wide text-ochre">
          {player.name}'s Permanents
        </h2>
        <div className="h-px flex-1 bg-umber" />
      </div>

      {cards.length === 0 ? (
        <div
          className="
            rounded-xl
            border
            border-umber
            bg-soot
            px-5 py-8
            text-center
          "
        >
          <p className="text-sm text-tan">No permanents assigned.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {cards.map((card) => {
            const owner = pod.find((p) => p.id === card.ownerId);
            const isOwner = card.ownerId === player.id;
            const ownerColor = owner ? PLAYER_COLORS[owner.color] : undefined;
            return (
              <div
                key={`${card.name}-${card.ownerId}`}
                className={`
                  flex items-center
                  justify-between
                  rounded-xl
                  border
                  px-3 py-3
                  transition
                  ${
                    isOwner
                      ? "border-gold bg-bark-dark"
                      : "border-umber bg-soot"
                  }
                `}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={`
                      flex h-8 w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      text-xs font-bold
                      ${
                        isOwner
                          ? "bg-gold text-cream-light"
                          : "border border-umber text-gold"
                      }
                    `}
                  >
                    x{card.quantity}
                  </span>

                  <div className="min-w-0">
                    <p
                      className={`
                        truncate
                        font-bold
                        ${isOwner ? "text-gold-light" : "text-sand-muted"}
                      `}
                    >
                      {card.name}
                    </p>

                    {!isOwner && owner && ownerColor && (
                      <p
                        className="mt-0.5 text-[10px]"
                        style={{
                          color: ownerColor.bright,
                        }}
                      >
                        Owned by {owner.name}
                      </p>
                    )}
                  </div>
                </div>

                {isOwner ? (
                  <Check
                    size={20}
                    className="shrink-0"
                    style={{ color: ownerColor?.bright }}
                  />
                ) : (
                  <UserRound
                    size={18}
                    className="shrink-0"
                    style={{ color: ownerColor?.bright }}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
