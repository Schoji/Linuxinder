import type { MetadataRoute } from "next";

import { SITE_URL } from "./lib/site";

/**
 * Everything here is a joke, and there is nothing private to hide - so the
 * only thing worth saying is where the sitemap lives.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
