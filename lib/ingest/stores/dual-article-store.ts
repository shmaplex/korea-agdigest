// lib/ingest/stores/dual-article-store.ts

import type { NormalizedArticle } from "@/types/article-protocol";
import type { ArticleStore } from "../store";

export class DualArticleStore implements ArticleStore {
  constructor(private readonly stores: ArticleStore[]) {}

  async upsert(article: NormalizedArticle): Promise<void> {
    await Promise.all(this.stores.map((store) => store.upsert(article)));
  }
}
