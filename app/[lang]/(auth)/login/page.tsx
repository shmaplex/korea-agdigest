"use client";

import { AlertTriangle, KeyRound, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bootstrapIdentity } from "@/lib/identity/bootstrap";

/**
 * LoginPage
 * ----------
 * Signs the user in using their **local-first identity**.
 *
 * Key points for users:
 * - There is NO username or password.
 * - Identity lives on this device only.
 * - Signing in will:
 *     1. Check for an existing local DID
 *     2. Restore the local keys and databases
 *     3. Grant access to the app
 *
 * If no identity is found, the user must create one on the signup page.
 */
export default function LoginPage() {
  /**
   * Handles device-based sign-in.
   *
   * Steps:
   * 1. Look for DID in localStorage
   * 2. Show an error if missing
   * 3. Bootstrap local identity if found
   * 4. Redirect to home
   */
  async function login() {
    const did = localStorage.getItem("agdigest:did");

    if (!did) {
      toast.error("No local identity found", {
        description:
          "This app uses device-based accounts. Create a local identity first.",
      });
      return;
    }

    await bootstrapIdentity();

    toast.success("Signed in securely");
    window.location.href = "/";
  }

  return (
    <div className="space-y-6 text-center">
      {/* Logo placeholder */}
      <div className="mx-auto h-20 w-20 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
        Logo
      </div>

      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">Sign in</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 text-left text-sm">
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <KeyRound className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <span>
              Your identity is stored <strong>locally</strong> on this device.
              No passwords or servers are involved.
            </span>
          </li>

          <li className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <span>
              Signing in reconnects your local keys and databases so the app can
              function properly.
            </span>
          </li>

          <li className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">
              If you cleared browser data or switched devices, you must create a
              new local identity.
            </span>
          </li>
        </ul>

        <Button className="w-full mt-4" onClick={login}>
          Continue
        </Button>
      </CardContent>
    </div>
  );
}
