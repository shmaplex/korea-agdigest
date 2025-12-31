"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/custom/avatar";
import { ModeToggle } from "@/components/ui/custom/mode-toggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUser } from "@/providers/UserProvider";

export function SiteNav({ onOpenBookmarks }: { onOpenBookmarks: () => void }) {
  const { user, loading, logout } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center gap-4 text-sm">
      <Link
        href="/"
        className="text-muted-foreground hover:text-foreground transition"
      >
        Digest
      </Link>
      <Link
        href="https://reddit.com/r/Agriculture_in_Korea"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition"
      >
        Reddit
      </Link>
      <Link
        href="/about"
        className="text-muted-foreground hover:text-foreground transition"
      >
        About
      </Link>

      <div className="flex items-center gap-3 ml-2">
        {loading ? null : user ? (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
              <Avatar userId={user.did} fallback={user.id} size="sm" border />
            </PopoverTrigger>

            <PopoverContent className="w-48 p-2">
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    href="/profile"
                    className="block px-3 py-2 rounded hover:bg-muted/50 transition"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile/manage"
                    className="block px-3 py-2 rounded hover:bg-muted/50 transition"
                  >
                    Manage Identity
                  </Link>
                </li>
                <li>
                  <Link
                    href="/settings"
                    className="block px-3 py-2 rounded hover:bg-muted/50 transition"
                  >
                    App Settings
                  </Link>
                </li>
                <li>
                  <Button
                    variant="secondary"
                    onClick={onOpenBookmarks}
                    className="w-full"
                  >
                    Bookmarks
                  </Button>
                </li>
                <li>
                  <Button
                    variant="destructive"
                    onClick={logout}
                    className="w-full"
                  >
                    Log out
                  </Button>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        ) : (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </>
        )}
        <ModeToggle />
      </div>
    </nav>
  );
}
