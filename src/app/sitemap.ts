import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { PROJECTS } from "@/lib/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://alhejaz.sa";

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/properties",
    "/projects",
    "/media",
    "/contact",
    "/privacy",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const { SERVICES } = await import("@/lib/services");
  const serviceRoutes = SERVICES.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const projectRoutes = PROJECTS.map((project) => ({
    url: `${siteUrl}/projects/${project.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
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

    return [
      ...staticRoutes,
      ...serviceRoutes,
      ...projectRoutes,
      ...propertyRoutes,
    ];
  } catch {
    return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
  }
}
