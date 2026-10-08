import type { CardEntry } from "../../types/card";
import type { Pod } from "../../types/player";

import { CardListItem } from "./CardListItem";

interface CardListProps {
  cards: CardEntry[];
  pod: Pod;
  onRemove: (id: string) => void;
}

export function CardList({
  cards,
  pod,
  onRemove,
}: CardListProps) {
  const totalCards = cards.reduce(
    (total, card) => total + card.quantity,
    0,
  );

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2
          className="
            text-xs
            font-bold
            uppercase
            tracking-wide
            text-ochre
          "
        >
          Entered Cards
        </h2>

        <span className="text-xs font-semibold text-gold">
          {totalCards} total cards
        </span>
      </div>

      {cards.length === 0 ? (
        <div
          className="
            rounded-xl
            border border-dashed
            border-umber
            bg-soot
            px-5 py-8
            text-center
          "
        >
          <p className="font-medium text-tan">
            No cards added yet.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {cards.map((card) => (
            <CardListItem
              key={card.id}
              card={card}
              pod={pod}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}
    </section>
  );
}