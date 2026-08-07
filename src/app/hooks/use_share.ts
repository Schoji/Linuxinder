"use client";

import { useState } from "react";

import { Distro } from "../data/models/distro";

/**
 * Sharing a result. The button's label doubles as its own feedback, so the
 * label and the action that changes it belong to the same piece of state.
 */
export function useShare() {
  const [shareLabel, setShareLabel] = useState("Share");

  const share = async (distro: Distro) => {
    const url = `${window.location.origin}/?match=${distro.slug}`;
    const text = `Linuxinder matched me with ${distro.name}. "${distro.tagline}" 🚩 ${distro.red_flag}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: "Linuxinder", text, url });
        return;
      } catch (error) {
        // Dismissing the share sheet is not a failure - stay quiet.
        if ((error as Error)?.name === "AbortError") return;
        // Anything else: fall through to the clipboard.
      }
    }

    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setShareLabel("Link copied");
    } catch {
      setShareLabel("Copy failed");
    }
    window.setTimeout(() => setShareLabel("Share"), 2000);
  };

  return { shareLabel, share };
}
