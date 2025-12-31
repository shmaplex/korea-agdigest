import type { VoteEntry } from "@/types";

export function tallyVotes(translationId: string, votes: VoteEntry[]) {
  return votes
    .filter((v) => v.translationId === translationId)
    .reduce((sum, v) => sum + v.value, 0);
}
