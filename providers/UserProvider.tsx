// providers/UserProvider.tsx
"use client";

import type React from "react";
import { createContext, useContext } from "react";
import { type SessionUser, useSession } from "@/hooks/session/use-session";

interface UserContextValue {
  user: SessionUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
  exportIdentity: () => string;
  importIdentity: (json: string) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const session = useSession();

  return (
    <UserContext.Provider value={session}>{children}</UserContext.Provider>
  );
}

/**
 * Safe hook for consuming session anywhere in the app
 */
export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return ctx;
}

/**
 * Convenience hook to get viewer DID
 * @returns viewer DID or null
 */
export function useViewerDid() {
  return useUser().user?.did ?? null;
}
