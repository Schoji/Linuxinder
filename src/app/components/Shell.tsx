import type { ReactNode } from "react";

import GitHubStars from "./GitHubStars";

// The page chrome: background, top bar, bottom bar. Lives here rather than in
// layout.tsx because the error routes need the same frame around content that
// is not the deck, and duplicating three copies of it is how they drift apart.
const Shell = ({
  children,
  stars = null,
}: {
  children: ReactNode;
  /** Star count for the header button. Null hides the number, not the link. */
  stars?: number | null;
}) => {
  return (
    // The bars are h-16 and h-12, so the padding has to clear them before it
    // buys any gap. Kept tight on purpose: every rem here is a rem the card
    // cannot spend on its screenshot at 1080p.
    <div className="flex flex-col items-center justify-center flex-1 gap-6 sm:gap-8 pt-20 pb-4 sm:pt-24 sm:pb-16 font-sans bg-[#1a1a2e] bg-[radial-gradient(ellipse_at_top,#24243f_0%,#1a1a2e_60%)]">
      {/* The star button is pinned to the right rather than sitting in the
          flow, so the wordmark stays optically centred on the viewport instead
          of being pushed off by whatever is beside it. No `relative` needed:
          `fixed` already establishes the containing block. */}
      <header className="fixed top-0 z-10 w-full h-16 border-b border-b-[#2e2e4a] flex justify-center items-center text-2xl font-semibold backdrop-blur-md bg-[#1a1a2e]/60">
        <h1 className="text-2xl font-bold">
          <a href={"/"} className="flex items-center gap-3">
            {/* The icon carries its own gradient tile and rounding, so it goes
                in bare - the old flame needed a circle drawn around it.
                A plain img rather than next/image: the optimiser refuses SVG
                without dangerouslyAllowSVG, and there is nothing to optimise
                in a vector anyway. Same file the browser already fetches as
                the favicon. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icon.svg"
              alt=""
              aria-hidden="true"
              width={40}
              height={40}
              className="w-10 h-10 shrink-0"
            />
            <span>
              <span className="text-foreground">Linux</span>
              <span className="bg-linear-to-r from-[#ff4a58] to-[#ff7354] bg-clip-text text-transparent">
                inder
              </span>
            </span>
          </a>
        </h1>
        <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2">
          <GitHubStars stars={stars} />
        </div>
      </header>
      {children}
      {/* Static on phones. Pinned, it costs 3rem of a viewport that iOS Safari
          has already cut to ~715px with its own bars, and it spends it landing
          on the swipe controls - the one thing that must never be covered.
          mt-auto keeps it at the bottom when the deck happens to fit. */}
      <footer className="static mt-auto sm:mt-0 sm:fixed sm:bottom-0 z-10 w-full h-12 border-t border-t-[#2e2e4a] flex justify-center items-center backdrop-blur-md bg-[#1a1a2e]/60">
        {/* One <p>, not bare text beside a link: in a flex container a
            whitespace-only run is dropped and the space disappears. */}
        <p className="text-muted text-xs">
          Piotr Wittig · 2026 ·{" "}
          <a
            href="https://piotrwittig.com"
            className="text-foreground/70 underline underline-offset-4 decoration-[#3a3a5a] transition-colors hover:text-foreground hover:decoration-[#ff7354]"
          >
            piotrwittig.com
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Shell;
