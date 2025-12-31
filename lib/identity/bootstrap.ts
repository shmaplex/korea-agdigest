// lib/identity/bootstrap.ts
import { createLocalDid } from "./createLocalDid";

export async function bootstrapIdentity() {
  if (typeof window === "undefined") return;

  let did = localStorage.getItem("agdigest:did");

  if (!did) {
    const created = await createLocalDid();
    did = created.did;

    localStorage.setItem("agdigest:did", did);
    // (later: store encrypted privateKey)
  }

  // Always refresh cookie so server can see it
  document.cookie = `agdigest_did=${did}; path=/; SameSite=Lax`;
}
