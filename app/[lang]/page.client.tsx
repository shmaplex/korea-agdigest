"use client";

import { useCallback, useEffect, useState } from "react";
import {
  addBookmarkAction,
  fetchBookmarksAction,
  removeBookmarkAction,
} from "@/app/actions/bookmarks";
import { ArticleCard } from "@/components/article/article-card";
import { FlairNav } from "@/components/flair-nav";
import { Button } from "@/components/ui/button";
import { RunDigestButton } from "@/components/ui/custom/button-digest";
import { hasRole } from "@/lib/auth/roles";
import type { ArticleCardArticle } from "@/types/article";

type Article = ArticleCardArticle;

export default function HomePageClient({
  initialArticles,
  viewerDid,
  lang = "en",
}: {
  initialArticles: Article[];
  viewerDid: string | null;
  lang?: string;
}) {
  const isAdmin = hasRole(viewerDid, "admin");
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Load user bookmarks once
  useEffect(() => {
    if (!viewerDid) return;
    async function loadBookmarks() {
      const ids = await fetchBookmarksAction(viewerDid as string);
      setBookmarkedIds(ids);
    }
    loadBookmarks();
  }, [viewerDid]);

  const toggleBookmark = useCallback(
    async (articleId: string) => {
      if (!viewerDid) return;

      if (bookmarkedIds.includes(articleId)) {
        await removeBookmarkAction(articleId, viewerDid);
        setBookmarkedIds((ids) => ids.filter((id) => id !== articleId));
      } else {
        await addBookmarkAction(articleId, viewerDid);
        setBookmarkedIds((ids) => [...ids, articleId]);
      }
    },
    [viewerDid, bookmarkedIds],
  );

  const fetchPage = useCallback(async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/articles?limit=20&page=${pageNum}`);
      if (!res.ok) throw new Error("Failed to fetch articles");
      const data = await res.json();
      setArticles(data.articles);
      setTotalPages(data.totalPages);
      setPage(pageNum);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // initial load handled by initialArticles
  useEffect(() => {
    if (page !== 1) fetchPage(page);
  }, [page, fetchPage]);

  const handlePrev = () => {
    if (page > 1) fetchPage(page - 1);
  };
  const handleNext = () => {
    if (page < totalPages) fetchPage(page + 1);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 flex flex-col gap-6 min-w-0">
      <FlairNav />
      {isAdmin && <RunDigestButton />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {loading && <p className="col-span-2 text-center">Loading...</p>}
        {!loading &&
          articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              viewerDid={viewerDid}
              lang={lang}
              bookmarked={bookmarkedIds.includes(article.id)}
              onToggleBookmark={() => toggleBookmark(article.id)}
            />
          ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <Button onClick={handlePrev} disabled={page === 1}>
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button onClick={handleNext} disabled={page === totalPages}>
          Next
        </Button>
      </div>

      <div className="rounded-xl border bg-muted p-6 text-center mt-8">
        <h2 className="text-lg font-semibold">Join the discussion</h2>
        <p className="text-muted-foreground mt-1">
          Articles here are selected to encourage long-form, informed discussion
          about the future of Korean agriculture.
        </p>
        <a
          href="https://reddit.com/r/Agriculture_in_Korea"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 font-medium underline"
        >
          Visit r/Agriculture_in_Korea →
        </a>
      </div>
    </section>
  );
}
