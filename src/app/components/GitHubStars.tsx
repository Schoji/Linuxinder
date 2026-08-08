"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { Star } from "lucide-react";

import { useMotionPresets } from "../hooks/use_motion_presets";
import { REPO_URL } from "../lib/github";

/**
 * lucide dropped its brand icons, so the mark is inline rather than a new
 * dependency for one glyph. Filled, not stroked - GitHub's own mark is a solid
 * shape and a stroked approximation of it reads as a different logo.
 */
const GitHubMark = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    className="shrink-0"
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
  </svg>
);

/** 1200 -> "1.2k". Four digits in a 64px slot is how a header starts wrapping. */
function format(n: number) {
  if (n < 1000) return String(n);
  return `${(n / 1000).toFixed(n < 10_000 ? 1 : 0)}k`;
}

/**
 * Link to the repo that doubles as its star count.
 *
 * The number counts up from zero once, on mount. It is the only motion here
 * that is not a response to the pointer, and it exists because a number that
 * animates reads as live rather than as a screenshot of a number.
 */
const GitHubStars = ({ stars }: { stars: number | null }) => {
  const { reducedMotion, buttonSpring } = useMotionPresets();

  const count = useMotionValue(0);
  const shown = useTransform(count, (v) => format(Math.round(v)));
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (stars === null) return;
    if (reducedMotion) {
      count.set(stars);
      return;
    }
    const controls = animate(count, stars, { duration: 0.9, ease: "easeOut" });
    return () => controls.stop();
  }, [stars, count, reducedMotion]);

  return (
    <motion.a
      href={REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        stars === null
          ? "Linuxinder on GitHub"
          : `Linuxinder on GitHub, ${stars} stars`
      }
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      // Deliberately not scaled. A scale of 1.05 turns the 1px ring into
      // 1.05px: on the straight top and bottom that is one solid row plus a 5%
      // ghost, while around the rounded ends the same width smears diagonally
      // across two pixels at far higher coverage - so the ends read as a
      // heavier, more saturated orange than the edges between them. Promoting
      // the element to its own layer does not help, because the layer is still
      // rasterised at the scaled size. Only whole-pixel movement keeps the ring
      // even, so hover is carried by colour and press by a 1px nudge.
      whileTap={reducedMotion ? undefined : { y: 1 }}
      transition={buttonSpring}
      className="flex items-center gap-2 h-9 pl-3 pr-1 rounded-full border border-[#3a3a5a] bg-[#232340] text-sm font-semibold text-foreground transition-colors hover:border-[#ff7354] hover:bg-[#2a2a4d] cursor-pointer"
    >
      <GitHubMark />
      <span className="hidden sm:inline">Star</span>

      {stars !== null && (
        <span className="flex items-center gap-1 h-7 px-2 rounded-full bg-[#1a1a2e] border border-[#2e2e4a]">
          <motion.span
            aria-hidden="true"
            className="shrink-0 text-[#ffc857]"
            // The star fills and tips over on hover. A rotation on its own
            // reads as a glitch; filling it is what makes it read as the thing
            // the button is asking you to do.
            animate={
              reducedMotion ? undefined : { rotate: hovered ? 72 : 0 }
            }
            transition={buttonSpring}
          >
            <Star
              size={14}
              strokeWidth={2.5}
              className={hovered ? "fill-current" : ""}
            />
          </motion.span>
          {/* tabular-nums so the pill does not resize while the count rolls. */}
          <motion.span className="tabular-nums text-xs">{shown}</motion.span>
        </span>
      )}
    </motion.a>
  );
};

export default GitHubStars;
