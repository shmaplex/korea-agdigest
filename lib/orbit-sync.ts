import { prisma } from "@/lib/server/prisma";
import { getArticleDB } from "@/services/orbit/articles.db";

export async function syncOrbitToPostgres() {
  const db = await getArticleDB();
  const entries = db.iterator({ limit: -1 }).collect();

  for (const entry of entries) {
    const a = entry.payload.value;

    await prisma.article.upsert({
      where: { sourceUrl: a.sourceUrl },
      update: {},
      create: {
        source: a.source,
        sourceUrl: a.sourceUrl,
        titleKo: a.titleKo,
        titleEn: a.titleEn ?? "",
        bodyKo: a.bodyKo,
        bodyEn: a.bodyEn ?? "",
        publishedAt: new Date(a.publishedAt),
        status: "PUBLISHED",
      },
    });
  }
}
