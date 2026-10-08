import { Minus, Plus, Settings2 } from "lucide-react";

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
  return (
    <div
      className="
        flex items-center justify-between
        rounded-xl
        border border-rust
        bg-night-deep
        px-4 py-3
      "
    >
      <div className="flex items-center gap-3">
        <Settings2 size={18} className="text-gold-hover" />

        <span className="font-bold text-sand">Number of players</span>
      </div>

      <div
        className="
          flex items-center
          rounded-lg
          border border-gold
          bg-bark
          p-1
          text-gold-light
        "
      >
        <button
          type="button"
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="
            flex h-7 w-7 items-center justify-center
            rounded-md
            hover:bg-bark-light
            disabled:opacity-30
          "
        >
          <Minus size={14} />
        </button>

        <span className="min-w-6 text-center font-bold">{value}</span>

        <button
          type="button"
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="
            flex h-7 w-7 items-center justify-center
            rounded-md
            hover:bg-bark-light
            disabled:opacity-30
          "
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}