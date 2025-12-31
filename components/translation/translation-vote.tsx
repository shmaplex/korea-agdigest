// components/translation/translation-vote.tsx
"use client";

import { Button } from "@/components/ui/button";
import { voteOnTranslation } from "@/lib/orbitdb/translations";

type Props = {
  translationId: string;
  voterDid: string;
};

export function TranslationVote({ translationId, voterDid }: Props) {
  async function vote(value: 1 | -1) {
    await voteOnTranslation({
      translationId,
      voterDid,
      value,
      createdAt: new Date().toISOString(),
    });
  }

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => vote(1)}
        aria-label="Upvote translation"
      >
        ▲
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => vote(-1)}
        aria-label="Downvote translation"
      >
        ▼
      </Button>
    </div>
  );
}
