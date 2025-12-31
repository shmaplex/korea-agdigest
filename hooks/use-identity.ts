// hooks/use-identity.ts
"use client";

export function useIdentity(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("agdigest:did");
}
