"use client";

import { QRCodeCanvas } from "qrcode.react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/custom/avatar";

interface ProfilePublicProps {
  params: { id: string; name?: string };
}

export default function ProfilePublicPage({ params }: ProfilePublicProps) {
  const { id, name } = params;

  const shortDID = `${id.slice(0, 8)}…${id.slice(-4)}`;
  const profileURL = `${window.location.origin}/profile/${id}`;
  const contributions = Math.floor(Math.random() * 20); // placeholder
  const flairs = ["Translator", "Early Adopter"]; // example badges

  return (
    <div className="min-h-screen bg-background p-4 flex justify-center items-start">
      <div className="w-full max-w-2xl space-y-6 flex flex-col items-center">
        {/* Profile header */}
        <Card className="w-full p-6 space-y-4 text-center">
          <Avatar userId={id} border />
          <CardHeader className="space-y-2">
            <CardTitle>{name ?? "Anonymous User"}</CardTitle>
            <CardDescription>
              This is a <strong>shareable profile</strong> representing your
              contributions and achievements in the community.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            {/* DID */}
            <div className="flex flex-col items-center gap-1">
              <p className="text-xs text-muted-foreground">
                Decentralized ID (DID)
              </p>
              <div className="px-2 py-1 rounded bg-muted/10 text-xs font-mono break-all">
                {shortDID}
              </div>
            </div>

            {/* Contributions */}
            <div className="flex justify-center gap-4 mt-2">
              <div className="p-2 rounded bg-muted/10 text-center flex-1">
                <p className="font-semibold text-sm">{contributions}</p>
                <p className="text-xs text-muted-foreground">Contributions</p>
              </div>
              <div className="p-2 rounded bg-muted/10 text-center flex-1">
                <p className="font-semibold text-sm">{flairs.length}</p>
                <p className="text-xs text-muted-foreground">Flairs</p>
              </div>
            </div>

            {/* Flair badges */}
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {flairs.map((flair, idx) => (
                <div
                  key={idx as any}
                  className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs flex items-center gap-1"
                >
                  {flair}
                </div>
              ))}
            </div>

            {/* QR code */}
            <div className="flex flex-col items-center mt-4 gap-2">
              <QRCodeCanvas value={profileURL} size={160} />
              <p className="text-xs text-muted-foreground text-center">
                Scan this QR code to view or share this profile
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
