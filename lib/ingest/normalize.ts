// lib/ingest/normalize.ts
import slugify from "slugify";
import type { SourceConfig } from "@/lib/sources";
import type { NormalizedArticle } from "@/types/article-protocol";

export function normalizeArticle(
  item: any,
  source: SourceConfig,
): NormalizedArticle {
  const titleKo = item.title.trim();

  const bodyKo =
    item.content || item["content:encoded"] || item.contentSnippet || "";

  return {
    source: source.name,
    sourceUrl: item.link,
    slug: slugify(item.link, { lower: true, strict: true }),

    titleKo,
    bodyKo,

    titleEn: null,
    summaryEn: null,
    bodyEn: null,

    publishedAt: new Date(item.pubDate),
    status: "PUBLISHED",
    flair: "news",
  };
}
