export type PlayerColor =
  | "purple"
  | "blue"
  | "green"
  | "orange"
  | "red"
  | "pink"
  | "cyan"
  | "yellow";

export interface Player {
  id: string;
  name: string;
  color: PlayerColor;
}

export type Pod = Player[];