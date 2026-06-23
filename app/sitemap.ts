import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch categories for dynamic URLs
  const categories = await prisma.category.findMany({
    select: { slug: true },
  });

  // Fetch featured ads for dynamic URLs
  const ads = await prisma.ad.findMany({
    where: { status: "APPROVED", featured: true },
    select: { id: true, updatedAt: true },
    take: 100,
  });

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: "https://wrkzone.com",
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: "https://wrkzone.com/ads",
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: "https://wrkzone.com/post",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://wrkzone.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://wrkzone.com/login",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://wrkzone.com/register",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Dynamic category routes
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `https://wrkzone.com/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  // Dynamic ad routes
  const adRoutes: MetadataRoute.Sitemap = ads.map((ad) => ({
    url: `https://wrkzone.com/ads/${ad.id}`,
    lastModified: ad.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...adRoutes];
}
