import React from "react";
import { Distro } from "../data/models/distro";
import Image from "next/image";

const DistroCard = ({
  distro,
  small,
  priority = false,
  glow = false,
}: {
  distro: Distro;
  small: boolean;
  // The one card that is the LCP: the first of the deck, or a shared match.
  // Everything else stays lazy so the deck preload does not fight it.
  priority?: boolean;
  // Accent halo for the winning card. Has to live in the same box-shadow list
  // as the drop shadow: on a wrapper it gets painted over by this element's
  // own shadow, which is offset downward and swallows the bottom of the halo.
  glow?: boolean;
}) => {
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
        // Width comes from --card-width, which trades image size for the room
        // the swipe controls need below it. Everything else steps at sm so the
        // body does not eat the screen once the card is only 94vw wide.
        card: "w-(--card-width)",
        titlebar: "px-3 py-2 sm:px-4 sm:py-3",
        dot: "w-2 h-2 sm:w-3 sm:h-3",
        controls: "w-8 sm:w-12",
        name: "text-base sm:text-xl",
        age: "text-sm sm:text-base",
        tagline: "text-sm sm:text-base",
        // Deeper at the bottom than the sides on purpose: the card behind is
        // offset down into this strip, and anything shallower would put its
        // tag row on screen underneath the front card.
        body: "px-4 pt-3 pb-5 sm:px-5 sm:pt-4 sm:pb-6",
        description: "text-sm sm:text-base",
        tag: "text-xs px-2 py-0.5 sm:text-sm sm:px-3 sm:py-1",
      };

  return (
    // Shaped like a window rather than a photo card: the name lives in a title
    // bar of its own, so nothing has to sit on top of the screenshot. A hairline
    // border carries the edge - on a dark background a shadow alone is invisible.
    <div
      className={`${size.card} rounded-xl overflow-hidden bg-[#232340] border border-[#3a3a5a] ${
        glow
          ? // Halo first so it paints above the drop shadow, and spread 0 rather
            // than negative so it keeps its width around the corners too.
            "shadow-[0_0_40px_0_rgba(255,74,88,0.55),0_8px_20px_-12px_rgba(0,0,0,0.6)]"
          : // Deliberately tight. shadow-xl reaches ~40px below the card and the
            // buttons sit 24px under it, so the card looked stacked on top of
            // them. The border already defines the edge; this only adds depth.
            "shadow-[0_8px_20px_-12px_rgba(0,0,0,0.6)]"
      }`}
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
      {/* Letterbox bars carry the card's own colour rather than a darker one:
          at #16162a they read as a second frame inside the window, and the eye
          counts that as an edge the design never meant to draw. */}
      <div className="relative w-full aspect-3/2 bg-[#232340]">
        {/* draggable={false} stops the browser's native image drag, which would
            otherwise swallow the pointer and the card would never move.
            Without sizes, fill defaults to 100vw and the browser fetches the
            3840px variant for a 672px box - that download is the swap stutter. */}
        <Image
          src={distro.screenshot_path}
          alt={`${distro.name} desktop`}
          fill={true}
          sizes={small ? "448px" : "672px"}
          // A screenshot is not a photograph. What the eye checks first is the
          // panel and the menu, which is 11px text resampled down to about a
          // third of its size - the default quality of 75 smears exactly that
          // and leaves the card looking soft on a 1080p screen.
          quality={90}
          priority={priority}
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

export default DistroCard;
