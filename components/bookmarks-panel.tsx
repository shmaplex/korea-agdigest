"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchBookmarkedArticlesAction } from "@/app/actions/bookmarks";
import { useUser } from "@/providers/UserProvider";
import type { ArticleCardArticle } from "@/types/article";
import { BookmarkRow } from "./bookmark-row";

export function BookmarksPanel() {
  const { user, loading: userLoading } = useUser();
  const viewerDid = user?.did ?? null;

  const [articles, setArticles] = useState<ArticleCardArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBookmarks = useCallback(async () => {
    if (!viewerDid) {
      setArticles([]);
      setLoading(false);
      return;
    }

    try {
      const result = await fetchBookmarkedArticlesAction(viewerDid);
      setArticles(result);
    } catch (err) {
      console.error("Failed to load bookmarks", err);
    } finally {
      setLoading(false);
    }
  }, [viewerDid]);

  useEffect(() => {
    if (!userLoading) loadBookmarks();
  }, [loadBookmarks, userLoading]);

  if (!viewerDid || userLoading) return null;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b">
        <h2 className="text-sm font-semibold">Bookmarks</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-2 py-2">
        {loading && (
          <p className="px-2 text-sm text-muted-foreground">Loading…</p>
        )}

        {!loading && articles.length === 0 && (
          <p className="px-2 text-sm text-muted-foreground">
            You have no bookmarks yet.
          </p>
        )}

        <ul className="flex flex-col divide-y">
          {articles.map((article) => (
            <BookmarkRow key={article.id} article={article} />
          ))}
        </ul>
      </div>
    </div>
  );
}
