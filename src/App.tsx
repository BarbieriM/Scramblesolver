import { useMemo, useState } from "react";

import { Results } from "./pages/Results/Results";
import { Setup } from "./pages/Setup/Setup";

import type { CardEntry } from "./types/card";
import type { Player, Pod, PlayerColor } from "./types/player";

import {
  ExpandCardEntries,
  ScrambleCards,
  type ScrambledCards,
} from "./utils/scrambleCards";

type AppScreen = "setup" | "results";

const INITIAL_PLAYER_COUNT = 4;

const DEFAULT_PLAYER_COLORS: PlayerColor[] = [
  "amethyst",
  "sapphire",
  "emerald",
  "crimson",
  "rose",
  "teal",
  "silver",
  "lime",
];

function createPlayer(index: number): Player {
  return {
    id: String(index + 1),
    name: `Player ${index + 1}`,
    color: DEFAULT_PLAYER_COLORS[index % DEFAULT_PLAYER_COLORS.length],
  };
}

function createPod(count: number): Pod {
  return Array.from({ length: count }, (_, index) => createPlayer(index));
}

// Adds or removes players at the end so everyone else keeps their name and color.
function resizePod(pod: Pod, count: number): Pod {
  if (count <= pod.length) {
    return pod.slice(0, count);
  }

  return [
    ...pod,
    ...Array.from({ length: count - pod.length }, (_, index) =>
      createPlayer(pod.length + index),
    ),
  ];
}

function App() {
  const [screen, setScreen] = useState<AppScreen>("setup");

  const [pod, setPod] = useState<Pod>(() => createPod(INITIAL_PLAYER_COUNT));

  const [cardEntries, setCardEntries] = useState<CardEntry[]>([]);

  const [scrambledCards, setScrambledCards] = useState<ScrambledCards>({});

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const allCards = useMemo(() => ExpandCardEntries(cardEntries), [cardEntries]);

  function handlePlayerCountChange(count: number) {
    const nextPod = resizePod(pod, count);
    const playerIds = new Set(nextPod.map((player) => player.id));

    setPod(nextPod);

    // A removed player's cards leave the game with them.
    setCardEntries((currentCards) =>
      currentCards.filter((card) => playerIds.has(card.ownerId)),
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

  const initialPod = createPod(INITIAL_PLAYER_COUNT);

  const isInitialState =
    cardEntries.length === 0 &&
    pod.length === initialPod.length &&
    pod.every(
      (player, index) =>
        player.name === initialPod[index].name &&
        player.color === initialPod[index].color,
    );

  function handleReset() {
    setPod(createPod(INITIAL_PLAYER_COUNT));
    setCardEntries([]);
    setScrambledCards({});
    setCurrentPlayerIndex(0);
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
      canReset={!isInitialState}
      onReset={handleReset}
    />
  );
}

export default App;
