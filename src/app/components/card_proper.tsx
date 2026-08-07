import React from "react";
import { Distro } from "../data/models/distro";
import Image from "next/image";

const CardProper = ({ distro, small }: { distro: Distro; small: boolean }) => {
  // Tailwind only generates classes it can find as whole strings in the source,
  // so both variants are spelled out rather than built from pieces.
  const size = small
    ? {
        card: "w-md",
        titlebar: "px-3 py-2",
        dot: "w-2 h-2",
        controls: "w-8",
        name: "text-sm",
        age: "text-xs",
        tagline: "text-sm",
        body: "px-3 pt-3 pb-3",
        description: "text-xs",
        tag: "text-[10px] px-1.5 py-0.5",
      }
    : {
        card: "w-2xl",
        titlebar: "px-4 py-3",
        dot: "w-3 h-3",
        controls: "w-12",
        name: "text-xl",
        age: "text-base",
        tagline: "text-base",
        body: "px-5 pt-4 pb-4",
        description: "text-base",
        tag: "text-sm px-3 py-1",
      };

  return (
    // Shaped like a window rather than a photo card: the name lives in a title
    // bar of its own, so nothing has to sit on top of the screenshot. A hairline
    // border carries the edge - on a dark background a shadow alone is invisible.
    <div
      className={`${size.card} rounded-xl overflow-hidden dark:bg-[#232340] border border-[#3a3a5a] shadow-xl shadow-black/50`}
    >
      <div
        className={`flex items-center ${size.titlebar} bg-[#2a2a4a] border-b border-[#3a3a5a]`}
      >
        <div className={`flex gap-1.5 shrink-0 ${size.controls}`} aria-hidden="true">
          <span className={`${size.dot} rounded-full bg-[#4a4a70]`} />
          <span className={`${size.dot} rounded-full bg-[#4a4a70]`} />
          <span className={`${size.dot} rounded-full bg-[#4a4a70]`} />
        </div>
        <h1 className={`flex-1 text-center truncate ${size.name} font-semibold`}>
          {distro.name}{" "}
          <span className={`text-[#c4c4e0] font-normal ${size.age}`}>
            {new Date().getFullYear() - distro.release_date.getFullYear()} yo
          </span>
        </h1>
        {/* Mirrors the dots so the title sits optically centred, not shoved right. */}
        <div className={`shrink-0 ${size.controls}`} aria-hidden="true" />
      </div>

      {/* 3:2 measured across 100 candidate screenshots as the ratio with the
          smallest average mismatch. object-contain rather than cover: at 3:2
          more than half the sources would be cropped top and bottom, which is
          exactly where the panel and the dock live. Bars beat losing those. */}
      <div className="relative w-full aspect-3/2 bg-[#16162a]">
        {/* draggable={false} stops the browser's native image drag, which would
            otherwise swallow the pointer and the card would never move.
            Without sizes, fill defaults to 100vw and the browser fetches the
            3840px variant for a 672px box - that download is the swap stutter. */}
        <Image
          src={distro.screenshot_path}
          alt={`${distro.name} desktop`}
          fill={true}
          sizes={small ? "448px" : "672px"}
          draggable={false}
          className="absolute object-contain pointer-events-none select-none"
        />
      </div>

      {!small && (
        <div className={size.body}>
          {/* Italic because every tagline is written in the distro's own voice -
              it reads as something it says, not as a label about it. */}
          <p className={`${size.tagline} italic text-[#d8d8e8]`}>
            {distro.tagline}
          </p>
          <p className={`${size.description} mt-3`}>{distro.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {distro.tags.map((tag) => (
              <span
                key={tag}
                className={`inline-block bg-[#2e2e50] text-[#c4c4e0] ${size.tag} rounded-full`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardProper;
