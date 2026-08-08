"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Heart, Star, X } from "lucide-react";

import { Distro } from "../data/models/distro";
import { useMotionPresets } from "../hooks/use_motion_presets";
import { DECK_OFFSET, DECK_SCALE_STEP, ROTATE_DIVISOR } from "../lib/animation";
import DistroCard from "./DistroCard";
import SwipeCard from "./SwipeCard";
import ProgressRail from "./ProgressRail";

type Props = {
  distro: Distro | null;
  /** The next cards, in dealing order. Rendered behind the front one. */
  upcoming: Distro[];
  index: number;
  total: number;
  onLike: () => void;
  onPass: () => void;
  onSuperLike: () => void;
};

/**
 * The deck, and every gesture that happens on it. Nothing here knows how a
 * swipe is scored - it reports like, pass or super like and lets the caller
 * decide what that means.
 *
 * select-none covers the whole block, not just the card: holding a button long
 * enough to feel like a press is long enough for iOS to start selecting the
 * hint underneath it. Nothing here is text anyone wants to copy - it is a
 * control surface.
 */
const SwipeDeck = ({
  distro,
  upcoming,
  index,
  total,
  onLike,
  onPass,
  onSuperLike,
}: Props) => {
  const { reducedMotion, spring, buttonSpring, buttonTap, buttonHover } =
    useMotionPresets();

  // The card being thrown away lives on its own so the deck can advance at
  // once - waiting for the animation to finish is what made the next card
  // ungrabbable.
  const [exitingCard, setExitingCard] = useState<{
    distro: Distro;
    dir: 1 | -1;
    fromX: number;
    fromGlow: number;
  } | null>(null);

  // fromX and fromGlow come from the card itself, which is the only thing that
  // knows how far it was thrown and how lit its verdict border already was.
  const commit = (
    direction: "like" | "pass",
    fromX: number,
    fromGlow: number,
  ) => {
    if (distro === null) return;

    setExitingCard({
      distro,
      dir: direction === "like" ? 1 : -1,
      fromX, // pick up where the drag left off, so it does not jump
      fromGlow,
    });

    if (direction === "like") onLike();
    else onPass();
  };

  return (
    <div className="flex flex-col items-center w-(--card-width) select-none">
      {/* Read once, then dead weight on every card after it. Below 1150px of
          viewport it is also the difference between the buttons being on screen
          and under the fold, so short screens do without. */}
      <p className="text-muted text-base sm:text-lg text-center text-balance max-w-lg mb-6 [@media(max-height:1150px)]:hidden">
        {
          "Swipe through the distros. Be honest — we're building your type from every left and right."
        }
      </p>

      {/* Tight to the card: the bar describes the deck it sits on. */}
      <ProgressRail index={index} total={total} />

      <div className="relative w-full">
        {/* The real upcoming cards, deepest first so paint order matches depth.
            Rendering them here also decodes their screenshots ahead of time, so
            promoting one to the front costs no network trip. */}
        {[...upcoming].reverse().map((upcomingDistro, i) => {
          const depth = upcoming.length - i;

          return (
            <motion.div
              key={upcomingDistro.slug}
              aria-hidden="true"
              className="absolute inset-0"
              // initial={false}: a card entering the deck should appear at its
              // depth, not fly in. Animating depth is what removes the pop.
              initial={false}
              // Only the first card behind is offset into view. Scaling is
              // centre-origin, so it lifts the bottom edge too and y has to
              // clear that lift before anything shows; push far enough for a
              // second card and the strip is deep enough to expose the tag row
              // underneath. The second rides at the same spot, hidden, purely
              // to get its screenshot decoded before its turn.
              animate={{
                y: Math.min(depth, 1) * DECK_OFFSET,
                scale: 1 - depth * DECK_SCALE_STEP,
              }}
              // Enough to sit it behind, not so much that it goes black and the
              // stack reads as a shadow.
              style={{ filter: `brightness(${1 - depth * 0.18})` }}
              transition={spring}
            >
              <DistroCard distro={upcomingDistro} small={false} />
            </motion.div>
          );
        })}

        {distro && (
          // Keyed by slug so each card mounts fresh - a new element, and with
          // it a new motion value that starts at zero.
          <SwipeCard
            key={distro.slug}
            distro={distro}
            // Only the opening card: later cards are already decoded from
            // their turn in the deck behind.
            priority={index === 0}
            onCommit={commit}
          />
        )}

        {/* The thrown card, already detached from the deck. */}
        {exitingCard && (
          <motion.div
            key={`${exitingCard.distro.slug}-exit`}
            aria-hidden="true"
            className="absolute inset-0 z-10 pointer-events-none"
            // Tilts into the throw on the way out. Starting from the tilt the
            // drag had left it at is what keeps a swipe continuous; from a
            // button press that is level, and the tilt is the whole reason the
            // card reads as thrown rather than as deleted.
            initial={{
              x: exitingCard.fromX,
              rotate: exitingCard.fromX / ROTATE_DIVISOR,
              opacity: 1,
            }}
            animate={{
              x: exitingCard.dir * 900,
              rotate: exitingCard.dir * 22,
              opacity: 0,
            }}
            transition={
              reducedMotion ? { duration: 0 } : { duration: 0.45, ease: "easeOut" }
            }
            onAnimationComplete={() => setExitingCard(null)}
          >
            <DistroCard distro={exitingCard.distro} small={false} />
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-xl border-4"
              style={{
                borderColor: exitingCard.dir === 1 ? "#6ee7a0" : "#ec4899",
                boxShadow:
                  exitingCard.dir === 1
                    ? "0 0 60px 8px rgba(110,231,160,0.45)"
                    : "0 0 60px 8px rgba(236,72,153,0.45)",
              }}
              // Faster than the flight: the verdict should land while the card
              // is still on screen to read it against.
              initial={{ opacity: exitingCard.fromGlow }}
              animate={{ opacity: 1 }}
              transition={
                reducedMotion ? { duration: 0 } : { duration: 0.15, ease: "easeOut" }
              }
            />
          </motion.div>
        )}
      </div>

      {/* Has to clear the deck peeking out below the front card, and no more
          than that - this margin comes straight out of the screenshot. */}
      <div className="flex items-center gap-5 sm:gap-6 mt-6 sm:mt-8">
        {/* whileTap rather than active:scale-90: the class only ever had
            transition-colors to animate against, so the squish landed in a
            single frame and let go in a single frame. A spring gives the press
            somewhere to travel and something to come back from. */}
        <motion.button
          aria-label="Pass"
          whileHover={buttonHover}
          whileTap={buttonTap}
          transition={buttonSpring}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex justify-center items-center bg-[#232340] border border-[#2e2e4a] shadow-lg shadow-black/50 text-[#ec4899] transition-colors hover:border-[#ec4899] hover:shadow-[#ec4899]/30 cursor-pointer"
          onClick={() => commit("pass", 0, 0)}
        >
          <X size={26} strokeWidth={2.5} />
        </motion.button>

        {/* Smaller than the two it sits between, the way Tinder's own super
            like is - the size difference is what makes it read as the rare one
            rather than a third equal option. Blue for the same reason: it is
            the only control that is not part of the left/right pair. */}
        <motion.button
          aria-label={`Super like${distro ? ` ${distro.name}` : ""} and stop here`}
          title="Super like - ends the run right here"
          whileHover={buttonHover}
          whileTap={buttonTap}
          transition={buttonSpring}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex justify-center items-center bg-[#232340] border border-[#2e2e4a] shadow-lg shadow-black/50 text-[#38bdf8] transition-colors hover:border-[#38bdf8] hover:shadow-[#38bdf8]/30 cursor-pointer"
          onClick={onSuperLike}
        >
          <Star size={22} strokeWidth={2.5} className="fill-current" />
        </motion.button>

        <motion.button
          aria-label="Like"
          whileHover={buttonHover}
          whileTap={buttonTap}
          transition={buttonSpring}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex justify-center items-center bg-[#232340] border border-[#2e2e4a] shadow-lg shadow-black/50 text-[#6ee7a0] transition-colors hover:border-[#6ee7a0] hover:shadow-[#6ee7a0]/30 cursor-pointer"
          onClick={() => commit("like", 0, 0)}
        >
          <Heart size={26} strokeWidth={2.5} />
        </motion.button>
      </div>

      {/* Pass, star, like - the same order as the row above it, so each phrase
          sits over the control it describes. */}
      <p className="text-muted text-xs mt-3 px-4 text-center text-balance">
        drag left to pass ·{" "}
        <Star
          size={11}
          strokeWidth={2.5}
          className="inline align-baseline fill-current text-[#38bdf8]"
        />{" "}
        to stop here and match · drag right to like
      </p>
    </div>
  );
};

export default SwipeDeck;
