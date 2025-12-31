// app/articles/[slug]/page.client.tsx
"use client";

import { format } from "date-fns";
import { CommunityTranslation } from "@/components/translation/community-translation";
import { Badge } from "@/components/ui/badge";
import { FLAIR_META } from "@/lib/flair";
import type { ArticleFlair } from "@/types/flair";

export default function ArticlePageClient({
  article,
}: {
  article: {
    id: string;
    titleKo: string;
    titleEn: string | null;
    bodyKo: string;
    bodyEn: string | null;
    source: string;
    publishedAt: Date;
    flair: string;
  };
}) {
  const title = article.titleEn || article.titleKo;
  const body = article.bodyEn || article.bodyKo;

  const meta = article.flair && FLAIR_META[article.flair as ArticleFlair];

  return (
    <section className="mx-auto max-w-3xl px-6 py-10 space-y-10">
      {/* Article header */}
      <header className="space-y-3">
        {meta && (
          <Badge variant="secondary" className="w-fit">
            {meta.emoji} {meta.label}
          </Badge>
        )}

        <h1 className="text-3xl font-semibold tracking-tight leading-snug">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>{article.source}</span>
          <span>·</span>
          <time dateTime={article.publishedAt.toISOString()}>
            {format(new Date(article.publishedAt), "MMM d, yyyy")}
          </time>
        </div>
      </header>

      {/* Article body */}
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        {body}
      </article>

      {/* Community translation */}
      <CommunityTranslation
        articleId={article.id}
        field="body"
        did="did:key:local-user"
        originalText={article.bodyKo}
      />
    </section>
  );
}
