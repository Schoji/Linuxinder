"use client";

import { useSyncExternalStore } from "react";

import { distros } from "../data/distros";
import { Distro } from "../data/models/distro";

// Module scope so the identities stay stable across renders, which is what
// useSyncExternalStore requires. The URL never changes without a reload here,
// so there is nothing to subscribe to.
const subscribeNothing = () => () => {};
const readSharedSlug = () =>
  new URLSearchParams(window.location.search).get("match");
const readSharedSlugOnServer = () => null;

/**
 * The distro behind a ?match= link, or null on a normal visit.
 *
 * useSyncExternalStore rather than useSearchParams (which forces client
 * rendering up to a Suspense boundary) or an effect: the separate server
 * snapshot keeps hydration honest.
 */
export function useSharedMatch(): Distro | null {
  const slug = useSyncExternalStore(
    subscribeNothing,
    readSharedSlug,
    readSharedSlugOnServer,
  );

  if (slug === null) return null;
  return distros.find((distro) => distro.slug === slug) ?? null;
}
