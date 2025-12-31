// lib/auth/getViewerDid.ts
import { cookies } from "next/headers";

export async function getViewerDid(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("agdigest_did")?.value ?? null;
}
