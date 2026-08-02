import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://alhejaz.sa";

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/properties",
    "/media",
    "/contact",
    "/privacy",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  try {
    const properties = await prisma.property.findMany({
      select: { id: true, updatedAt: true },
    });

    const propertyRoutes = properties.map((property) => ({
      url: `${siteUrl}/properties/${property.id}`,
      lastModified: property.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...propertyRoutes];
  } catch {
    return staticRoutes;
  }
}
