"use client";

import { Button } from "@/components/ui/button";

interface BookmarkButtonProps {
  bookmarked: boolean;
  onToggle: () => void;
}

export function BookmarkButton({ bookmarked, onToggle }: BookmarkButtonProps) {
  return (
    <Button
      onClick={onToggle}
      variant={bookmarked ? "default" : "outline"}
      size="sm"
    >
      {bookmarked ? "★ Bookmarked" : "☆ Bookmark"}
    </Button>
  );
}
