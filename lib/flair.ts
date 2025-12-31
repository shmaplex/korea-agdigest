import type { ArticleFlair } from "@/types/flair";

// lib/flair.ts
export const FLAIR_META: Record<
  ArticleFlair,
  { label: string; emoji: string }
> = {
  news: { label: "News", emoji: "📰" },
  regulations: { label: "Regulations & Permits", emoji: "🏛" },
  farming: { label: "Farming", emoji: "🚜" },
  "crop-growing": { label: "Crop Growing", emoji: "🌾" },
  beekeeping: { label: "Beekeeping", emoji: "🐝" },
  "mushroom-farming": { label: "Mushroom Farming", emoji: "🍄" },
  gardening: { label: "Gardening", emoji: "🌱" },
  permaculture: { label: "Permaculture", emoji: "🌿" },
  "urban-gardening": { label: "Urban Gardening", emoji: "🏡" },
  equipment: { label: "Equipment & Tools", emoji: "🔧" },
  "local-markets": { label: "Local Markets", emoji: "🏪" },
  "where-to-buy": { label: "Where to Buy", emoji: "📍" },
  policy: { label: "Policy", emoji: "📜" }, // new
  research: { label: "Research", emoji: "🔬" }, // new
};
