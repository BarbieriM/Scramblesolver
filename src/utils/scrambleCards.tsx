import type { Card, CardEntry } from "../types/card";
import type { Pod } from "../types/player";

export type ScrambledCards = Record<string, Card[]>;

export function ExpandCardEntries(
  entries: CardEntry[],
): Card[] {
  return entries.flatMap((entry) =>
    Array.from({ length: entry.quantity }, (_, index) => ({
      id: `${entry.id}-${index}`,
      name: entry.name,
      ownerId: entry.ownerId,
    })),
  );
}

/**
 * Randomly assigns every card to a player in the Pod.
 *
 * Cards are assigned independently, so the resulting
 * distribution does NOT need to be even.
 */
export function ScrambleCards(
  cards: Card[],
  pod: Pod,
): ScrambledCards {
  const result: ScrambledCards = {};

  for (const player of pod) {
    result[player.id] = [];
  }

  if (pod.length === 0) {
    return result;
  }

  for (const card of cards) {
    const randomIndex = Math.floor(Math.random() * pod.length);
    const player = pod[randomIndex];

    result[player.id].push(card);
  }

  return result;
}