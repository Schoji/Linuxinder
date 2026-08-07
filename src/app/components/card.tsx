"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type PanInfo,
} from "motion/react";

import { MatchingAlgorithm } from "../data/core/matching_algorithm";
import { distros } from "../data/distros";
import {
  ExternalLink,
  Flag,
  Flame,
  Heart,
  PartyPopper,
  Share2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Distro } from "../data/models/distro";
import CardProper from "./card_proper";

// Module scope so the identities stay stable across renders, which is what
// useSyncExternalStore requires. The URL never changes without a reload here,
// so there is nothing to subscribe to.
const subscribeNothing = () => () => {};
const readSharedSlug = () =>
  new URLSearchParams(window.location.search).get("match");
const readSharedSlugOnServer = () => null;

const Card = () => {
  const [matchingAlgorithm] = useState(() => new MatchingAlgorithm(distros));

  const [currentDistro, setCurrentDistro] = useState<Distro | null>(null);
  const [winnerDistros, setWinnerDistros] = useState<Distro[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [matchState, setMatchState] = useState<boolean>(false);

  const [shareLabel, setShareLabel] = useState("Share");

  // The ?match= slug of a shared result. useSyncExternalStore rather than
  // useSearchParams (which forces client rendering up to a Suspense boundary)
  // or an effect: the separate server snapshot keeps hydration honest.
  const sharedSlug = useSyncExternalStore(
    subscribeNothing,
    readSharedSlug,
    readSharedSlugOnServer,
  );
  const sharedMatch = sharedSlug
    ? (distros.find((d) => d.slug === sharedSlug) ?? null)
    : null;

  const drawn = useRef(false);
  useEffect(() => {
    if (drawn.current || sharedMatch) return;
    drawn.current = true;
    setCurrentDistro(matchingAlgorithm.getRandomDistro());
  }, [matchingAlgorithm, sharedMatch]);

  const handleShare = async () => {
    if (currentDistro === null) return;
    const url = `${window.location.origin}/?match=${currentDistro.slug}`;
    const text = `Linuxinder matched me with ${currentDistro.name}. "${currentDistro.tagline}" 🚩 ${currentDistro.red_flag}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: "Linuxinder", text, url });
        return;
      } catch (error) {
        // Dismissing the share sheet is not a failure - stay quiet.
        if ((error as Error)?.name === "AbortError") return;
        // Anything else: fall through to the clipboard.
      }
    }

    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setShareLabel("Link copied");
    } catch {
      setShareLabel("Copy failed");
    }
    window.setTimeout(() => setShareLabel("Share"), 2000);
  };

  const maxCards = 15;

  const showNextDistro = () => {
    const newDistro = matchingAlgorithm.getRandomDistro();
    if (newDistro === null) {
      setMatchState(true);
      const winners = matchingAlgorithm.pickWinners();
      const winnerList = [];
      for (const winner of winners) {
        const distro = distros.find((distro) => distro.slug === winner.slug)!;
        winnerList.push(distro);
      }

      setWinnerDistros(winnerList);
      setCurrentDistro(winnerList[0]);
      console.log("No more distros available.");
      return;
    }
    setCurrentDistro(newDistro);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleLike = () => {
    if (currentDistro === null) return;
    matchingAlgorithm.likeDistro(currentDistro);
    showNextDistro();
  };

  const handleDislike = () => {
    if (currentDistro === null) return;
    matchingAlgorithm.dislikeDistro(currentDistro);
    showNextDistro();
  };

  // Drag-to-swipe. x is the live offset; rotate is derived from it so the card
  // tilts into the throw. exiting holds the direction while the card flies off -
  // the decision only lands once that animation reports back.
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-400, 400], [-20, 20]);
  // Verdict glow: fades in as the card crosses toward either threshold.
  const passGlow = useTransform(x, [-160, -40], [1, 0]);
  const likeGlow = useTransform(x, [40, 160], [0, 1]);
  const reducedMotion = useReducedMotion();

  // The card being thrown away lives on its own so the deck can advance at once -
  // waiting for the animation to finish is what made the next card ungrabbable.
  const [exitingCard, setExitingCard] = useState<{
    distro: Distro;
    dir: 1 | -1;
    fromX: number;
  } | null>(null);

  const SWIPE_THRESHOLD = 120;
  const spring = reducedMotion
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 260, damping: 26 } as const);

  const commit = (direction: "like" | "pass") => {
    if (currentDistro === null) return;
    setExitingCard({
      distro: currentDistro,
      dir: direction === "like" ? 1 : -1,
      fromX: x.get(), // pick up where the drag left off, so it does not jump
    });
    if (direction === "like") handleLike();
    else handleDislike();
    x.set(0);
  };

  const onDragEnd = (_event: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) commit("like");
    else if (info.offset.x < -SWIPE_THRESHOLD) commit("pass");
    // Below the threshold dragConstraints springs it back on its own.
  };

  // Only once the first card has been dealt: before that the deck is still
  // unshuffled, and rendering it would also put it into the server's HTML.
  const upcoming = currentDistro ? matchingAlgorithm.peek(2) : [];

  // Someone else's result. No verdict box and no runners-up - both describe
  // swipes we do not have, and the link only carries the match itself.
  if (sharedMatch) {
    return (
      <div className="flex flex-col items-center gap-6">
        <p className="text-muted text-sm">Someone matched with</p>
        <h1 className="text-5xl font-bold bg-linear-to-r from-[#ff4a58] to-[#ff7354] bg-clip-text text-transparent">
          {sharedMatch.name}
        </h1>
        <CardProper distro={sharedMatch} small={false} />
        <div className="flex items-center gap-3 max-w-xl px-6 py-4 rounded-2xl border border-[#2e2e4a] bg-[#1e1e35]">
          <Flag size={20} className="shrink-0 text-[#ec4899]" />
          <p className="flex-1 text-center text-muted">
            {sharedMatch.red_flag}
          </p>
        </div>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/"
          className="inline-flex items-center bg-foreground text-background font-semibold px-7 py-3 rounded-full active:scale-95 cursor-pointer"
        >
          Find your own match
        </a>
      </div>
    );
  }

  return (
    <>
      {!matchState ? (
        <div className="flex flex-col items-center w-2xl">
          <p className="text-muted text-xl text-center max-w-lg mb-10">
            {
              "Swipe through the distros. Be honest — we're building your type from every left and right."
            }
          </p>

          {/* Tight to the card: the bar describes the deck it sits on. */}
          <div className="flex items-center gap-3 w-full mb-4">
            {Array.from({ length: maxCards }, (_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full ${
                  i <= currentIndex
                    ? "bg-linear-to-r from-[#ff4a58] to-[#ff7354]"
                    : "bg-[#2e2e50]"
                }`}
              />
            ))}
            <span className="text-muted text-sm shrink-0">
              {currentIndex + 1}/{maxCards}
            </span>
          </div>

          <div className="relative w-full">
            {/* The real upcoming cards, deepest first so paint order matches
                depth. Rendering them here also decodes their screenshots ahead
                of time, so promoting one to the front costs no network trip. */}
            {[...upcoming].reverse().map((distro, i) => {
              const depth = upcoming.length - i;
              return (
                <motion.div
                  key={distro.slug}
                  aria-hidden="true"
                  className="absolute inset-0"
                  // initial={false}: a card entering the deck should appear at its
                  // depth, not fly in. Animating depth is what removes the pop.
                  initial={false}
                  animate={{ y: depth * 12, scale: 1 - depth * 0.03 }}
                  transition={spring}
                >
                  <CardProper distro={distro} small={false} />
                </motion.div>
              );
            })}

            {currentDistro && (
              <motion.div
                // Keyed by slug so each new card mounts fresh and animates up
                // from exactly where it sat in the deck.
                key={currentDistro.slug}
                className="relative cursor-grab active:cursor-grabbing select-none"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                dragMomentum={false}
                style={{ x, rotate }}
                initial={{ y: 12, scale: 0.97 }}
                animate={{ y: 0, scale: 1 }}
                transition={spring}
                onDragEnd={onDragEnd}
              >
                <CardProper distro={currentDistro} small={false} />
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-xl border-4 border-[#ec4899]"
                  style={{
                    opacity: passGlow,
                    boxShadow: "0 0 60px 8px rgba(236,72,153,0.45)",
                  }}
                />
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-xl border-4 border-[#6ee7a0]"
                  style={{
                    opacity: likeGlow,
                    boxShadow: "0 0 60px 8px rgba(110,231,160,0.45)",
                  }}
                />
              </motion.div>
            )}

            {/* The thrown card, already detached from the deck. */}
            {exitingCard && (
              <motion.div
                key={`${exitingCard.distro.slug}-exit`}
                aria-hidden="true"
                className="absolute inset-0 z-10 pointer-events-none"
                initial={{ x: exitingCard.fromX, opacity: 1 }}
                animate={{ x: exitingCard.dir * 900, opacity: 0 }}
                transition={
                  reducedMotion ? { duration: 0 } : { duration: 0.45, ease: "easeOut" }
                }
                onAnimationComplete={() => setExitingCard(null)}
              >
                <CardProper distro={exitingCard.distro} small={false} />
                <div
                  className="pointer-events-none absolute inset-0 rounded-xl border-4"
                  style={{
                    borderColor:
                      exitingCard.dir === 1 ? "#6ee7a0" : "#ec4899",
                    boxShadow:
                      exitingCard.dir === 1
                        ? "0 0 60px 8px rgba(110,231,160,0.45)"
                        : "0 0 60px 8px rgba(236,72,153,0.45)",
                  }}
                />
              </motion.div>
            )}
          </div>

          <div className="flex gap-6 mt-6">
            <button
              className="w-16 h-16 rounded-full flex justify-center items-center bg-[#232340] border border-[#2e2e4a] shadow-lg shadow-black/50 text-[#ec4899] transition-colors hover:border-[#ec4899] hover:shadow-[#ec4899]/30 active:scale-90 cursor-pointer"
              onClick={() => commit("pass")}
            >
              <X size={28} strokeWidth={2.5} />
            </button>
            <button
              className="w-16 h-16 rounded-full flex justify-center items-center bg-[#232340] border border-[#2e2e4a] shadow-lg shadow-black/50 text-[#6ee7a0] transition-colors hover:border-[#6ee7a0] hover:shadow-[#6ee7a0]/30 active:scale-90 cursor-pointer"
              onClick={() => commit("like")}
            >
              <Heart size={28} strokeWidth={2.5} />
            </button>
          </div>
          <p className="text-muted text-xs mt-3">
            ← drag left to pass · drag right to like →
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <h1 className="text-6xl inline-block font-bold bg-linear-to-r from-[#ff4a58] to-[#ff7354] bg-clip-text text-transparent">
              It&apos;s a match!{" "}
            </h1>
            {/* bg-clip-text only paints text; a lucide icon is an SVG drawn
                with stroke, so the gradient has to be an SVG paint server. */}
            <svg width="0" height="0" className="absolute" aria-hidden="true">
              <defs>
                <linearGradient
                  id="brand-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#ff4a58" />
                  <stop offset="100%" stopColor="#ff7354" />
                </linearGradient>
              </defs>
            </svg>
            <PartyPopper size={48} color="url(#brand-gradient)" />
          </div>
          {currentDistro && (
            <div className="flex items-center gap-3 max-w-xl px-6 py-4 rounded-2xl border border-[#2e2e4a] bg-[#1e1e35]">
              <Flame size={20} className="shrink-0 text-[#ff4a58]" />
              <p className="flex-1 text-center text-muted">
                {matchingAlgorithm.getSentences(currentDistro).join(" ")}
              </p>
            </div>
          )}
        </div>
      )}

      {matchState && currentDistro && (
        <CardProper distro={currentDistro} small={false} />
      )}
      {matchState && (
        <div className="flex flex-col gap-10 items-center">
          {/* WARIANT 1: same shape as the verdict box above the card, so the two
              read as a pair - that one says why it fits, this one says what
              you are signing up for. */}
          {currentDistro && (
            <div className="flex items-center gap-3 max-w-xl px-6 py-4 rounded-2xl border border-[#2e2e4a] bg-[#1e1e35]">
              <Flag size={20} className="shrink-0 text-[#ec4899]" />
              <p className="flex-1 text-center text-muted">
                {currentDistro.red_flag}
              </p>
            </div>
          )}

          {/* Play again leads on weight and position, not colour - the accent
              gradient belongs to the headline alone. */}
          <div className="flex justify-center items-center gap-3">
            {/* A plain anchor, not Link: a same-route client navigation keeps the
                component mounted, so state and the drained deck would survive.
                The full document load is the reset. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              className="inline-flex items-center bg-foreground text-background font-semibold px-7 py-3 rounded-full active:scale-95 cursor-pointer"
            >
              Play again
            </a>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 border border-[#3a3a5a] text-foreground font-semibold px-7 py-3 rounded-full hover:bg-white/5 active:scale-95 cursor-pointer"
            >
              <Share2 size={18} />
              {shareLabel}
            </button>
            <button className="flex items-center gap-2 border border-[#3a3a5a] text-foreground font-semibold px-7 py-3 rounded-full hover:bg-white/5 active:scale-95 cursor-pointer">
              <ExternalLink size={18} />
              Visit website
            </button>
          </div>

          <div className="flex flex-col items-center gap-3">
            <p className="text-muted text-sm">Runners-up</p>
            <div className="flex justify-center gap-4">
              {/* slice, not [1] and [2] - fewer than three winners is not a crash */}
              {winnerDistros.slice(1, 3).map((distro, i) => (
                <div
                  key={distro.slug}
                  className="flex items-center gap-3 w-56 p-2 rounded-xl border border-[#2e2e4a] bg-[#1e1e35]"
                >
                  <span className="shrink-0 w-5 text-center text-muted text-sm">
                    {i + 2}
                  </span>
                  <div className="relative w-14 h-10 shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={distro.screenshot_path}
                      alt={distro.name}
                      fill
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
        </div>
      )}
    </>
  );
};

export default Card;
