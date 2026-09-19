import { Plus, UserRound } from "lucide-react";
import { useState } from "react";

import type { CardEntry } from "../../types/card";
import type { Pod } from "../../types/player";
import { Button } from "../Button/Button";

interface CardFormProps {
  pod: Pod;
  onAddCard: (card: CardEntry) => void;
}

export function CardForm({ pod, onAddCard }: CardFormProps) {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [ownerId, setOwnerId] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !ownerId || quantity < 1) {
      console.log(name.trim(), ownerId, quantity);
      return;
    }

    onAddCard({
      id: crypto.randomUUID(),
      name: name.trim(),
      ownerId,
      quantity,
    });

    setQuantity(1);
    setName("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-5"
    >
      <div className="space-y-5">
        {/* Quantity */}
        <div>
          <label
            htmlFor="quantity"
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-600"
          >
            Quantity
          </label>

          <input
            id="quantity"
            type="number"
            min={1}
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Card name */}
        <div>
          <label
            htmlFor="card-name"
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-600"
          >
            Card Name
          </label>

          <div className="relative">
            <UserRound
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="card-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter card name"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        {/* Owner */}
        <div>
          <label
            htmlFor="owner"
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-600"
          >
            Owner
          </label>

          <select
            id="owner"
            value={ownerId}
            onChange={(event) => setOwnerId(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">Select player</option>

            {pod.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" fullWidth>
          <Plus size={18} />
          Add Card
        </Button>
      </div>
    </form>
  );
}
