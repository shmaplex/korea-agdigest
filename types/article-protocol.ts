// types/article-protocol.ts
export type NormalizedArticle = {
  source: string;
  sourceUrl: string;
  slug: string;

  titleKo: string;
  bodyKo: string;

  titleEn?: string | null;
  summaryEn?: string | null;
  bodyEn?: string | null;

  publishedAt: Date;
  status: "PUBLISHED";
  flair: string;
};
