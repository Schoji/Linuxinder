import Link from "next/link";
import { SearchX } from "lucide-react";

import Shell from "./components/Shell";

export default function NotFound() {
  return (
    <Shell>
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        <p className="text-muted text-sm font-mono">404</p>
        <h2 className="text-4xl sm:text-5xl font-bold bg-linear-to-r from-[#ff4a58] to-[#ff7354] bg-clip-text text-transparent">
          No match at this address
        </h2>
        <div className="flex items-center gap-3 max-w-xl px-6 py-4 rounded-2xl border border-[#2e2e4a] bg-[#1e1e35]">
          <SearchX size={20} className="shrink-0 text-[#ec4899]" />
          <p className="flex-1 text-center text-muted">
            Whatever lived here swiped left on you. Or the URL is wrong — that
            one is far more likely.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center bg-foreground text-background font-semibold px-7 py-3 rounded-full active:scale-95 cursor-pointer"
        >
          Back to the deck
        </Link>
      </div>
    </Shell>
  );
}
