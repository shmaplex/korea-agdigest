// components/site-header.tsx
"use client";

import { SiteNav } from "./site-nav";
import { HeaderLogo } from "./ui/custom/header-logo";

export function SiteHeader({
  onOpenBookmarks,
}: {
  onOpenBookmarks: () => void;
}) {
  return (
    <header className="border-b bg-card">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <HeaderLogo />
        </div>
        <SiteNav onOpenBookmarks={onOpenBookmarks} />
      </div>
    </header>
  );
}
