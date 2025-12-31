// lib/translations/ranking.ts
import type { TranslationEntry, VoteEntry } from "@/types";

export function rankTranslations(
  translations: TranslationEntry[],
  votes: VoteEntry[],
  field: TranslationEntry["field"],
) {
  const voteTotals = new Map<string, number>();

  for (const v of votes) {
    voteTotals.set(
      v.translationId,
      (voteTotals.get(v.translationId) ?? 0) + v.value,
    );
  }

  return translations
    .filter((t) => t.field === field)
    .sort((a, b) => {
      const av = voteTotals.get(a.id) ?? 0;
      const bv = voteTotals.get(b.id) ?? 0;
      return bv - av || Date.parse(b.createdAt) - Date.parse(a.createdAt);
    })[0];
}
