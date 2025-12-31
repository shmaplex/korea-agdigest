// types/translations.ts
export type TranslationEntry = {
  id: string;
  articleId: string;
  field: "title" | "summary" | "body";
  lang: "en";
  text: string;
  authorDid: string;
  createdAt: string;
};
