// app/articles/[slug]/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/server/prisma";
import ArticlePageClient from "./page.client";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  });

  if (!article) notFound();

  return <ArticlePageClient article={article} />;
}
