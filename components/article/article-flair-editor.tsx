"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FLAIR_META } from "@/lib/flair";
import { ARTICLE_FLAIRS, type ArticleFlair } from "@/types/flair";

export function ArticleFlairEditor({
  articleId,
  value,
  isAdmin,
}: {
  articleId: string;
  value: ArticleFlair;
  isAdmin: boolean;
}) {
  if (!isAdmin) return null;

  async function updateFlair(flair: ArticleFlair) {
    await fetch(`/api/articles/${articleId}/flair`, {
      method: "POST",
      body: JSON.stringify({ flair }),
    });
  }

  return (
    <Select defaultValue={value} onValueChange={updateFlair}>
      <SelectTrigger className="w-55">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {ARTICLE_FLAIRS.map((f) => (
          <SelectItem key={f} value={f}>
            {FLAIR_META[f].emoji} {FLAIR_META[f].label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
