// components/translation/community-translation.tsx
"use client";

import { useEffect, useState } from "react";
import { TranslationEditor } from "@/components/translation/translation-editor";
import { Card, CardContent } from "@/components/ui/card";
import { getBestTranslation } from "@/lib/translations";

export function CommunityTranslation({
  articleId,
  field,
  did,
  originalText,
}: {
  articleId: string;
  field: "title" | "body" | "summary";
  did: string;
  originalText: string;
}) {
  const [bestTranslation, setBestTranslation] = useState<any | null>(null);

  useEffect(() => {
    getBestTranslation(articleId, field).then(setBestTranslation);
  }, [articleId, field]);

  return (
    <section className="space-y-4 border-t pt-6">
      <h2 className="text-sm font-semibold text-muted-foreground">
        Community Translation
      </h2>

      {bestTranslation && (
        <Card>
          <CardContent className="p-4 text-sm leading-relaxed">
            {bestTranslation.text}
          </CardContent>
        </Card>
      )}

      {!bestTranslation && (
        <p className="text-sm text-muted-foreground">
          No community translation yet.
        </p>
      )}

      <TranslationEditor
        articleId={articleId}
        field={field}
        authorDid={did}
        originalText={originalText}
        currentText={bestTranslation?.text}
      />
    </section>
  );
}
