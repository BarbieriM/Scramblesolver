import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "../../components/Button/Button";
import type { Card } from "../../types/card";
import type { Pod } from "../../types/player";
import { PlayerPermanents } from "../../components/PlayerCards/PlayerPermanents";
import { PLAYER_COLORS } from "../../constants/playerColors";

interface ResultsProps {
  pod: Pod;
  scrambledCards: Record<string, Card[]>;
  currentPlayerIndex: number;
  onBack: () => void;
  onNext: () => void;
  onBackToSetup: () => void;
}

export function Results({
  pod,
  scrambledCards,
  currentPlayerIndex,
  onBack,
  onNext,
  onBackToSetup,
}: ResultsProps) {
  const player = pod[currentPlayerIndex];
  const playerColor = PLAYER_COLORS[player.color];

  if (!player) {
    return null;
  }

  const cards = scrambledCards[player.id] ?? [];

  const isFirstPlayer = currentPlayerIndex === 0;
  const isLastPlayer = currentPlayerIndex === pod.length - 1;

  const groupedCards = Array.from(
    cards
      .reduce((map, card) => {
        const key = `${card.name}-${card.ownerId}`;

        const existing = map.get(key);

        if (existing) {
          existing.quantity++;
        } else {
          map.set(key, {
            name: card.name,
            quantity: 1,
            ownerId: card.ownerId,
          });
        }

        return map;
      }, new Map<string, { name: string; quantity: number; ownerId: string }>())
      .values(),
  );

  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      <div className="mx-auto w-full max-w-md flex-1 px-4 py-6">
        {/* Top navigation */}
        <header className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToSetup}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft size={18} />
            Back to Card List
          </button>

          <span className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-red-500">
            {player.name}'s Cards
          </span>
        </header>

        {/* Player summary */}
        <section
          className="mb-6 rounded-3xl px-6 py-7 text-center text-white shadow-lg"
          style={{
            backgroundColor: playerColor.bg,
          }}
        >
          <p className="text-xs font-bold uppercase tracking-wide text-white/70">
            Cards Assigned To
          </p>

          <h1 className="mt-2 text-4xl font-bold">{player.name}</h1>

          <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
            {cards.length} cards total
          </div>
        </section>

        {/* Hand */}
        <PlayerPermanents player={player} cards={groupedCards} pod={pod} />
      </div>

      {/* Bottom navigation */}
      <footer className="sticky bottom-0 border-t border-slate-200 bg-white p-4">
        <div className="mx-auto flex w-full max-w-md gap-4">
          <Button
            variant="secondary"
            fullWidth
            disabled={isFirstPlayer}
            onClick={onBack}
          >
            <ArrowLeft size={18} />
            Back
          </Button>

          {isLastPlayer ? (
            <Button fullWidth onClick={onBackToSetup}>
              <CheckCircle2 size={18} />
              Finish
            </Button>
          ) : (
            <Button fullWidth onClick={onNext}>
              Next Player
              <ArrowRight size={18} />
            </Button>
          )}
        </div>
      </footer>
    </main>
  );
}
