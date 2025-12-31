// types/article.ts
import type { ArticleFlair } from "@/types/flair";

export type ArticleCardArticle = {
  id: string;
  slug: string;
  titleKo: string | null;
  titleEn: string | null;
  summaryEn: string | null;
  source: string;
  imageUrl?: string;
  sourceUrl: string;
  publishedAt: Date;
  flair: ArticleFlair;
};
