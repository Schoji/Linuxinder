"use client";

import { motion } from "motion/react";

import { useMotionPresets } from "../hooks/use_motion_presets";

/**
 * How far through the hand you are. One continuous rail rather than a segment
 * per card: segments only survive a short deck, and at 83 cards the gaps alone
 * came to 996px inside a 672px card, so every segment shrank to nothing and
 * the bar vanished entirely. A rail reads the same at 15 cards and at 200.
 */
const ProgressRail = ({ index, total }: { index: number; total: number }) => {
  const { reducedMotion } = useMotionPresets();

  return (
    <div className="flex items-center gap-3 w-full mb-4">
      <div className="h-2 flex-1 rounded-full bg-[#2e2e50] overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-linear-to-r from-[#ff4a58] to-[#ff7354]"
          initial={false}
          animate={{ width: `${((index + 1) / total) * 100}%` }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.3 }}
        />
      </div>
      {/* tabular-nums: the counter sits beside a moving bar and would otherwise
          reflow every time a digit changes width. */}
      <span className="text-muted text-sm shrink-0 tabular-nums">
        {index + 1}/{total}
      </span>
    </div>
  );
};

export default ProgressRail;
