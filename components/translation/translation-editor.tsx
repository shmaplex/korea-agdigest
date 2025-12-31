// components/translation/translation-editor.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { sha256 } from "@/lib/crypto";
import { submitTranslation } from "@/lib/orbitdb/translations";

type Props = {
  articleId: string;
  field: "title" | "summary" | "body";
  authorDid: string;
  originalText: string;
  currentText?: string;
};

export function TranslationEditor({
  articleId,
  field,
  authorDid,
  originalText,
  currentText,
}: Props) {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (currentText) setText(currentText);
  }, [currentText]);

  async function submit() {
    if (!text.trim()) return;

    setSubmitting(true);

    const id = await sha256(text);

    await submitTranslation({
      id,
      articleId,
      field,
      lang: "en",
      text,
      authorDid,
      createdAt: new Date().toISOString(),
    });

    setSubmitting(false);
  }

  return (
    <div className="space-y-2">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Improve or correct the English translation…"
        className="text-sm"
      />

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Source language text shown above for reference
        </p>

        <Button size="sm" onClick={submit} disabled={submitting}>
          Submit translation
        </Button>
      </div>
    </div>
  );
}
