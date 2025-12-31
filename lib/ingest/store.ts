// lib/ingest/store.ts

import type { NormalizedArticle } from "@/types/article-protocol";

export interface ArticleStore {
  upsert(article: NormalizedArticle): Promise<void>;
}
