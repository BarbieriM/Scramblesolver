export type PlayerColor =
  | "amethyst"
  | "sapphire"
  | "emerald"
  | "crimson"
  | "rose"
  | "teal"
  | "silver"
  | "lime";

export interface Player {
  id: string;
  name: string;
  color: PlayerColor;
}

export type Pod = Player[];
