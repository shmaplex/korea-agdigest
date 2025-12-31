"use client";

/**
 * SignupPage
 * -----------
 * Creates a local-first decentralized identity (DID).
 *
 * No email. No password. No server account.
 * A cryptographic identity is generated and stored on this device only.
 *
 * Clearing browser storage or switching devices will permanently
 * remove access to this identity.
 */

import { HardDrive, ShieldCheck, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bootstrapIdentity } from "@/lib/identity/bootstrap";

export default function SignupPage() {
  /**
   * Bootstraps a local DID and session.
   *
   * Idempotent:
   * - Creates a DID if one does not exist
   * - Restores the session if it already exists
   */
  async function createIdentity() {
    try {
      await bootstrapIdentity();
      toast.success("Local identity created");
      window.location.href = "/";
    } catch {
      toast.error("Failed to create identity");
    }
  }

  return (
    <div className="space-y-6 text-center">
      {/* Logo placeholder */}
      <div className="mx-auto h-20 w-20 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
        Logo
      </div>

      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">Create your identity</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 text-sm text-left">
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <HardDrive className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <span>Your identity is generated and stored on this device</span>
          </li>
          <li className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <span>Only you control it — nothing is uploaded</span>
          </li>
          <li className="flex items-start gap-3">
            <UserPlus className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <span>
              This identity enables moderation, translation, and authorship
            </span>
          </li>
        </ul>

        <Button className="w-full mt-4" onClick={createIdentity}>
          Create local identity
        </Button>

        <p className="text-xs text-muted-foreground mt-2">
          ⚠️ If you clear browser data or switch devices, this identity cannot be
          recovered.
        </p>
      </CardContent>
    </div>
  );
}
