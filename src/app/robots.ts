import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/"
  },
  sitemap: `${getSiteUrl()}/sitemap.xml`
});

export default robots;
