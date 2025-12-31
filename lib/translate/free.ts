// lib/translate/free.ts
export async function translateKoToEn(text: string) {
  const res = await fetch("https://libretranslate.com/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: text,
      source: "ko",
      target: "en",
      format: "text",
    }),
  });

  const data = await res.json();
  return data.translatedText as string;
}
