import type { PlayerColor } from "../types/player";

export interface PlayerColorConfig {
  name: string;
  bg: string;
  text: string;
  border: string;
  lightBg: string;
}

export const PLAYER_COLORS: Record<
  PlayerColor,
  PlayerColorConfig
> = {
  purple: {
    name: "Purple",
    bg: "#4F46E5",
    text: "#4F46E5",
    border: "#4F46E5",
    lightBg: "#EEF2FF",
  },

  blue: {
    name: "Blue",
    bg: "#2563EB",
    text: "#2563EB",
    border: "#2563EB",
    lightBg: "#EFF6FF",
  },

  green: {
    name: "Green",
    bg: "#16A34A",
    text: "#16A34A",
    border: "#16A34A",
    lightBg: "#F0FDF4",
  },

  orange: {
    name: "Orange",
    bg: "#EA580C",
    text: "#EA580C",
    border: "#EA580C",
    lightBg: "#FFF7ED",
  },

  red: {
    name: "Red",
    bg: "#DC2626",
    text: "#DC2626",
    border: "#DC2626",
    lightBg: "#FEF2F2",
  },

  pink: {
    name: "Pink",
    bg: "#DB2777",
    text: "#DB2777",
    border: "#DB2777",
    lightBg: "#FDF2F8",
  },

  cyan: {
    name: "Cyan",
    bg: "#0891B2",
    text: "#0891B2",
    border: "#0891B2",
    lightBg: "#ECFEFF",
  },

  yellow: {
    name: "Yellow",
    bg: "#CA8A04",
    text: "#CA8A04",
    border: "#CA8A04",
    lightBg: "#FEFCE8",
  },
};