import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { PLAYER_COLORS } from "../../constants/playerColors";
import type {
  Player,
  PlayerColor,
  Pod,
} from "../../types/player";

interface PlayerSetupProps {
  pod: Pod;
  onChange: (pod: Pod) => void;
}

export function PlayerSetup({
  pod,
  onChange,
}: PlayerSetupProps) {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  function updatePlayer(
    playerId: string,
    changes: Partial<Player>,
  ) {
    onChange(
      pod.map((player) =>
        player.id === playerId
          ? { ...player, ...changes }
          : player,
      ),
    );
  }

  const currentPlayer = pod[currentPlayerIndex];

  if (!currentPlayer) {
    return null;
  }

  const playerColor = PLAYER_COLORS[currentPlayer.color];

  const isFirstPlayer = currentPlayerIndex === 0;
  const isLastPlayer = currentPlayerIndex === pod.length - 1;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-600">
          Players
        </h2>

        <span className="text-sm font-medium text-slate-500">
          {currentPlayerIndex + 1} / {pod.length}
        </span>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="mb-3 flex items-center gap-3">
          <span
            className="h-4 w-4 rounded-full"
            style={{
              backgroundColor: playerColor.bg,
            }}
          />

          <span className="font-semibold text-slate-800">
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
          placeholder={`Player ${currentPlayerIndex + 1}`}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

        <div className="mt-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
            Color
          </p>

          <div className="flex flex-wrap gap-2">
            {(Object.keys(PLAYER_COLORS) as PlayerColor[]).map(
              (color) => {
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
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 transition hover:scale-105"
                    style={{
                      backgroundColor: config.bg,
                      borderColor: selected
                        ? config.bg
                        : "transparent",
                    }}
                  >
                    {selected && (
                      <Check
                        size={16}
                        className="text-white"
                      />
                    )}
                  </button>
                );
              },
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-between gap-3">
          <button
            type="button"
            disabled={isFirstPlayer}
            onClick={() =>
              setCurrentPlayerIndex((index) => index - 1)
            }
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft size={18} />
            Back
          </button>

          <button
            type="button"
            disabled={isLastPlayer}
            onClick={() =>
              setCurrentPlayerIndex((index) => index + 1)
            }
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}