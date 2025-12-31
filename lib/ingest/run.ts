// lib/ingest/run.ts
import Parser from "rss-parser";
import { SOURCES } from "@/lib/sources";
import { normalizeArticle } from "./normalize";
// import { OrbitDBArticleStore } from "./stores/orbitdb-article-store";
// import { DualArticleStore } from "./stores/dual-article-store";
import { PrismaArticleStore } from "./stores/prisma-article-store";

const parser = new Parser();

// TEMP: Prisma only
const store = new PrismaArticleStore();

// FUTURE: dual write
// const store = new DualArticleStore([
//   new PrismaArticleStore(),
//   new OrbitDBArticleStore(orbitDbInstance),
// ]);

export async function runIngestion() {
  for (const source of SOURCES) {
    try {
      const feed = await parser.parseURL(source.url);

      for (const item of feed.items) {
        if (!item.link || !item.title || !item.pubDate) continue;

        const base = normalizeArticle(item, source);
        const override = source.normalize?.(item) ?? {};
        const article = { ...base, ...override };

        await store.upsert(article);
      }
    } catch (err) {
      console.error(`Failed to ingest ${source.name}`, err);
    }
  }
}
