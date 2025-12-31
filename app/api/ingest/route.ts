// app/api/ingest/route.ts

import { getViewerDid } from "@/lib/auth/getViewerDid";
import { hasRole } from "@/lib/auth/roles";
import { runIngestion } from "@/lib/ingest/run";

export async function POST() {
  const did = await getViewerDid();

  if (!hasRole(did, "admin")) {
    return new Response("Forbidden", { status: 403 });
  }

  await runIngestion();
  return Response.json({ ok: true });
}
