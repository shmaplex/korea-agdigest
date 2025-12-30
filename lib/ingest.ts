import { getArticleDB } from "@/services/orbit/articles.db";

export async function ingestArticle(article: {
  source: string;
  sourceUrl: string;
  titleKo: string;
  titleEn?: string;
  bodyKo: string;
  bodyEn?: string;
  publishedAt: Date;
}) {
  const db = await getArticleDB();

  await db.add({
    ...article,
    ingestedAt: new Date().toISOString()
  });
}
