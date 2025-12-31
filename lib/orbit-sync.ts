// lib/orbit-sync.ts

import slugify from "slugify";
import { prisma } from "@/lib/server/prisma";
import { getArticleDB } from "@/services/orbit/articles.db";

export async function syncOrbitToPostgres() {
  const db = await getArticleDB();
  const entries = db.iterator({ limit: -1 }).collect();

  for (const entry of entries) {
    const a = entry.payload.value;

    const slug = slugify(a.titleEn || a.titleKo, {
      lower: true,
      strict: true,
    });

    await prisma.article.upsert({
      where: { sourceUrl: a.sourceUrl },
      update: {},
      create: {
        source: a.source,
        sourceUrl: a.sourceUrl,
        slug,
        titleKo: a.titleKo,
        titleEn: a.titleEn ?? null,
        summaryEn: null,
        bodyKo: a.bodyKo,
        bodyEn: a.bodyEn ?? null,
        publishedAt: new Date(a.publishedAt),
        status: "PUBLISHED",
      },
    });
  }
}
