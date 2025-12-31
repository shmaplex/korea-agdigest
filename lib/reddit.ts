import { prisma } from "@/lib/server/prisma";

export async function formatRedditPost(articleId: string) {
  const article = await prisma.article.findUnique({
    where: { id: articleId },
  });

  if (!article) throw new Error("Article not found");

  return `**${article.titleEn || article.titleKo}**

TL;DR:
${article.summaryEn || "Summary pending."}

Source: ${article.source}
Discussion: https://reddit.com/r/Agriculture_in_Korea`;
}
