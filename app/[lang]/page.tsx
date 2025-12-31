"use server";

import type { Locale } from "@/i18n-config";
import { getViewerDid } from "@/lib/auth/getViewerDid";
import { getDictionary } from "@/lib/server/dictionaries";
import { prisma } from "@/lib/server/prisma";
import type { ArticleCardArticle } from "@/types/article";
import { ARTICLE_FLAIRS, type ArticleFlair } from "@/types/flair";
import HomePageClient from "./page.client";

function normalizeFlair(
  flair: string | null | undefined,
): ArticleCardArticle["flair"] {
  return flair && ARTICLE_FLAIRS.includes(flair as any)
    ? (flair as ArticleCardArticle["flair"])
    : "news";
}

export default async function HomePage({
  params,
  searchParams,
}: PageProps<"/[lang]">) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const viewerDid = await getViewerDid();

  // Build Prisma filter
  const where: { status: "PUBLISHED"; flair?: string } = {
    status: "PUBLISHED",
  };

  // const flairParam = searchParams?.flair;
  // if (
  //   typeof flairParam === "string" &&
  //   ARTICLE_FLAIRS.includes(flairParam as any)
  // ) {
  //   where.flair = flairParam;
  // }

  const articles = await prisma.article.findMany({
    where,
    orderBy: [
      { promoted: "desc" },
      { highlighted: "desc" },
      { publishedAt: "desc" },
    ],
    take: 20,
  });

  const initialArticles: ArticleCardArticle[] = articles.map((a) => ({
    ...a,
    flair: normalizeFlair(a.flair),
  }));

  return (
    <HomePageClient
      initialArticles={initialArticles}
      viewerDid={viewerDid}
      lang={lang}
    />
  );
}
