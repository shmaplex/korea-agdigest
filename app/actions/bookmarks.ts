// app/actions/bookmarks.ts
"use server";

// import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/server/prisma";
import type { ArticleCardArticle } from "@/types/article";
import { ARTICLE_FLAIRS } from "@/types/flair";

function normalizeFlair(
  flair: string | null | undefined,
): ArticleCardArticle["flair"] {
  return flair && ARTICLE_FLAIRS.includes(flair as any)
    ? (flair as ArticleCardArticle["flair"])
    : "news";
}

export async function fetchBookmarkedArticlesAction(
  userDid: string,
): Promise<ArticleCardArticle[]> {
  if (!userDid) return [];

  const bookmarks = await prisma.articleBookmark.findMany({
    where: { userDid },
    select: { articleId: true },
  });

  if (bookmarks.length === 0) return [];

  const ids = bookmarks.map((b) => b.articleId);

  const articles = await prisma.article.findMany({
    where: {
      id: { in: ids },
      status: "PUBLISHED",
    },
    orderBy: { publishedAt: "desc" },
  });

  return articles.map((a) => ({
    ...a,
    flair: normalizeFlair(a.flair),
  }));
}

export async function addBookmarkAction(articleId: string, userDid: string) {
  if (!userDid) throw new Error("Not authenticated");

  await prisma.articleBookmark.upsert({
    where: { articleId_userDid: { articleId, userDid } },
    create: { articleId, userDid },
    update: {},
  });

  // optional: revalidate paths to update SSR content
  // revalidatePath("/"); // homepage or bookmarked articles page
}

export async function removeBookmarkAction(articleId: string, userDid: string) {
  if (!userDid) throw new Error("Not authenticated");

  await prisma.articleBookmark.deleteMany({
    where: { articleId, userDid },
  });

  // revalidatePath("/"); // optional
}

export async function fetchBookmarksAction(userDid: string) {
  if (!userDid) return [];

  const bookmarks = await prisma.articleBookmark.findMany({
    where: { userDid },
    select: { articleId: true },
  });

  return bookmarks.map((b) => b.articleId);
}
