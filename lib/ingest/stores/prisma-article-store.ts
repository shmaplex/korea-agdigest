// lib/ingest/stores/prisma-article-store.ts

import { prisma } from "@/lib/server/prisma";
import type { NormalizedArticle } from "@/types/article-protocol";
import type { ArticleStore } from "../store";

export class PrismaArticleStore implements ArticleStore {
  async upsert(article: NormalizedArticle): Promise<void> {
    await prisma.article.upsert({
      where: {
        sourceUrl: article.sourceUrl,
      },
      update: {
        titleKo: article.titleKo,
        bodyKo: article.bodyKo,
        publishedAt: article.publishedAt,
        status: article.status,
        flair: article.flair,
      },
      create: article,
    });
  }
}
