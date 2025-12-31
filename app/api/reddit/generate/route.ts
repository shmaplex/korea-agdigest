// app/api/reddit/generate/route.ts
import { formatRedditPost } from "@/lib/reddit";

export async function POST(req: Request) {
  const { articleId } = await req.json();
  const content = await formatRedditPost(articleId);
  return Response.json({ content });
}
