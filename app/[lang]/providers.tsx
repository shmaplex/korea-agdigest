"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import type React from "react";
import { useState } from "react";
import { BookmarksPanel } from "@/components/bookmarks-panel";
import { SiteHeader } from "@/components/site-header";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { UserProvider } from "@/providers/UserProvider";

interface ProvidersProps {
  children: React.ReactNode;
  lang?: string;
}

/**
 * Client-side provider wrapper for global UI state
 * - UserProvider (identity + session)
 * - ThemeProvider (dark/light/system)
 * - Bookmarks drawer
 * - Toaster notifications
 * - SiteHeader with bookmark toggle
 */
export function Providers({ children, lang }: ProvidersProps) {
  const [bookmarksOpen, setBookmarksOpen] = useState(false);

  return (
    <UserProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Drawer open={bookmarksOpen} onOpenChange={setBookmarksOpen}>
          <SiteHeader onOpenBookmarks={() => setBookmarksOpen(true)} />

          <DrawerContent className="w-[90vw] max-w-105 p-4 top-0 right-0">
            <VisuallyHidden>
              <DrawerTitle>Bookmarks</DrawerTitle>
              <DrawerDescription>
                Saved articles and references
              </DrawerDescription>
            </VisuallyHidden>

            {/* BookmarksPanel now reads user from context */}
            <BookmarksPanel />
          </DrawerContent>

          <div className="flex min-h-screen flex-col">{children}</div>
        </Drawer>

        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </UserProvider>
  );
}
