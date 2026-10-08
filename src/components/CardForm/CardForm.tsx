import { Layers, Plus, UsersRound } from "lucide-react";
import { useState } from "react";

import type { CardEntry } from "../../types/card";
import type { Pod } from "../../types/player";

import { Button } from "../Button/Button";

interface CardFormProps {
  pod: Pod;
  onAddCard: (card: CardEntry) => void;
}

export function CardForm({ pod, onAddCard }: CardFormProps) {
  const [quantityInput, setQuantityInput] = useState("1");
  const [name, setName] = useState("");
  const [selectedOwnerId, setSelectedOwnerId] = useState("");
  const ownerId = pod.some((player) => player.id === selectedOwnerId)
    ? selectedOwnerId
    : "";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const quantity = Number(quantityInput);
    if (!name.trim() || !ownerId || !Number.isInteger(quantity) || quantity < 1) {
      return;
    }

    onAddCard({
      id: crypto.randomUUID(),
      name: name.trim(),
      ownerId,
      quantity,
    });

    setQuantityInput("1");
    setName("");
  }

  return (
    <form
      onSubmit={handleSubmit}
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
          rounded-lg
          border
          border-copper
          bg-parchment
          p-3
        "
      >
        <div className="space-y-4">
          
          {/* QUANTITY */}
          <div>
            <label
              htmlFor="quantity"
              className="
                mb-2 block
                text-[10px]
                font-bold
                uppercase
                tracking-wide
                text-ink-muted
              "
            >
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              min={1}
              step={1}
              value={quantityInput}
              onChange={(event) => setQuantityInput(event.target.value)}
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
          </div>

          {/* CARD NAME */}
          <div>
            <label
              htmlFor="card-name"
              className="
                mb-2 block
                text-[10px]
                font-bold
                uppercase
                tracking-wide
                text-ink-muted
              "
            >
              Card Name
            </label>

            <div className="relative">
              <Layers
                size={18}
                className="
                  pointer-events-none
                  absolute
                  left-4 top-1/2
                  -translate-y-1/2
                  text-rust
                "
              />

              <input
                id="card-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter card name"
                className="
                  w-full
                  rounded-lg
                  border
                  border-rust
                  bg-cream
                  py-3 pl-11 pr-4
                  text-ink-light
                  outline-none
                  placeholder:text-tan
                  focus:border-gold
                  focus:ring-2
                  focus:ring-gold/30
                "
              />
            </div>
          </div>

          {/* OWNER */}
          <div>
            <label
              htmlFor="owner"
              className="
                mb-2 block
                text-[10px]
                font-bold
                uppercase
                tracking-wide
                text-ink-muted
              "
            >
              Owner
            </label>

            <div className="relative">
              <UsersRound
                size={18}
                className="
                  pointer-events-none
                  absolute
                  left-4 top-1/2
                  -translate-y-1/2
                  text-rust
                "
              />
              <select
                id="owner"
                value={ownerId}
                onChange={(event) => setSelectedOwnerId(event.target.value)}
                className="
                  w-full
                  appearance-none
                  rounded-lg
                  border
                  border-rust
                  bg-cream
                  py-3 pl-11 pr-10
                  text-ink-light
                  outline-none
                  focus:border-gold
                  focus:ring-2
                  focus:ring-gold/30
                "
              >
                <option value="">Select player</option>

                {pod.map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* BUTTONS */}
          <Button type="submit" fullWidth>
            <Plus size={18} />
            Add Card
          </Button>
        </div>
      </div>
    </form>
  );
}
