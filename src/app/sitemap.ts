import type { MetadataRoute } from "next";

import { SITE_URL } from "./lib/site";

/**
 * One page. A ?match= link is the same route with a query string, and query
 * strings do not belong in a sitemap - they would all resolve to this entry
 * anyway, and listing 83 of them is how a one-page site looks like spam.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
