import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { PLAYER_COLORS } from "../../constants/playerColors";
import { Button } from "../Button/Button";
import type { Player, PlayerColor, Pod } from "../../types/player";

interface PlayerSetupProps {
  pod: Pod;
  onChange: (pod: Pod) => void;
}

export function PlayerSetup({ pod, onChange }: PlayerSetupProps) {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  function updatePlayer(playerId: string, changes: Partial<Player>) {
    onChange(
      pod.map((player) =>
        player.id === playerId ? { ...player, ...changes } : player,
      ),
    );
  }

  const playerIndex = Math.min(currentPlayerIndex, pod.length - 1);
  const currentPlayer = pod[playerIndex];

  if (!currentPlayer) {
    return null;
  }

  const playerColor = PLAYER_COLORS[currentPlayer.color];

  const isFirstPlayer = playerIndex === 0;
  const isLastPlayer = playerIndex === pod.length - 1;

  return (
    <section
      className="
        rounded-xl
        border
        border-gold
        bg-parchment-dark
        p-4
        shadow-card
      "
    >
      <div
        className="
          space-y-4
          rounded-lg
          border
          border-copper
          bg-parchment
          p-3
        "
      >
        <div className="flex items-center justify-between text-ink-muted">
          <h2 className="text-[10px] font-bold uppercase tracking-wide">
            Players
          </h2>

          <span className="text-xs font-bold">
            {playerIndex + 1} / {pod.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span
            className="h-4 w-4 shrink-0 rounded-full border border-rust"
            style={{
              backgroundColor: playerColor.solid,
            }}
          />

          <span className="truncate font-bold text-ink">
            {currentPlayer.name}
          </span>
        </div>

        <input
          type="text"
          value={currentPlayer.name}
          onChange={(event) =>
            updatePlayer(currentPlayer.id, {
              name: event.target.value,
            })
          }
          placeholder={`Player ${playerIndex + 1}`}
          aria-label="Player name"
          className="
            w-full
            rounded-lg
            border
            border-rust
            bg-cream
            px-4 py-3
            text-ink-light
            outline-none
            placeholder:text-tan
            focus:border-gold
            focus:ring-2
            focus:ring-gold/30
          "
        />

        <div>
          <p
            className="
              mb-2 block
              text-[10px]
              font-bold
              uppercase
              tracking-wide
              text-ink-muted
            "
          >
            Color
          </p>

          <div className="flex flex-wrap gap-2">
            {(Object.keys(PLAYER_COLORS) as PlayerColor[]).map((color) => {
              const config = PLAYER_COLORS[color];

              const selected = currentPlayer.color === color;

              return (
                <button
                  key={color}
                  type="button"
                  onClick={() =>
                    updatePlayer(currentPlayer.id, {
                      color,
                    })
                  }
                  aria-label={`${config.name} color`}
                  aria-pressed={selected}
                  className={`
                    flex h-9 w-9 items-center justify-center
                    rounded-full
                    border-2
                    transition
                    hover:scale-105
                    ${selected ? "border-ink ring-2 ring-ink/30" : "border-rust/40"}
                  `}
                  style={{
                    backgroundColor: config.solid,
                  }}
                >
                  {selected && <Check size={16} className="text-white" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between gap-3">
          <Button
            type="button"
            variant="secondary"
            disabled={isFirstPlayer}
            onClick={() => setCurrentPlayerIndex(playerIndex - 1)}
          >
            <ChevronLeft size={18} />
            Back
          </Button>

          <Button
            type="button"
            disabled={isLastPlayer}
            onClick={() => setCurrentPlayerIndex(playerIndex + 1)}
          >
            Next
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
}