"use client";

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function RunDigestButton() {
  const [ingesting, setIngesting] = useState(false);
  const [ingestResult, setIngestResult] = useState<null | "success" | "error">(
    null,
  );

  async function runIngest() {
    try {
      setIngesting(true);
      setIngestResult(null);

      const res = await fetch("/api/ingest", { method: "POST" });
      if (!res.ok) throw new Error("Ingest failed");

      setIngestResult("success");

      // Refresh articles (optional, could also be handled by parent page)
      await fetch("/api/articles?limit=20");
    } catch (err) {
      console.error(err);
      setIngestResult("error");
    } finally {
      setIngesting(false);
    }
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
      <Button
        onClick={runIngest}
        disabled={ingesting}
        variant="secondary"
        className="shadow-lg hover:shadow-2xl transition"
      >
        {ingesting ? "Ingesting…" : "Run Digest"}
      </Button>

      {ingestResult === "success" && (
        <Alert className="mt-2">
          <AlertTitle>Ingest complete</AlertTitle>
          <AlertDescription>
            Sources were successfully processed.
          </AlertDescription>
        </Alert>
      )}
      {ingestResult === "error" && (
        <Alert variant="destructive" className="mt-2">
          <AlertTitle>Ingest failed</AlertTitle>
          <AlertDescription>Check server logs for details.</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
