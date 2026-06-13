import Link from "next/link";
import { formatPrice, timeAgo } from "@/lib/utils";

type AdCardData = {
  id: string;
  title: string;
  description: string;
  price: number | null;
  priceType: string;
  city: string;
  area: string | null;
  image: string | null;
  featured: boolean;
  createdAt: Date | string;
  category: { name: string; icon: string; color: string };
};

export default function AdCard({ ad }: { ad: AdCardData }) {
  return (
    <Link
      href={`/ads/${ad.id}`}
      className="card-lift group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-peach-200/80 shadow-sm"
    >
      <div className="relative h-44 overflow-hidden">
        {ad.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={ad.image}
            alt={ad.title}
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-6xl"
            style={{
              background: `linear-gradient(135deg, ${ad.category.color}22, ${ad.category.color}44)`,
            }}
          >
            {ad.category.icon}
          </div>
        )}
        {ad.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-coral-500 px-2.5 py-1 text-[11px] font-bold text-white shadow">
            ⭐ Featured
          </span>
        )}
        <span
          className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold text-white shadow"
          style={{ background: ad.category.color }}
        >
          {ad.category.icon} {ad.category.name}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-1 font-bold text-ink group-hover:text-sun-600 transition">
          {ad.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{ad.description}</p>

        <div className="mt-3 flex items-center gap-1 text-sm text-ink-soft">
          <span>📍</span>
          <span className="truncate">
            {ad.area ? `${ad.area}, ` : ""}
            {ad.city}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-peach-100 pt-3">
          <span className="font-extrabold text-sun-600">
            {formatPrice(ad.price, ad.priceType)}
          </span>
          <span className="text-xs text-ink-soft">{timeAgo(ad.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
}
