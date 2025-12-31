"use client";

import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/custom/avatar";
import { useUser } from "@/providers/UserProvider";

export default function ProfilePage() {
  const { user, loading, logout } = useUser();

  if (loading) return <p>Loading...</p>;

  if (!user)
    return (
      <p className="text-center mt-12 text-muted-foreground">
        Please log in to view your profile
      </p>
    );

  const shortDID = `${user.did.slice(0, 8)}…${user.did.slice(-4)}`;
  const profileURL = `${window.location.origin}/profile/${user.id}`;

  // Placeholder stats
  const contributions = Math.floor(Math.random() * 20);
  const flairs = ["Translator", "Early Adopter"];

  return (
    <div className="min-h-screen bg-background p-4 flex justify-center items-start">
      <div className="w-full max-w-2xl space-y-6 flex flex-col items-center">
        <Card className="w-full p-6 space-y-4 text-center">
          <div className="flex justify-center items-center">
            <Avatar userId={user.did} size="xl" border />
          </div>

          <CardHeader className="space-y-2">
            <CardTitle>{user.name ?? "Anonymous User"}</CardTitle>
            <CardDescription>
              This is your <strong>shareable profile</strong>. Track your
              contributions, flairs, and community engagement.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* DID */}
            <div className="flex flex-col items-center gap-1">
              <p className="text-xs text-muted-foreground">Decentralized ID</p>
              <div className="px-2 py-1 rounded bg-muted/10 text-xs font-mono break-all">
                {shortDID}
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-4 mt-2 w-full">
              <div className="p-3 rounded bg-muted/10 text-center flex-1">
                <p className="font-semibold text-sm">{contributions}</p>
                <p className="text-xs text-muted-foreground">Contributions</p>
              </div>
              <div className="p-3 rounded bg-muted/10 text-center flex-1">
                <p className="font-semibold text-sm">{flairs.length}</p>
                <p className="text-xs text-muted-foreground">Flairs</p>
              </div>
            </div>

            {/* Flair badges */}
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {flairs.map((flair, idx) => (
                <div
                  key={idx as any}
                  className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs"
                >
                  {flair}
                </div>
              ))}
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center mt-4 gap-2">
              <QRCodeCanvas value={profileURL} size={160} />
              <p className="text-xs text-muted-foreground text-center">
                Scan this QR code to share your profile
              </p>
              <Button
                onClick={() => navigator.clipboard.writeText(profileURL)}
                className="mt-2"
              >
                Copy Profile Link
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
