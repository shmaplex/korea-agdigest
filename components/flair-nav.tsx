"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { FLAIR_META } from "@/lib/flair";
import { ARTICLE_FLAIRS, type ArticleFlair } from "@/types/flair";

export function FlairNav() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFlair = (searchParams.get("flair") || "news") as ArticleFlair;

  function handleClick(flair: ArticleFlair) {
    const params = new URLSearchParams(searchParams.toString());
    if (flair === "news") params.delete("flair");
    else params.set("flair", flair);
    router.push(`${pathname}?${params.toString()}`);
  }

  function scrollBy(offset: number) {
    scrollRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  }

  return (
    <div className="relative flex items-center">
      {/* Left arrow */}
      <Button
        variant="outline"
        size="sm"
        className="absolute left-0 z-10 hidden h-10 w-10 items-center justify-center sm:flex"
        onClick={() => scrollBy(-150)}
      >
        <ChevronLeft size={20} />
      </Button>

      {/* Scrollable nav */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-3 py-5 px-4 sm:px-12 mask-fade scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
      >
        {ARTICLE_FLAIRS.map((flair) => {
          const meta = FLAIR_META[flair];
          const isActive = activeFlair === flair;

          return (
            <Button
              key={flair}
              variant={isActive ? "default" : "outline"}
              size="sm"
              className="flex items-center gap-1 whitespace-nowrap shrink-0"
              onClick={() => handleClick(flair)}
            >
              {meta.emoji} {meta.label}
            </Button>
          );
        })}
      </div>

      {/* Right arrow */}
      <Button
        variant="outline"
        size="sm"
        className="absolute right-0 z-10 hidden h-10 w-10 items-center justify-center sm:flex"
        onClick={() => scrollBy(150)}
      >
        <ChevronRight size={20} />
      </Button>

      <style jsx>{`
        .mask-fade {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }
      `}</style>
    </div>
  );
}
