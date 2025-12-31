// types/flair.ts
export const ARTICLE_FLAIRS = [
  "news",
  "regulations",
  "farming",
  "crop-growing",
  "beekeeping",
  "mushroom-farming",
  "gardening",
  "permaculture",
  "urban-gardening",
  "equipment",
  "local-markets",
  "where-to-buy",
  "policy",
  "research",
] as const;

export type ArticleFlair = (typeof ARTICLE_FLAIRS)[number];
