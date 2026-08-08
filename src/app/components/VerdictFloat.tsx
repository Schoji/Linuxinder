"use client";

import { motion } from "motion/react";
import { Heart, X } from "lucide-react";

type Props = {
  kind: "like" | "pass";
  /** Fired once the float is over, so the caller can drop it from its list. */
  onDone: () => void;
};

/**
 * The little icon that lifts off a control and fades, confirming the press.
 *
 * It exists because the buttons are the one way to swipe that has no physics
 * of its own - a drag already tells you what you did by throwing the card, and
 * a tap did not. It rises rather than bursts, so it never competes with the
 * card leaving beside it.
 *
 * pointer-events-none matters: this sits directly over the control that
 * spawned it, and a second press has to reach the button, not the decoration.
 */
const VerdictFloat = ({ kind, onDone }: Props) => {
  const Icon = kind === "like" ? Heart : X;
  const colour = kind === "like" ? "#6ee7a0" : "#ec4899";

  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
      style={{ color: colour }}
      initial={{ y: 0, opacity: 0.9, scale: 0.7 }}
      animate={{ y: -64, opacity: 0, scale: 1.35 }}
      // Slower than the press it answers, so the eye has time to follow it up
      // and away rather than seeing it blink.
      transition={{ duration: 0.85, ease: "easeOut" }}
      onAnimationComplete={onDone}
    >
      <Icon
        size={26}
        strokeWidth={2.5}
        className={kind === "like" ? "fill-current" : ""}
      />
    </motion.span>
  );
};

export default VerdictFloat;
