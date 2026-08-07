import { Flame } from "lucide-react";

import Card from "./components/card";

export default function Home() {
  return (
    // The bars are h-16, so padding has to exceed 4rem to leave any gap at all:
    // pt-32/pb-24 clears them and still leaves 4rem on top, 2rem at the bottom.
    <div className="flex flex-col items-center justify-center flex-1 gap-8 pt-32 pb-24 font-sans bg-zinc-50 bg-[radial-gradient(ellipse_at_top,#ffffff_0%,#fafafa_60%)] dark:bg-[#1a1a2e] dark:bg-[radial-gradient(ellipse_at_top,#24243f_0%,#1a1a2e_60%)]">
      <div className="fixed top-0 z-10 w-full h-16 border-b border-b-[#2e2e4a] flex justify-center items-center text-2xl font-semibold backdrop-blur-md bg-zinc-50/60 dark:bg-[#1a1a2e]/60">
        <h1 className="text-2xl font-bold">
          <a href={"/"} className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-br from-[#ff4a58] to-[#ff7354]">
              <Flame size={24} className="text-white fill-white" />
            </span>
            <span>
              <span className="text-foreground">Linux</span>
              <span className="bg-linear-to-r from-[#ff4a58] to-[#ff7354] bg-clip-text text-transparent">
                inder
              </span>
            </span>
          </a>
        </h1>
      </div>
      <Card />
      <div className="fixed bottom-0 z-10 w-full h-12 border-t border-t-[#2e2e4a] flex justify-center items-center backdrop-blur-md bg-zinc-50/60 dark:bg-[#1a1a2e]/60">
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
      </div>
    </div>
  );
}
