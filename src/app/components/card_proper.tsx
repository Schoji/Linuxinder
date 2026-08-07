import React from "react";
import { Distro } from "../data/models/distro";
import Image from "next/image";

const CardProper = ({ distro, small }: { distro: Distro; small: boolean }) => {
  // Tailwind only generates classes it can find as whole strings in the source,
  // so both variants are spelled out rather than built from pieces.
  const size = small
    ? {
        card: "w-md",
        overlay: "h-1/2 pl-3 pb-3",
        name: "text-lg",
        age: "text-sm",
        tagline: "text-sm",
        body: "px-3 pt-3 pb-3",
        description: "text-xs",
        tag: "text-[10px] px-1.5 py-0.5",
      }
    : {
        card: "w-2xl",
        overlay: "h-2/5 pl-5 pb-4",
        name: "text-3xl",
        age: "text-2xl",
        tagline: "text-base",
        body: "px-5 pt-5 pb-4",
        description: "text-base",
        tag: "text-sm px-3 py-1",
      };

  return (
    // A hairline border carries the edge; on a dark background a shadow alone is
    // invisible, so it only adds depth underneath rather than defining the shape.
    <div
      className={`${size.card} rounded-xl dark:bg-[#232340] border border-[#3a3a5a] shadow-xl shadow-black/50`}
    >
      {/* A fixed ratio instead of a fixed height, so the frame keeps its shape
          at both card widths. object-cover crops the screenshot to fill it -
          without it Image/fill stretches the picture out of proportion. */}
      <div className="relative w-full aspect-3/2 rounded-tr-xl rounded-tl-xl overflow-hidden">
        {/* draggable={false} stops the browser's native image drag, which would
            otherwise swallow the pointer and the card would never move. */}
        {/* Without sizes, fill defaults to 100vw and the browser fetches the
            3840px variant for a 672px box - that download is the swap stutter. */}
        <Image
          src={distro.screenshot_path}
          alt={distro.name}
          fill={true}
          sizes={small ? "448px" : "672px"}
          draggable={false}
          className="absolute object-cover pointer-events-none select-none"
        />
        {/* justify-end pins the text to the bottom, where the ramp is darkest.
            Starting from the top put it in the transparent part, on the picture. */}
        <div
          className={`absolute bottom-0 left-0 w-full ${size.overlay} bg-linear-to-t from-black via-black/70 to-transparent flex flex-col justify-end gap-1`}
        >
          <h1 className={`${size.name} font-semibold`}>
            {distro.name}{" "}
            <span className={`text-[#c4c4e0] font-normal ${size.age}`}>
              {new Date().getFullYear() - distro.release_date.getFullYear()} yo
            </span>
          </h1>
          {/* Italic because every tagline is written in the distro's own voice -
              it reads as something it says, not as a label about it. */}
          <p className={`${size.tagline} italic text-[#d8d8e8]`}>
            {distro.tagline}
          </p>
        </div>
      </div>
      {!small && (
        <div className={size.body}>
          <p className={size.description}>{distro.description}</p>
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
