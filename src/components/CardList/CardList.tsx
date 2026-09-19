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
const totalCards = cards.length;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-600">
          Entered Cards
        </h2>

        <span className="text-sm font-semibold text-indigo-600">
          {totalCards} total cards
        </span>
      </div>

      {cards.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
          <p className="font-medium text-slate-500">
            No cards added yet.
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Add cards above to build your list.
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