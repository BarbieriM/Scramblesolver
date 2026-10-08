import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";

import { Button } from "../../components/Button/Button";
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";
import type { GroupedCard } from "../../types/card";
import type { Pod } from "../../types/player";
import { PlayerPermanents } from "../../components/PlayerCards/PlayerPermanents";
import { PLAYER_COLORS } from "../../constants/playerColors";
import type { ScrambledCards } from "../../utils/scrambleCards";

interface ResultsProps {
  pod: Pod;
  scrambledCards: ScrambledCards;
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
  // Leaving discards the results, so Finish and "Back to Card List" ask first.
  const [isConfirmingLeave, setIsConfirmingLeave] = useState(false);

  const player = pod[currentPlayerIndex];

  if (!player) {
    return null;
  }

  const cards = scrambledCards[player.id] ?? [];
  const playerColor = PLAYER_COLORS[player.color];

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
      }, new Map<string, GroupedCard>())
      .values(),
  );

  return (
    <main className="flex min-h-screen flex-col bg-night text-cream">
      <div className="mx-auto w-full max-w-md flex-1 px-5 py-6">

        <header className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsConfirmingLeave(true)}
            className="
              flex items-center gap-2
              text-sm font-semibold
              text-gold
              hover:text-gold-light
            "
          >
            <ArrowLeft size={17} />
            Back to Card List
          </button>

          <span
            className="
              rounded-full
              border
              border-gold
              bg-bark
              px-3 py-1
              text-[10px]
              font-bold
              uppercase
              tracking-wide
              text-gold-light
            "
          >
            {player.name}'s Permanents
          </span>
        </header>

        <section
          className="
            mb-7
            rounded-2xl
            border-2
            p-4
          "
          style={{
            borderColor: playerColor.bright,
            boxShadow: `0 0 16px ${playerColor.bright}40`,
          }}
        >
          <div
            className="
              rounded-xl
              border
              px-5 py-6
              text-center
            "
            style={{
              borderColor: `${playerColor.bright}80`,
              backgroundColor: "var(--color-bark)",
            }}
          >
            <p
              className="text-[10px] font-bold uppercase tracking-wide"
              style={{
                color: playerColor.bright,
              }}
            >
              Permanents Assigned To
            </p>

            <h1
              className="mt-2 text-4xl font-bold"
              style={{
                color: playerColor.bright,
              }}
            >
              {player.name}
            </h1>

            <div
              className="
                mx-auto mt-4
                inline-flex
                items-center gap-2
                rounded-full
                border
                px-4 py-1
                text-sm font-semibold
              "
              style={{
                borderColor: `${playerColor.bright}80`,
                color: "var(--color-sand)",
              }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: playerColor.bright,
                }}
              />
              {cards.length} permanents total
            </div>
          </div>
        </section>


        <PlayerPermanents player={player} cards={groupedCards} pod={pod} />
      </div>

      <footer
        className="
          border-t
          border-rust
          bg-night
          p-4
        "
      >
        <div className="mx-auto flex w-full max-w-md gap-3">
          <Button
            variant="secondary"
            fullWidth
            disabled={isFirstPlayer}
            onClick={onBack}
          >
            <ArrowLeft size={17} />
            Back
          </Button>

          {isLastPlayer ? (
            <Button fullWidth onClick={() => setIsConfirmingLeave(true)}>
              <CheckCircle2 size={17} />
              Finish
            </Button>
          ) : (
            <Button fullWidth onClick={onNext}>
              Next Player
              <ArrowRight size={17} />
            </Button>
          )}
        </div>
      </footer>

      <ConfirmModal
        open={isConfirmingLeave}
        title="Finish the Scramble?"
        message="This ends the Scramble and returns to setup. You can't reopen these results."
        confirmLabel="Finish"
        confirmIcon={<CheckCircle2 size={17} />}
        onConfirm={onBackToSetup}
        onCancel={() => setIsConfirmingLeave(false)}
      />
    </main>
  );
}
