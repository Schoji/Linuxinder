"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, type PanInfo } from "motion/react";

import { Distro } from "../data/models/distro";
import { useMotionPresets } from "../hooks/use_motion_presets";
import { DECK_OFFSET, DECK_SCALE_STEP, GLOW_FULL, GLOW_START } from "../lib/animation";
import DistroCard from "./DistroCard";

type Props = {
  distro: Distro;
  /** The opening card is what LCP measures. */
  priority: boolean;
  /** fromX and fromGlow hand the thrown copy the exact state it flies out from. */
  onCommit: (direction: "like" | "pass", fromX: number, fromGlow: number) => void;
};

/**
 * The card you can actually grab, and every value that only means something
 * while it is on screen.
 *
 * Those values live here rather than in the deck for a reason. Constraints of
 * {left: 0, right: 0} make every drag elastic, so releasing one starts a
 * spring back to zero that carries the throw's velocity - and Motion starts it
 * after onDragEnd returns, so resetting x by hand there does not survive. A
 * deck-level x is still the same object once the next card mounts, so that
 * spring played out on the new card and threw it in from the side it was
 * swiped to. One motion value per card, created on mount at zero, is what
 * makes that impossible rather than merely unlikely.
 */
const SwipeCard = ({ distro, priority, onCommit }: Props) => {
  const { spring } = useMotionPresets();

  // x is the live offset; rotate is derived from it so the card tilts into the
  // throw rather than sliding flat.
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-400, 400], [-20, 20]);

  // Verdict glow: fades in as the card crosses toward either threshold. Tops
  // out just under the narrowest throw that commits, so the verdict is fully
  // lit by the time the card leaves rather than halfway through.
  const passGlow = useTransform(x, [-GLOW_FULL, -GLOW_START], [1, 0]);
  const likeGlow = useTransform(x, [GLOW_START, GLOW_FULL], [0, 1]);

  const ref = useRef<HTMLDivElement>(null);

  const commit = (direction: "like" | "pass") => {
    const fromX = x.get();
    // The card being replaced has its verdict border lit to exactly this much.
    // A button press starts at 0 and lights it on the way out; a drag hands
    // over mid-glow, and starting anywhere else is a visible flash.
    const fromGlow = Math.min(
      1,
      Math.max(0, (Math.abs(fromX) - GLOW_START) / (GLOW_FULL - GLOW_START)),
    );
    onCommit(direction, fromX, fromGlow);
  };

  const onDragEnd = (_event: unknown, info: PanInfo) => {
    // A share of the card rather than a flat 120px: the same throw was 18% of
    // a 672px desktop card and a third of the way across a 367px phone one,
    // which is most of what made swiping on a phone feel like work.
    const width = ref.current?.offsetWidth ?? 672;
    const threshold = Math.min(120, width * 0.28);

    if (info.offset.x > threshold) commit("like");
    else if (info.offset.x < -threshold) commit("pass");
    // Below the threshold dragConstraints springs it back on its own.
  };

  return (
    <motion.div
      ref={ref}
      // touch-none! has to win against an inline style: Motion writes
      // touch-action: pan-y itself for drag="x", which hands the browser every
      // gesture with any vertical component at all - on iOS that is most of
      // them, and once the scroller has taken a gesture it never gives it back.
      // The card owns what happens on the card; the page still scrolls from
      // anywhere else.
      className="relative cursor-grab active:cursor-grabbing select-none touch-none!"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      dragMomentum={false}
      style={{ x, rotate }}
      // Exactly where it was sitting as the first card of the deck, so
      // promotion is one continuous move rather than a cut.
      initial={{ y: DECK_OFFSET, scale: 1 - DECK_SCALE_STEP }}
      animate={{ y: 0, scale: 1 }}
      transition={spring}
      onDragEnd={onDragEnd}
    >
      <DistroCard distro={distro} small={false} priority={priority} />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl border-4 border-[#ec4899]"
        style={{
          opacity: passGlow,
          boxShadow: "0 0 60px 8px rgba(236,72,153,0.45)",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl border-4 border-[#6ee7a0]"
        style={{
          opacity: likeGlow,
          boxShadow: "0 0 60px 8px rgba(110,231,160,0.45)",
        }}
      />
    </motion.div>
  );
};

export default SwipeCard;
