import { prisma } from "@/lib/prisma";
import AdvertisementManager from "@/components/admin/AdvertisementManager";

export const dynamic = "force-dynamic";

export default async function AdminAdvertisements() {
  const ads = await prisma.advertisement.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h2 className="text-xl font-bold">Banner advertisements</h2>
      <p className="mt-1 text-sm text-ink-soft">
        Promotional banners shown on the home page, sidebar and listings.
      </p>
      <div className="mt-4">
        <AdvertisementManager ads={ads} />
      </div>
    </div>
  );
}
