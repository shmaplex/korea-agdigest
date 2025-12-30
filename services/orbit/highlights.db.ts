// services/orbit/highlights.db.ts
import { getOrbitDB } from "./index";

export async function getHighlightDB() {
  const orbitdb = await getOrbitDB();

  const db = await orbitdb.open("korea-ag-digest.signals", {
    type: "keyvalue"
  });

  await db.load();
  return db;
}
