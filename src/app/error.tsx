"use client";

import { useEffect } from "react";
import { Flag, RotateCcw } from "lucide-react";

import Shell from "./components/Shell";

// Runtime errors below the root layout. The frame stays, so a crash still looks
// like the site rather than like a blank tab.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Shell>
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold bg-linear-to-r from-[#ff4a58] to-[#ff7354] bg-clip-text text-transparent">
          It&apos;s not you, it&apos;s the kernel panic
        </h2>
        <div className="flex items-center gap-3 max-w-xl px-6 py-4 rounded-2xl border border-[#2e2e4a] bg-[#1e1e35]">
          <Flag size={20} className="shrink-0 text-[#ec4899]" />
          <p className="flex-1 text-center text-muted">
            Something broke on our side while dealing the deck. The distros are
            fine. This page is not.
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-3">
          {/* reset() re-renders this segment in place - the deck is rebuilt from
              scratch either way, since none of its state survived the throw. */}
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-foreground text-background font-semibold px-7 py-3 rounded-full active:scale-95 cursor-pointer"
          >
            <RotateCcw size={18} />
            Try again
          </button>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/"
            className="flex items-center gap-2 border border-[#3a3a5a] text-foreground font-semibold px-7 py-3 rounded-full hover:bg-white/5 active:scale-95 cursor-pointer"
          >
            Back to the deck
          </a>
        </div>
        {/* The only thing worth quoting: it is what a server log can be grepped
            for. The message itself is redacted in production anyway. */}
        {error.digest && (
          <p className="text-muted text-xs font-mono">error {error.digest}</p>
        )}
      </div>
    </Shell>
  );
}
