"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  ExternalLink,
  Flag,
  Flame,
  PartyPopper,
  RotateCcw,
  Share2,
  Star,
} from "lucide-react";

import { Distro } from "../data/models/distro";
import { useMotionPresets } from "../hooks/use_motion_presets";
import { useShare } from "../hooks/use_share";
import Confetti from "./Confetti";
import DistroCard from "./DistroCard";

type Props = {
  winner: Distro;
  /** Second and third place, already ranked. Empty after a super like. */
  runnersUp: Distro[];
  superLiked: boolean;
  /** The line under the headline, worked out by whoever owns the tally. */
  verdict: string;
};

/**
 * The result. Two columns from lg up: the card is 672px inside a viewport
 * three times that wide, so stacking everything under it put the only ways off
 * this screen below the fold while ~1300px of background sat unused either
 * side. Grid rather than flex because the reading order differs per breakpoint
 * - headline, card, the rest in one column on a phone; card beside all three
 * on a desktop - and that is placement, not direction.
 */
const MatchScreen = ({ winner, runnersUp, superLiked, verdict }: Props) => {
  const { reducedMotion, buttonSpring, pillTap } = useMotionPresets();
  const { shareLabel, share } = useShare();

  return (
    <motion.div
      className="relative isolate grid justify-items-center gap-6 sm:gap-8 px-4 lg:grid-cols-[auto_minmax(0,28rem)] lg:items-center lg:justify-center lg:gap-x-12"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.2 }}
    >
      {/* The whole scene answers the match, not just the confetti. This soft
          flash briefly warms the page behind the content, then settles into a
          barely-visible halo instead of leaving the result visually flat. */}
      {!reducedMotion && (
        <motion.div
          className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_42%,rgba(255,74,88,0.24)_0%,rgba(255,115,84,0.10)_30%,transparent_68%)]"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.72 }}
          animate={{ opacity: [0, 0.95, 0.18], scale: [0.72, 1, 1.12] }}
          transition={{ duration: 1.45, times: [0, 0.35, 1], ease: "easeOut" }}
        />
      )}

      {/* self-end here and self-start on the block below. The card spans both
          rows and is taller than they are, so the spare height is split between
          them - left stretching, that gap opens up in the middle of the text.
          Pinning each to the row boundary closes it to the row gap and still
          leaves the pair centred against the card. */}
      <motion.div
        className="flex flex-col items-center lg:items-start gap-6 lg:col-start-2 lg:row-start-1 lg:justify-self-stretch lg:self-end"
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 220, damping: 20, delay: 0.18 }
        }
      >
        <motion.div
          className="relative flex items-center gap-2"
          initial={reducedMotion ? false : { scale: 0.78 }}
          animate={{ scale: 1 }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 310, damping: 14, delay: 0.2 }
          }
        >
          {!reducedMotion && <Confetti />}

          {/* Drops a step at lg: text-6xl plus the popper overruns a 28rem
              column and breaks the headline across two lines. */}
          <h1 className="text-4xl sm:text-6xl lg:text-5xl inline-block font-bold bg-linear-to-r from-[#ff4a58] to-[#ff7354] bg-clip-text text-transparent">
            It&apos;s a match!{" "}
          </h1>

          {/* bg-clip-text only paints text; a lucide icon is an SVG drawn with
              stroke, so the gradient has to be an SVG paint server. */}
          <svg width="0" height="0" className="absolute" aria-hidden="true">
            <defs>
              <linearGradient id="brand-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff4a58" />
                <stop offset="100%" stopColor="#ff7354" />
              </linearGradient>
            </defs>
          </svg>

          <motion.span
            className="shrink-0"
            initial={reducedMotion ? false : { rotate: -18, scale: 0.7 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 260, damping: 11, delay: 0.34 }
            }
          >
            <PartyPopper
              className="w-9 h-9 sm:w-12 sm:h-12 lg:w-10 lg:h-10"
              color="url(#brand-gradient)"
            />
          </motion.span>
        </motion.div>

        <motion.div
          className="flex items-center gap-3 w-(--card-width) max-w-xl lg:w-full lg:max-w-none px-4 py-3 sm:px-6 sm:py-4 rounded-2xl border border-[#2e2e4a] bg-[#1e1e35]"
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.4,
            delay: reducedMotion ? 0 : 0.42,
          }}
        >
          {superLiked ? (
            <Star size={20} className="shrink-0 fill-current text-[#38bdf8]" />
          ) : (
            <Flame size={20} className="shrink-0 text-[#ff4a58]" />
          )}
          <p className="flex-1 text-center lg:text-left text-sm sm:text-base text-muted">
            {verdict}
          </p>
        </motion.div>
      </motion.div>

      {/* Spans both text rows so it stays vertically centred against them
          however tall the verdict runs. */}
      <motion.div
        className="relative lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:self-center"
        initial={
          reducedMotion ? false : { opacity: 0, y: 52, scale: 0.82, rotate: -3 }
        }
        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 165, damping: 15, mass: 0.9, delay: 0.06 }
        }
      >
        {!reducedMotion && (
          <>
            <motion.div
              className="pointer-events-none absolute -inset-2 rounded-2xl border border-[#ff7354]/70"
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: [0, 0.7, 0], scale: [0.9, 1.02, 1.09] }}
              transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }}
            />
            <motion.div
              className="pointer-events-none absolute -inset-2 rounded-2xl border border-[#ff4a58]/45"
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: [0, 0.5, 0], scale: [0.9, 1.03, 1.14] }}
              transition={{ duration: 1.25, delay: 0.34, ease: "easeOut" }}
            />
          </>
        )}
        <DistroCard distro={winner} small={false} glow />
      </motion.div>

      <motion.div
        className="flex flex-col items-center lg:items-start gap-6 w-(--card-width) lg:w-full lg:col-start-2 lg:row-start-2 lg:self-start"
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 200, damping: 21, delay: 0.5 }
        }
      >
        {/* Same shape as the verdict box above the card, so the two read as a
            pair - that one says why it fits, this one says what you are
            signing up for. */}
        <div className="flex items-center gap-3 w-full max-w-xl lg:max-w-none px-4 py-3 sm:px-6 sm:py-4 rounded-2xl border border-[#2e2e4a] bg-[#1e1e35]">
          <Flag size={20} className="shrink-0 text-[#ec4899]" />
          <p className="flex-1 text-center lg:text-left text-sm sm:text-base text-muted">
            {winner.red_flag}
          </p>
        </div>

        {/* Play again leads on weight and position, not colour - the accent
            gradient belongs to the headline alone. Wraps rather than shrinks:
            three pills in a 28rem column would each lose their padding before
            they lost their line. */}
        <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 select-none">
          {/* A plain anchor, not Link: a same-route client navigation keeps the
              component mounted, so state and the drained deck would survive.
              The full document load is the reset. */}
          <motion.a
            href="/"
            whileTap={pillTap}
            transition={buttonSpring}
            className="inline-flex items-center gap-2 bg-foreground text-background font-semibold px-5 py-2.5 sm:px-7 sm:py-3 rounded-full cursor-pointer"
          >
            <RotateCcw size={18} />
            Play again
          </motion.a>
          <motion.button
            onClick={() => share(winner)}
            whileTap={pillTap}
            transition={buttonSpring}
            className="flex items-center gap-2 border border-[#3a3a5a] text-foreground font-semibold px-5 py-2.5 sm:px-7 sm:py-3 rounded-full hover:bg-white/5 cursor-pointer"
          >
            <Share2 size={18} />
            {shareLabel}
          </motion.button>
          <motion.a
            href={winner.website}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={pillTap}
            transition={buttonSpring}
            className="flex items-center gap-2 border border-[#3a3a5a] text-foreground font-semibold px-5 py-2.5 sm:px-7 sm:py-3 rounded-full hover:bg-white/5 cursor-pointer"
          >
            <ExternalLink size={18} />
            Visit website
          </motion.a>
        </div>

        {/* Nothing to rank after a super like, and the heading on its own over
            an empty row reads as a bug. */}
        {runnersUp.length > 0 && (
          <div className="flex flex-col items-center lg:items-start gap-3 w-full">
            <p className="text-muted text-sm">Runners-up</p>
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              {runnersUp.map((distro, i) => (
                <div
                  key={distro.slug}
                  className="flex items-center gap-3 w-full sm:flex-1 sm:min-w-0 p-2 rounded-xl border border-[#2e2e4a] bg-[#1e1e35]"
                >
                  <span className="shrink-0 w-5 text-center text-muted text-sm">
                    {i + 2}
                  </span>
                  <div className="relative w-14 h-10 shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={distro.screenshot_path}
                      alt={distro.name}
                      fill
                      // w-14. Without this the browser sizes the request off
                      // 100vw and pulls a 3840px screenshot into a 56px box.
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <span className="truncate text-sm font-semibold">
                    {distro.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default MatchScreen;
