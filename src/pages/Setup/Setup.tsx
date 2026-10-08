import { Dices, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/Button/Button";
import { CardForm } from "../../components/CardForm/CardForm";
import { CardList } from "../../components/CardList/CardList";
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";
import { PlayerCounter } from "../../components/PlayerCounter/PlayerCounter";
import type { CardEntry } from "../../types/card";
import type { Pod } from "../../types/player";
import { PlayerSetup } from "../../components/PlayerSetup/PlayerSetup";

interface SetupProps {
  pod: Pod;
  cards: CardEntry[];
  onPodChange: (pod: Pod) => void;
  onPlayerCountChange: (count: number) => void;
  onAddCard: (card: CardEntry) => void;
  onRemoveCard: (id: string) => void;
  onScramble: () => void;
  canReset: boolean;
  onReset: () => void;
}

export function Setup({
  pod,
  cards,
  onPodChange,
  onPlayerCountChange,
  onAddCard,
  onRemoveCard,
  onScramble,
  canReset,
  onReset,
}: SetupProps) {
  const [isConfirmingReset, setIsConfirmingReset] = useState(false);

  const canScramble = pod.length > 0 && cards.length > 0;

  function handleConfirmReset() {
    setIsConfirmingReset(false);
    onReset();
  }

  return (
    <main className="min-h-screen bg-night-deep">
      <div className="mx-auto min-h-screen w-full max-w-md px-5 py-6">
        {/* HEADER */}
        <header className="mb-6 flex items-center justify-center border-b border-walnut pb-4">
          <h1 className="text-center text-xl font-bold tracking-wide text-cream">
            Scrambleverse Solver
          </h1>
        </header>

        <div className="space-y-4">
          <PlayerCounter value={pod.length} onChange={onPlayerCountChange} />

          <PlayerSetup pod={pod} onChange={onPodChange} />

          <CardForm pod={pod} onAddCard={onAddCard} />

          <Button
            type="button"
            variant="dark"
            fullWidth
            disabled={!canScramble}
            onClick={onScramble}
          >
            <Dices size={18} />
            Scramble!
          </Button>

          <CardList cards={cards} pod={pod} onRemove={onRemoveCard} />

          {canReset && (
            <Button
              type="button"
              variant="ghost"
              fullWidth
              onClick={() => setIsConfirmingReset(true)}
            >
              <RotateCcw size={18} />
              Reset
            </Button>
          )}
        </div>
      </div>

      <ConfirmModal
        open={isConfirmingReset}
        title="Reset everything?"
        message="This clears all players and cards."
        confirmLabel="Reset"
        confirmIcon={<RotateCcw size={18} />}
        onConfirm={handleConfirmReset}
        onCancel={() => setIsConfirmingReset(false)}
      />
    </main>
  );
}
