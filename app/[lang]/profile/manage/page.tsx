"use client";

import {
  Download,
  KeyRound,
  LogOut,
  Monitor,
  Trash2,
  Upload,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useUser } from "@/providers/UserProvider";

export default function ProfilePage() {
  const { user, logout, exportIdentity, importIdentity } = useUser();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteConfirmValue, setDeleteConfirmValue] = useState("");

  function handleExport() {
    try {
      const data = exportIdentity();
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `agdigest-identity-${user?.id}.json`;
      a.click();

      URL.revokeObjectURL(url);
      toast.success("Identity exported successfully");
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    const reader = new FileReader();

    reader.onload = () => {
      try {
        importIdentity(reader.result as string);
        toast.success("Identity imported successfully");
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setImporting(false);
        e.target.value = "";
      }
    };

    reader.readAsText(file);
  }

  function handleDeleteIdentity() {
    if (!user) return;

    localStorage.removeItem("agdigest:did");
    logout();
    toast.success("Identity deleted successfully");
    window.location.href = "/signup";
  }

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row p-4 lg:p-12 gap-6 justify-center items-start">
      {/* Left panel */}
      <div className="flex-1 max-w-2xl w-full space-y-6">
        <Card className="w-full p-6 space-y-6">
          <CardHeader>
            <CardTitle>Profile & Identity</CardTitle>
            <CardDescription>
              Manage your <strong>local-first identity</strong> and device
              settings.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* DID */}
              <div className="flex items-start gap-3">
                <KeyRound className="mt-1 h-6 w-6 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    Decentralized ID (DID)
                  </p>
                  <div className="mt-1 rounded bg-muted/10 px-2 py-1 text-xs font-mono text-muted-foreground break-all">
                    {user?.did ?? "Not signed in"}
                  </div>
                </div>
              </div>

              {/* Device ID */}
              <div className="flex items-start gap-3">
                <Monitor className="mt-1 h-6 w-6 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">Device ID</p>
                  <div className="mt-1 rounded bg-muted/10 px-2 py-1 text-xs font-mono text-muted-foreground break-all">
                    {user?.id ?? "-"}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right panel */}
      <div className="flex-1 max-w-md w-full space-y-4">
        <Card className="p-6 space-y-4">
          <CardHeader>
            <CardTitle>Routine Actions</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            <Button className="w-full" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Log out (keep identity)
            </Button>

            <Button className="w-full" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export identity
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="application/json"
              onChange={handleImport}
            />

            <Button
              className="w-full"
              disabled={importing}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              {importing ? "Importing..." : "Import identity"}
            </Button>
          </CardContent>
        </Card>

        <Card className="p-6 border border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
          </CardHeader>

          <CardContent>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => setDeleteModalOpen(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete identity (permanent)
            </Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Permanent Deletion</DialogTitle>
            <DialogDescription>
              Type your <strong>Device ID</strong> to confirm.
            </DialogDescription>
          </DialogHeader>

          <Input
            value={deleteConfirmValue}
            onChange={(e) => setDeleteConfirmValue(e.target.value)}
          />

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (deleteConfirmValue !== user?.id) {
                  toast.error("Device ID does not match.");
                  return;
                }
                handleDeleteIdentity();
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
