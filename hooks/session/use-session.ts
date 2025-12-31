// hooks/session/use-session.ts
"use client";

import { useEffect, useState } from "react";

export interface SessionUser {
  did: string;
  id: string;
  name?: string;
}

export function useSession() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const did = localStorage.getItem("agdigest:did");
    if (!did) {
      setUser(null);
    } else {
      setUser({ did, id: did.slice(-8) });
    }
    setLoading(false);
  }, []);

  /**
   * Safely logs out without deleting DID.
   * The user can log back in on the same device.
   */
  function logout() {
    // Only clear temporary session flags or cookies if we have them
    setUser(null);
  }

  /**
   * Exports the DID for backup or migration.
   * Returns a JSON blob the user can save.
   */
  function exportIdentity(): string {
    const did = localStorage.getItem("agdigest:did");
    if (!did) throw new Error("No local identity found");
    const data = { did, timestamp: Date.now() };
    return JSON.stringify(data);
  }

  /**
   * Imports a previously exported identity.
   */
  function importIdentity(identityJson: string) {
    try {
      const data = JSON.parse(identityJson);
      if (!data.did) throw new Error("Invalid identity file");
      localStorage.setItem("agdigest:did", data.did);
      setUser({ did: data.did, id: data.did.slice(-8) });
    } catch (err) {
      throw new Error("Failed to import identity");
    }
  }

  return {
    user,
    loading,
    isAuthenticated: !!user,
    logout,
    exportIdentity,
    importIdentity,
  };
}
