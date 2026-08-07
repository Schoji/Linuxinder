"use client";

import { Flag } from "lucide-react";

import { Distro } from "../data/models/distro";
import DistroCard from "./DistroCard";

/**
 * Someone else's result, opened from a ?match= link. No verdict box and no
 * runners-up: both describe swipes we do not have, and the link only carries
 * the match itself.
 */
const SharedMatch = ({ distro }: { distro: Distro }) => (
  <div className="flex flex-col items-center gap-6">
    <p className="text-muted text-sm">Someone matched with</p>
    <h1 className="text-3xl sm:text-5xl font-bold text-center text-balance bg-linear-to-r from-[#ff4a58] to-[#ff7354] bg-clip-text text-transparent">
      {distro.name}
    </h1>

    <DistroCard distro={distro} small={false} priority />

    <div className="flex items-center gap-3 w-(--card-width) max-w-xl px-4 py-3 sm:px-6 sm:py-4 rounded-2xl border border-[#2e2e4a] bg-[#1e1e35]">
      <Flag size={20} className="shrink-0 text-[#ec4899]" />
      <p className="flex-1 text-center text-sm sm:text-base text-muted">
        {distro.red_flag}
      </p>
    </div>

    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
    <a
      href="/"
      className="inline-flex items-center bg-foreground text-background font-semibold px-7 py-3 rounded-full active:scale-95 cursor-pointer"
    >
      Find your own match
    </a>
  </div>
);

export default SharedMatch;
