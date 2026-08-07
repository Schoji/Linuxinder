"use client";

import { useEffect, useRef, useState } from "react";

import { MatchingAlgorithm } from "../data/core/matching_algorithm";
import { distros } from "../data/distros";
import { Distro } from "../data/models/distro";
import { useSharedMatch } from "../hooks/use_shared_slug";
import MatchScreen from "./MatchScreen";
import SharedMatch from "./SharedMatch";
import SwipeDeck from "./SwipeDeck";

/**
 * The run, start to finish. Owns the tally and which screen you are looking
 * at; owns no layout and no gesture. Everything visual lives in the three
 * screens below it.
 */
const SwipeFlow = () => {
  const [matchingAlgorithm] = useState(() => new MatchingAlgorithm(distros));

  const [currentDistro, setCurrentDistro] = useState<Distro | null>(null);
  const [winnerDistros, setWinnerDistros] = useState<Distro[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [matchState, setMatchState] = useState<boolean>(false);
  // A super like ends the run by decree rather than by arithmetic, so the match
  // screen has to know which of the two ways it got here.
  const [superLiked, setSuperLiked] = useState<boolean>(false);

  const sharedMatch = useSharedMatch();

  const drawn = useRef(false);
  useEffect(() => {
    if (drawn.current || sharedMatch) return;
    drawn.current = true;
    setCurrentDistro(matchingAlgorithm.getRandomDistro());
  }, [matchingAlgorithm, sharedMatch]);

  const showNextDistro = () => {
    const newDistro = matchingAlgorithm.getRandomDistro();

    if (newDistro === null) {
      const winners = matchingAlgorithm.pickWinners();
      const winnerList = [];
      for (const winner of winners) {
        const distro = distros.find((distro) => distro.slug === winner.slug)!;
        winnerList.push(distro);
      }

      setWinnerDistros(winnerList);
      setCurrentDistro(winnerList[0]);
      setMatchState(true);
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

  // Skips the rest of the deck outright. The tally still gets the like so the
  // object stays truthful, but nothing scores it - the winner is the card in
  // front of you, and the runners-up would be ranked on swipes never made.
  const handleSuperLike = () => {
    if (currentDistro === null) return;
    matchingAlgorithm.likeDistro(currentDistro);
    setSuperLiked(true);
    setWinnerDistros([currentDistro]);
    setMatchState(true);
  };

  if (sharedMatch) return <SharedMatch distro={sharedMatch} />;

  if (matchState && currentDistro) {
    // A super like leaves nothing to read: the verdict lines are built out of
    // what you swiped past, and you refused to swipe past.
    const verdict = superLiked
      ? `You didn't want to see the rest. ${currentDistro.name} it is.`
      : matchingAlgorithm.getSentences(currentDistro).join(" ");

    return (
      <MatchScreen
        winner={currentDistro}
        // slice, not [1] and [2] - fewer than three winners is not a crash
        runnersUp={winnerDistros.slice(1, 3)}
        superLiked={superLiked}
        verdict={verdict}
      />
    );
  }

  return (
    <SwipeDeck
      distro={currentDistro}
      // Only once the first card has been dealt: before that the deck is still
      // unshuffled, and rendering it would also put it into the server's HTML.
      upcoming={currentDistro ? matchingAlgorithm.peek(2) : []}
      index={currentIndex}
      total={matchingAlgorithm.deckSize}
      onLike={handleLike}
      onPass={handleDislike}
      onSuperLike={handleSuperLike}
    />
  );
};

export default SwipeFlow;
