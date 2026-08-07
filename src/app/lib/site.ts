/**
 * The deployed origin. Absolute URLs are unavoidable for Open Graph, robots
 * and the sitemap - a relative one there points at whatever host scraped it.
 * Vercel sets VERCEL_PROJECT_PRODUCTION_URL on every deploy, so preview builds
 * and the production build agree without anything being hardcoded twice.
 */
export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://linuxinder.vercel.app";

export const SITE_NAME = "Linuxinder";

export const SITE_TITLE = "Linuxinder — Tinder, but for Linux distributions";

export const SITE_DESCRIPTION =
  "Swipe right on rolling releases. Swipe left on anything that ships GNOME 3. Find the distro that finally understands you.";
