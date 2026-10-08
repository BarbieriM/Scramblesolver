import type { PlayerColor } from "../types/player";

export interface PlayerColorConfig {
  name: string;
  // Fills: swatches, pills and dots. Readable on parchment and under white icons.
  solid: string;
  // Text, icons and borders on the dark backgrounds (at least 4.5:1).
  bright: string;
}

// Jewel tones kept clear of the theme's golds and browns.
export const PLAYER_COLORS: Record<PlayerColor, PlayerColorConfig> = {
  amethyst: {
    name: "Amethyst",
    solid: "#7E22CE",
    bright: "#C79BFF",
  },

  sapphire: {
    name: "Sapphire",
    solid: "#1D4ED8",
    bright: "#7DA2FF",
  },

  emerald: {
    name: "Emerald",
    solid: "#047857",
    bright: "#34D399",
  },

  crimson: {
    name: "Crimson",
    solid: "#B91C1C",
    bright: "#F87171",
  },

  rose: {
    name: "Rose",
    solid: "#BE185D",
    bright: "#F472B6",
  },

  teal: {
    name: "Teal",
    solid: "#0E7490",
    bright: "#22D3EE",
  },

  silver: {
    name: "Silver",
    solid: "#475569",
    bright: "#E2E8F0",
  },

  lime: {
    name: "Lime",
    solid: "#4D7C0F",
    bright: "#A3E635",
  },
};
