// lib/ingest/stores/orbitdb-article-store.ts

import type { NormalizedArticle } from "@/types/article-protocol";
import type { ArticleStore } from "../store";

/**
 * Minimal abstraction so ingestion does not care
 * how OrbitDB is initialized or replicated.
 */
export class OrbitDBArticleStore implements ArticleStore {
  constructor(
    private readonly db: {
      put: (key: string, value: any) => Promise<void>;
    },
  ) {}

  async upsert(article: NormalizedArticle): Promise<void> {
    await this.db.put(article.sourceUrl, article);
  }
}
