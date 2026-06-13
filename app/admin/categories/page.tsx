import { prisma } from "@/lib/prisma";
import CategoryManager from "@/components/admin/CategoryManager";

export const dynamic = "force-dynamic";

export default async function AdminCategories() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { ads: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <h2 className="text-xl font-bold">Categories ({categories.length})</h2>
      <p className="mt-1 text-sm text-ink-soft">
        Add or remove the service categories shown across the site.
      </p>
      <div className="mt-4">
        <CategoryManager categories={categories} />
      </div>
    </div>
  );
}
