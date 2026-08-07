"use client";

import { motion } from "motion/react";

import { CONFETTI_COLOURS, CONFETTI_COUNT } from "../lib/animation";

/**
 * The burst behind the match headline. Positions come from the index, not
 * Math.random(): the React Compiler is on and may re-run render, and a fresh
 * spread on every pass would make the burst twitch.
 *
 * The caller decides whether this runs at all - there is no reduced-motion
 * check here, because a burst collapsed to zero duration is still a burst.
 */
const Confetti = () => (
  <div className="pointer-events-none absolute inset-0" aria-hidden="true">
    {Array.from({ length: CONFETTI_COUNT }, (_, i) => {
      const angle = (i / CONFETTI_COUNT) * Math.PI * 2;
      const distance = 150 + (i % 5) * 45;

      return (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2 w-2 h-3 rounded-xs"
          style={{
            backgroundColor: CONFETTI_COLOURS[i % CONFETTI_COLOURS.length],
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
          animate={{
            x: Math.cos(angle) * distance,
            // +90: gravity, so the burst falls rather than hanging
            y: Math.sin(angle) * distance + 90,
            opacity: 0,
            rotate: (i % 2 === 0 ? 1 : -1) * 420,
            scale: 0.5,
          }}
          transition={{ duration: 1.5 + (i % 3) * 0.25, ease: "easeOut" }}
        />
      );
    })}
  </div>
);

export default Confetti;
