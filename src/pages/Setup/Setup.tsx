import { Shuffle, UsersRound } from "lucide-react";

import { Button } from "../../components/Button/Button";
import { CardForm } from "../../components/CardForm/CardForm";
import { CardList } from "../../components/CardList/CardList";
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
}

export function Setup({
  pod,
  cards,
  onPodChange,
  onPlayerCountChange,
  onAddCard,
  onRemoveCard,
  onScramble,
}: SetupProps) {
  const canScramble = pod.length > 0 && cards.length > 0;

  return (
    <main className="mx-auto min-h-screen w-full max-w-md bg-slate-50 px-4 py-6">
      {/* Header */}
      <header className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <UsersRound size={19} />
          </div>

          <h1 className="text-xl font-bold text-slate-900">Scrambleverse Solver</h1>
        </div>

        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase text-indigo-600">
          Setup
        </span>
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
          <Shuffle size={18} />
          Scramble
        </Button>

        <CardList cards={cards} pod={pod} onRemove={onRemoveCard} />
      </div>
    </main>
  );
}
