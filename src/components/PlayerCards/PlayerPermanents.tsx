import type { GroupedCard } from "../../types/card";
import type { Player, Pod } from "../../types/player";

import { PlayerCard } from "./PlayerCard";

interface PlayerPermanentsProps {
  player: Player;
  cards: GroupedCard[];
  pod: Pod;
}


export function PlayerPermanents({ player, cards, pod }: PlayerPermanentsProps) {
  console.log(cards)

  const cardQuantity =()=>{
    let cardTotal = 0
    cards.map((card)=> cardTotal += card.quantity )

    return cardTotal
  }
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-600">
          {player.name}'s Permanents
        </h2>

        <span className="text-sm font-semibold text-indigo-600">
          {cardQuantity()} cards
        </span>
      </div>

      {cards.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center">
          <p className="text-sm font-medium text-slate-500">
            No cards assigned.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {cards.map((card) => (
            <PlayerCard
              key={card.name}
              card={card}
              owner={pod.find((owner) => owner.id === card.ownerId)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
