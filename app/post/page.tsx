import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import PostAdForm from "@/components/PostAdForm";

export const dynamic = "force-dynamic";

export default async function PostPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login?callbackUrl=/post");
  }

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, icon: true },
  });

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-peach-100 px-4 py-1.5 text-sm font-semibold text-sun-600 ring-1 ring-peach-200">
          📣 Post a new ad
        </span>
        <h1 className="mt-4 text-3xl font-extrabold">List your service</h1>
        <p className="mt-1 text-ink-soft">
          Fill in the details below to start getting hired by local customers.
        </p>
      </div>
      <PostAdForm categories={categories} />
    </div>
  );
}
