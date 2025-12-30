import { getOrbitDB } from "./index";

export async function getArticleDB() {
  const orbitdb = await getOrbitDB();

  const db = await orbitdb.open("korea-ag-digest.articles", {
    type: "log",
    accessController: {
      write: ["*"] // tighten later
    }
  });

  await db.load();
  return db;
}
