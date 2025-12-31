"use client";

import { format } from "date-fns";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BookmarkButton } from "@/components/ui/custom/button-bookmark";
import { FLAIR_META } from "@/lib/flair";
import { DEFAULT_SOURCE, SOURCE_LOGOS } from "@/lib/sources";
import type { ArticleCardArticle } from "@/types/article";

interface ArticleCardProps {
  article: ArticleCardArticle;
  viewerDid: string | null;
  bookmarked?: boolean;
  onToggleBookmark?: () => void;
  lang?: string;
}

export function ArticleCard({
  article,
  viewerDid,
  bookmarked,
  onToggleBookmark,
  lang = "en",
}: ArticleCardProps) {
  const meta = FLAIR_META[article.flair];
  const sourceKey = article.source;
  const sourceMeta = SOURCE_LOGOS[sourceKey] ?? {
    name: article.source,
    logo: DEFAULT_SOURCE.logo,
  };

  const hasSourceLogo = !!sourceMeta.logo;

  return (
    <Card className="flex flex-col relative overflow-hidden hover:shadow-lg transition-shadow duration-200 h-full">
      <div className="w-full justify-between flex items-center px-4">
        {/* Flair */}
        <Badge variant="secondary" className="text-xs font-semibold">
          {meta.emoji} {meta.label}
        </Badge>
        {/* Optional Bookmark top-right */}
        {viewerDid && onToggleBookmark && (
          <BookmarkButton
            bookmarked={bookmarked ?? false}
            onToggle={onToggleBookmark}
          />
        )}
      </div>

      {/* Main content grows to push footer down */}
      <CardContent className="flex flex-col gap-0 px-6 grow">
        {/* Title */}
        <Link
          href={`/${lang}/articles/${article.id}`}
          className="text-xl lg:text-2xl font-bold hover:underline wrap-break-word mt-2 leading-tight"
        >
          {article.titleEn || article.titleKo}
        </Link>

        {/* Article Summary */}
        {article.summaryEn && (
          <p className="text-sm text-muted-foreground line-clamp-4">
            {article.summaryEn}
          </p>
        )}

        {/* Published date */}
        <div className="text-xs text-muted-foreground mt-1">
          {format(new Date(article.publishedAt), "MMM d, yyyy")}
        </div>
      </CardContent>

      {/* Bottom info: source logo/name left, external link right */}
      <div className="flex justify-between items-center px-6 pt-2">
        <Link
          href={article.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="w-28 transition ease-in-out duration-300 opacity-50 hover:opacity-100">
            {hasSourceLogo ? (
              <Image
                src={sourceMeta.logo}
                alt={sourceMeta.name}
                title={sourceMeta.name}
                width={72}
                height={18}
                className="object-contain invert-0 dark:invert"
              />
            ) : (
              <span className="text-xs text-muted-foreground uppercase">
                {sourceMeta.name}
              </span>
            )}
          </div>
        </Link>
        <Link
          href={article.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          Read original
          <ExternalLink className="w-3 h-3 stroke-current" />
        </Link>
      </div>
    </Card>
  );
}
