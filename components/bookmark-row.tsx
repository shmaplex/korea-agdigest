"use client";

import { format } from "date-fns";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { FLAIR_META } from "@/lib/flair";
import type { ArticleCardArticle } from "@/types/article";

interface BookmarkRowProps {
  article: ArticleCardArticle;
  lang?: string;
}

export function BookmarkRow({ article, lang = "en" }: BookmarkRowProps) {
  const meta = FLAIR_META[article.flair];

  return (
    <li className="group px-2 py-3 hover:bg-muted/30 transition">
      <div className="flex items-start gap-2">
        {/* Flair emoji = visual anchor, no badge */}
        <span className="text-sm leading-none mt-0.5">{meta.emoji}</span>

        <div className="flex-1 min-w-0">
          <Link
            href={`/${lang}/articles/${article.id}`}
            className="block text-sm font-medium leading-snug line-clamp-2 group-hover:underline"
          >
            {article.titleEn || article.titleKo}
          </Link>

          <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
            <span>{meta.label}</span>
            <span>·</span>
            <span>{format(new Date(article.publishedAt), "MMM d")}</span>
            <Link
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex items-center gap-0.5 hover:text-primary"
              title="Open source"
            >
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}
