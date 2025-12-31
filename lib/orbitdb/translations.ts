// lib/orbitdb/translations.ts
import type { LogEntry } from "@orbitdb/core";
import type { TranslationEntry, VoteEntry } from "@/types";
import { getOrbitDB } from "./client";

export async function submitTranslation(entry: TranslationEntry) {
  const orbitdb = await getOrbitDB();
  const db = await orbitdb.open(`translations.article.${entry.articleId}`, {
    type: "log",
  });

  await db.add(entry);
}

export async function voteOnTranslation(vote: VoteEntry) {
  const orbitdb = await getOrbitDB();
  const db = await orbitdb.open(`votes.translation.${vote.translationId}`, {
    type: "log",
  });

  await db.add(vote);
}

export async function getTranslations(articleId: string) {
  const orbitdb = await getOrbitDB();
  const db = await orbitdb.open(`translations.article.${articleId}`, {
    type: "log",
  });

  return db
    .iterator({ limit: -1 })
    .collect()
    .map((e: any) => e.payload.value);
}

export async function getVotes(articleId: string) {
  const orbitdb = await getOrbitDB();
  const db = await orbitdb.open(`votes.translation.${articleId}`, {
    type: "log",
  });

  return db
    .iterator({ limit: -1 })
    .collect()
    .map((e: any) => e.payload.value);
}
