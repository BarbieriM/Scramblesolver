import { useMemo, useState } from "react";

import { Results } from "./pages/Results/Results";
import { Setup } from "./pages/Setup/Setup";

import type { CardEntry } from "./types/card";
import type { Pod, PlayerColor } from "./types/player";

import {
  ExpandCardEntries,
  ScrambleCards,
  type ScrambledCards,
} from "./utils/scrambleCards";

type AppScreen = "setup" | "results";

const DEFAULT_PLAYER_COLORS: PlayerColor[] = [
  "purple",
  "blue",
  "green",
  "orange",
  "red",
  "pink",
  "cyan",
  "yellow",
];

function createPod(count: number): Pod {
  return Array.from({ length: count }, (_, index) => ({
    id: String(index + 1),
    name: `Player ${index + 1}`,
    color: DEFAULT_PLAYER_COLORS[index % DEFAULT_PLAYER_COLORS.length],
  }));
}

function App() {
  const [screen, setScreen] = useState<AppScreen>("setup");

  const [pod, setPod] = useState<Pod>(() => createPod(4));

  const [cardEntries, setCardEntries] = useState<CardEntry[]>([]);

  const [scrambledCards, setScrambledCards] = useState<ScrambledCards>({});

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const allCards = useMemo(() => ExpandCardEntries(cardEntries), [cardEntries]);

  function handlePlayerCountChange(count: number) {
    setPod(createPod(count));

    // Owner selections become invalid when the pod changes.
    setCardEntries((currentCards) =>
      currentCards.filter((card) => {
        const playerNumber = Number(card.ownerId);

        return playerNumber <= count;
      }),
    );
  }

  function handlePodChange(pod: Pod) {
    setPod(pod);
  }

  function handleAddCard(card: CardEntry) {
    setCardEntries((current) => [...current, card]);
  }

  function handleRemoveCard(id: string) {
    setCardEntries((current) => current.filter((card) => card.id !== id));
  }

  function handleScramble() {
    if (allCards.length === 0 || pod.length === 0) {
      return;
    }

    const result = ScrambleCards(allCards, pod);

    setScrambledCards(result);
    setCurrentPlayerIndex(0);
    setScreen("results");
  }

  function handleBack() {
    setCurrentPlayerIndex((current) => Math.max(0, current - 1));
  }

  function handleNext() {
    setCurrentPlayerIndex((current) => Math.min(pod.length - 1, current + 1));
  }

  function handleBackToSetup() {
    setScreen("setup");
  }

  if (screen === "results") {
    return (
      <Results
        pod={pod}
        scrambledCards={scrambledCards}
        currentPlayerIndex={currentPlayerIndex}
        onBack={handleBack}
        onNext={handleNext}
        onBackToSetup={handleBackToSetup}
      />
    );
  }

  return (
    <Setup
      pod={pod}
      cards={cardEntries}
      onPodChange={handlePodChange}
      onPlayerCountChange={handlePlayerCountChange}
      onAddCard={handleAddCard}
      onRemoveCard={handleRemoveCard}
      onScramble={handleScramble}
    />
  );
}

export default App;
