import { prisma } from "@/lib/server/prisma";

export default async function AdminPage() {
  const articles = await prisma.article.findMany({
    orderBy: { ingestedAt: "desc" },
  });

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Admin</h2>

      {articles.map((a) => (
        <div key={a.id} className="border p-3 rounded">
          <div className="font-medium">{a.titleKo}</div>
          <div className="flex gap-2 mt-2">
            {/* wire to server actions */}
            <span>Highlighted: {String(a.highlighted)}</span>
            <span>Promoted: {String(a.promoted)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
