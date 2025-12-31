// lib/auth/roles.ts
export type Role = "admin" | "editor" | "translator";

/**
 * Load roles from environment variables.
 * Example format:
 *   NEXT_PUBLIC_ADMIN_DIDS=did:plc:exampleadmin123,did:plc:otheradmin
 *   NEXT_PUBLIC_EDITOR_DIDS=did:plc:editor456
 *   NEXT_PUBLIC_TRANSLATOR_DIDS=did:plc:translator789,did:plc:another
 */
function getDIDsFromEnv(envVar: string | undefined): string[] {
  if (!envVar) return [];
  return envVar
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export const DID_ROLES: Record<Role, string[]> = {
  admin: getDIDsFromEnv(process.env.NEXT_PUBLIC_ADMIN_DIDS),
  editor: getDIDsFromEnv(process.env.NEXT_PUBLIC_EDITOR_DIDS),
  translator: getDIDsFromEnv(process.env.NEXT_PUBLIC_TRANSLATOR_DIDS),
};

/**
 * Checks if a DID has the specified role
 */
export function hasRole(did: string | null, role: Role): boolean {
  if (!did) return false;
  return DID_ROLES[role]?.includes(did) ?? false;
}
