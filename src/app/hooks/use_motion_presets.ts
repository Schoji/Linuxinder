"use client";

import { useReducedMotion } from "motion/react";

/**
 * Every spring and press animation in one place, already collapsed to instant
 * for anyone who asked for reduced motion. Components read a preset rather
 * than testing reducedMotion at each call site, which is how the deck and the
 * controls used to drift apart.
 */
export function useMotionPresets() {
  const reducedMotion = useReducedMotion();

  const spring = reducedMotion
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 260, damping: 26 } as const);

  // Stiffer than the deck spring: a control has to answer under the finger,
  // where a card is allowed to take its time.
  const buttonSpring = reducedMotion
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 520, damping: 20 } as const);

  const buttonTap = reducedMotion ? undefined : { scale: 0.88 };
  const buttonHover = reducedMotion ? undefined : { scale: 1.06 };

  // Shallower on the pills: a round button can squash a long way and still
  // look like itself, a wide pill starts looking squeezed.
  const pillTap = reducedMotion ? undefined : { scale: 0.96 };

  return { reducedMotion, spring, buttonSpring, buttonTap, buttonHover, pillTap };
}
