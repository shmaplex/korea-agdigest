// app/api/articles/[id]/flair/route.ts
import { prisma } from "@/lib/server/prisma";

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { flair } = await req.json();

  await prisma.article.update({
    where: { id: params.id },
    data: { flair },
  });

  return Response.json({ ok: true });
}
