/**
 * Numbers the deck and the cards leaving it have to agree on. Any drift
 * between them shows up as a jump at the exact moment the eye is following a
 * card, so they live in one place rather than once per component.
 */

// Where a card sits while it waits its turn, and how much smaller each step
// further back it looks. A card promoted to the front starts from exactly
// these, so the promotion is one continuous move rather than a cut.
export const DECK_OFFSET = 24;
export const DECK_SCALE_STEP = 0.02;

// rotate = x / ROTATE_DIVISOR while dragging, so the thrown copy can pick the
// tilt up mid-flight instead of snapping back to level.
export const ROTATE_DIVISOR = 20;

// The verdict glow fades in between these two offsets. GLOW_FULL sits just
// under the narrowest throw that commits, so the verdict is fully lit by the
// time the card leaves rather than halfway through.
export const GLOW_START = 30;
export const GLOW_FULL = 100;

export const CONFETTI_COUNT = 26;
export const CONFETTI_COLOURS = ["#ff4a58", "#ff7354", "#6ee7a0", "#ec4899", "#c4c4e0"];
