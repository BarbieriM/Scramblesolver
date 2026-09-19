import { Minus, Plus, UsersRound } from "lucide-react";

interface PlayerCounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function PlayerCounter({
  value,
  onChange,
  min = 2,
  max = 20,
}: PlayerCounterProps) {
  function decrease() {
    if (value > min) {
      onChange(value - 1);
    }
  }

  function increase() {
    if (value < max) {
      onChange(value + 1);
    }
  }

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4">
      <div className="flex items-center gap-3">
        <UsersRound className="h-5 w-5 text-indigo-600" />

        <span className="font-semibold text-slate-800">
          Number of players
        </span>
      </div>

      <div className="flex items-center gap-3 rounded-xl bg-slate-100 p-1">
        <button
          type="button"
          onClick={decrease}
          disabled={value <= min}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-white disabled:opacity-40"
        >
          <Minus size={16} />
        </button>

        <span className="min-w-5 text-center font-semibold">
          {value}
        </span>

        <button
          type="button"
          onClick={increase}
          disabled={value >= max}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-white disabled:opacity-40"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}