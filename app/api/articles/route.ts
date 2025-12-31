// /api/articles/route.ts
import { prisma } from "@/lib/server/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const idsParam = url.searchParams.get("ids");
  let articles: any;

  if (idsParam) {
    const ids = idsParam.split(",");
    articles = await prisma.article.findMany({
      where: { id: { in: ids } },
      orderBy: { publishedAt: "desc" },
    });
  } else {
    const page = Number(url.searchParams.get("page") ?? 1);
    const limit = Number(url.searchParams.get("limit") ?? 20);
    articles = await prisma.article.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { publishedAt: "desc" },
    });
  }

  return new Response(JSON.stringify(articles), { status: 200 });
}
