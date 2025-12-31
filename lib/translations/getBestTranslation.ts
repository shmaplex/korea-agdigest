// lib/translations/getBestTranslation.ts
import { getTranslations, getVotes } from "@/lib/orbitdb/translations";
import { rankTranslations } from "@/lib/translations/ranking";

export async function getBestTranslation(articleId: string, field: any) {
  const [translations, votes] = await Promise.all([
    getTranslations(articleId),
    getVotes(articleId),
  ]);

  return rankTranslations(translations, votes, field);
}
