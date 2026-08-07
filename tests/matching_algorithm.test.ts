import { describe, expect, it, vi, afterEach } from "vitest";

import { DECK_SIZE, MatchingAlgorithm } from "../src/app/data/core/matching_algorithm";
import { distros } from "../src/app/data/distros";
import { Distro } from "../src/app/data/models/distro";
import { Tag } from "../src/app/data/models/tag";

/** Minimal distro. Only slug and tags matter to the algorithm. */
const make = (slug: string, tags: Tag[]): Distro => ({
  slug,
  name: slug,
  tagline: "",
  description: "",
  release_date: new Date("2020-01-01"),
  originCountry: "",
  basedOn: "",
  logo_path: "",
  screenshot_path: "",
  website: "",
  tags,
  red_flag: "",
});

const deck = () => [
  make("a", [Tag.Rolling, Tag.Gaming]),
  make("b", [Tag.Rolling, Tag.Stable]),
  make("c", [Tag.Stable, Tag.Beginner]),
  make("d", [Tag.Gaming, Tag.Beginner]),
];

/** Drains the deck and returns every card dealt, in order. */
const dealAll = (algo: MatchingAlgorithm): Distro[] => {
  const out: Distro[] = [];
  for (;;) {
    const next = algo.getRandomDistro();
    if (next === null) return out;
    out.push(next);
  }
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("no debug output", () => {
  // likeDistro and dislikeDistro used to dump the whole preference map on
  // every swipe, which reached the browser console in production.
  it("stays quiet while swiping", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const algo = new MatchingAlgorithm(deck());

    algo.getRandomDistro();
    algo.likeDistro(make("x", [Tag.Rolling]));
    algo.dislikeDistro(make("y", [Tag.Gaming]));
    algo.pickWinners();
    algo.getSentences(make("w", [Tag.Rolling]));

    expect(log).not.toHaveBeenCalled();
  });
});

describe("dealing the deck", () => {
  it("does not shuffle in the constructor, so the server render stays pure", () => {
    const random = vi.spyOn(Math, "random");
    new MatchingAlgorithm(deck());
    expect(random).not.toHaveBeenCalled();
  });

  it("shuffles on the first draw, once", () => {
    const random = vi.spyOn(Math, "random");
    const algo = new MatchingAlgorithm(deck());

    algo.getRandomDistro();
    const afterFirst = random.mock.calls.length;
    expect(afterFirst).toBeGreaterThan(0);

    algo.getRandomDistro();
    expect(random.mock.calls.length).toBe(afterFirst);
  });

  it("deals every distro exactly once", () => {
    const algo = new MatchingAlgorithm(deck());
    const dealt = dealAll(algo).map((d) => d.slug).sort();
    expect(dealt).toEqual(["a", "b", "c", "d"]);
  });

  it("returns null once drained, and keeps returning null", () => {
    const algo = new MatchingAlgorithm(deck());
    dealAll(algo);
    expect(algo.getRandomDistro()).toBeNull();
    expect(algo.getRandomDistro()).toBeNull();
  });

  it("leaves the caller's array untouched", () => {
    const source = deck();
    const before = source.map((d) => d.slug);
    dealAll(new MatchingAlgorithm(source));
    expect(source.map((d) => d.slug)).toEqual(before);
  });

  it("peek shows the cards that are actually dealt next", () => {
    const algo = new MatchingAlgorithm(deck());
    algo.getRandomDistro(); // trigger the shuffle

    const peeked = algo.peek(2).map((d) => d.slug);
    expect(algo.getRandomDistro()!.slug).toBe(peeked[0]);
    expect(algo.getRandomDistro()!.slug).toBe(peeked[1]);
  });

  it("peek is empty once the deck is drained", () => {
    const algo = new MatchingAlgorithm(deck());
    dealAll(algo);
    expect(algo.peek(2)).toEqual([]);
  });

  it("produces a different order than the source given a shuffling RNG", () => {
    // Reverses the deck: at each step j lands on 0, rotating the array.
    vi.spyOn(Math, "random").mockReturnValue(0);
    const algo = new MatchingAlgorithm(deck());
    const dealt = dealAll(algo).map((d) => d.slug);
    expect(dealt).not.toEqual(["a", "b", "c", "d"]);
    expect([...dealt].sort()).toEqual(["a", "b", "c", "d"]);
  });
});

describe("run length", () => {
  it("deals a fixed-size hand, not the whole catalogue", () => {
    const algo = new MatchingAlgorithm(distros);
    expect(distros.length).toBeGreaterThan(DECK_SIZE);
    expect(dealAll(algo)).toHaveLength(DECK_SIZE);
  });

  it("reports the hand size it will actually deal", () => {
    expect(new MatchingAlgorithm(distros).deckSize).toBe(DECK_SIZE);
  });

  it("never promises more cards than the catalogue holds", () => {
    const algo = new MatchingAlgorithm(deck()); // four distros
    expect(algo.deckSize).toBe(4);
    expect(dealAll(algo)).toHaveLength(4);
  });

  it("honours an explicit hand size", () => {
    const algo = new MatchingAlgorithm(distros, 3);
    expect(algo.deckSize).toBe(3);
    expect(dealAll(algo)).toHaveLength(3);
  });

  it("survives a zero-length run without throwing", () => {
    const algo = new MatchingAlgorithm(distros, 0);
    expect(algo.deckSize).toBe(0);
    expect(algo.getRandomDistro()).toBeNull();
  });

  // The cut has to happen after the shuffle. Trimming first would deal the
  // same opening slice of distros.ts on every single run.
  it("draws the hand from the whole catalogue, not just the top of it", () => {
    const seen = new Set<string>();
    for (let i = 0; i < 40; i++) {
      for (const d of dealAll(new MatchingAlgorithm(distros))) seen.add(d.slug);
    }
    // 40 runs of 15 would only ever reveal 15 slugs if the deck were trimmed
    // before shuffling. In practice this covers nearly the whole catalogue.
    expect(seen.size).toBeGreaterThan(DECK_SIZE * 3);
  });

  it("still counts a full hand as seen", () => {
    const algo = new MatchingAlgorithm(distros);
    const dealt = dealAll(algo);
    const totalSeen = Object.values(Tag).reduce((s, t) => s + algo.seenTags[t], 0);
    expect(totalSeen).toBe(dealt.reduce((s, d) => s + d.tags.length, 0));
  });
});

describe("tallies", () => {
  it("counts a tag as seen when its card is dealt", () => {
    const algo = new MatchingAlgorithm([make("a", [Tag.Rolling, Tag.Gaming])]);
    expect(algo.seenTags[Tag.Rolling]).toBe(0);

    algo.getRandomDistro();
    expect(algo.seenTags[Tag.Rolling]).toBe(1);
    expect(algo.seenTags[Tag.Gaming]).toBe(1);
    expect(algo.seenTags[Tag.Stable]).toBe(0);
  });

  it("a like raises both the preference and the liked count", () => {
    const algo = new MatchingAlgorithm(deck());
    algo.likeDistro(make("x", [Tag.Rolling]));

    expect(algo.preferences[Tag.Rolling]).toBe(1);
    expect(algo.likedTags[Tag.Rolling]).toBe(1);
  });

  it("a dislike lowers the preference and leaves the liked count alone", () => {
    const algo = new MatchingAlgorithm(deck());
    algo.dislikeDistro(make("x", [Tag.Rolling]));

    expect(algo.preferences[Tag.Rolling]).toBe(-1);
    expect(algo.likedTags[Tag.Rolling]).toBe(0);
  });

  it("swipes only touch the tags on the card", () => {
    const algo = new MatchingAlgorithm(deck());
    algo.likeDistro(make("x", [Tag.Rolling]));
    expect(algo.preferences[Tag.Gaming]).toBe(0);
    expect(algo.preferences[Tag.Stable]).toBe(0);
  });

  it("every tag in the enum starts at zero", () => {
    const algo = new MatchingAlgorithm(deck());
    for (const tag of Object.values(Tag)) {
      expect(algo.preferences[tag]).toBe(0);
      expect(algo.seenTags[tag]).toBe(0);
      expect(algo.likedTags[tag]).toBe(0);
    }
  });
});

describe("pickWinners", () => {
  it("returns three winners, highest score first", () => {
    const algo = new MatchingAlgorithm(deck());
    algo.likeDistro(make("x", [Tag.Rolling]));

    const winners = algo.pickWinners();
    expect(winners).toHaveLength(3);
    expect(winners[0].score).toBeGreaterThanOrEqual(winners[1].score);
    expect(winners[1].score).toBeGreaterThanOrEqual(winners[2].score);
  });

  it("scores a distro as the mean preference across its tags", () => {
    const algo = new MatchingAlgorithm(deck());
    // Rolling +2, Gaming -1 => "a" (Rolling, Gaming) averages 0.5
    algo.likeDistro(make("x", [Tag.Rolling]));
    algo.likeDistro(make("y", [Tag.Rolling]));
    algo.dislikeDistro(make("z", [Tag.Gaming]));

    const scores = new Map(algo.pickWinners().map((w) => [w.slug, w.score]));
    expect(scores.get("a")).toBe(0.5);
  });

  it("crowns the distro whose tags were liked most", () => {
    const algo = new MatchingAlgorithm(deck());
    algo.likeDistro(make("x", [Tag.Stable, Tag.Beginner]));
    algo.likeDistro(make("y", [Tag.Stable, Tag.Beginner]));
    algo.dislikeDistro(make("z", [Tag.Rolling, Tag.Gaming]));

    // "c" is the only card that is Stable AND Beginner.
    expect(algo.pickWinners()[0].slug).toBe("c");
  });

  it("ranks by average, not by total, so tag count cannot buy a win", () => {
    const algo = new MatchingAlgorithm([
      make("focused", [Tag.Rolling]),
      make("padded", [Tag.Rolling, Tag.Gaming, Tag.Stable]),
    ]);
    algo.likeDistro(make("x", [Tag.Rolling]));

    const winners = algo.pickWinners();
    expect(winners[0].slug).toBe("focused");
    expect(winners[0].score).toBe(1);
    expect(winners[1].score).toBeCloseTo(1 / 3);
  });

  it("scores every distro, including ones already dealt", () => {
    const algo = new MatchingAlgorithm(deck());
    dealAll(algo);
    expect(algo.pickWinners()).toHaveLength(3);
  });

  it("does not disturb the tallies it reads", () => {
    const algo = new MatchingAlgorithm(deck());
    algo.likeDistro(make("x", [Tag.Rolling]));

    const before = { ...algo.preferences };
    algo.pickWinners();
    expect({ ...algo.preferences }).toEqual(before);
  });

  it("returns fewer than three when the catalogue is smaller", () => {
    const algo = new MatchingAlgorithm([make("only", [Tag.Rolling])]);
    expect(algo.pickWinners()).toHaveLength(1);
  });

  it("ranks the whole catalogue, not only the cards that were dealt", () => {
    const algo = new MatchingAlgorithm(distros);
    const dealt = new Set(dealAll(algo).map((d) => d.slug));
    const ranked = algo.pickWinners();
    // A 15-card hand cannot possibly contain every scored distro.
    expect(dealt.size).toBe(DECK_SIZE);
    expect(ranked).toHaveLength(3);
    expect(distros.some((d) => !dealt.has(d.slug))).toBe(true);
  });

  // Array.sort is stable, so without an explicit shuffle a tie is settled by
  // position in distros.ts and the same entry wins every time. Over a 15-card
  // run two thirds of games end in a tie, so this decided most matches.
  it("does not settle a tie by catalogue order", () => {
    const tied = [
      make("first", [Tag.Rolling]),
      make("second", [Tag.Rolling]),
      make("third", [Tag.Rolling]),
      make("fourth", [Tag.Rolling]),
    ];

    const winners = new Set<string>();
    for (let i = 0; i < 200; i++) {
      const algo = new MatchingAlgorithm(tied);
      algo.likeDistro(make("x", [Tag.Rolling])); // every card now scores the same
      winners.add(algo.pickWinners()[0].slug);
    }

    // Four-way tie: the odds of one slug legitimately taking all 200 are 4^-199.
    expect(winners.size).toBeGreaterThan(1);
  });

  it("keeps a genuine score difference ahead of the tie-break", () => {
    for (let i = 0; i < 50; i++) {
      const algo = new MatchingAlgorithm(deck());
      algo.likeDistro(make("x", [Tag.Stable, Tag.Beginner]));
      algo.likeDistro(make("y", [Tag.Stable, Tag.Beginner]));
      algo.dislikeDistro(make("z", [Tag.Rolling, Tag.Gaming]));
      expect(algo.pickWinners()[0].slug).toBe("c");
    }
  });
});

describe("getSentences", () => {
  /** Deals a card `times` over and swipes it each way. */
  const swipe = (
    algo: MatchingAlgorithm,
    distro: Distro,
    times: number,
    liked: boolean,
  ) => {
    for (let i = 0; i < times; i++) {
      for (const tag of distro.tags) algo.seenTags[tag]++;
      if (liked) algo.likeDistro(distro);
      else algo.dislikeDistro(distro);
    }
  };

  it("never returns more than two lines", () => {
    const algo = new MatchingAlgorithm(deck());
    swipe(algo, make("x", [Tag.Rolling]), 4, true);
    swipe(algo, make("y", [Tag.Gaming]), 4, false);
    swipe(algo, make("z", [Tag.Stable]), 4, false);

    expect(algo.getSentences(make("w", [Tag.Stable])).length).toBeLessThanOrEqual(2);
  });

  it("always says something, even with no swipes at all", () => {
    const algo = new MatchingAlgorithm(deck());
    const lines = algo.getSentences(make("w", [Tag.Rolling]));
    expect(lines.length).toBeGreaterThan(0);
    expect(lines[0]).toContain("You leaned hardest into");
  });

  it("calls out the contradiction when the match is a tag you always rejected", () => {
    const algo = new MatchingAlgorithm(deck());
    swipe(algo, make("x", [Tag.Rolling]), 3, false);

    const lines = algo.getSentences(make("w", [Tag.Rolling]));
    expect(lines[0]).toBe("You rejected everything rolling. Your match is w.");
  });

  it("needs three sightings before it claims a pattern", () => {
    const algo = new MatchingAlgorithm(deck());
    swipe(algo, make("x", [Tag.Rolling]), 2, false);

    const lines = algo.getSentences(make("w", [Tag.Rolling]));
    expect(lines.join(" ")).not.toContain("rejected everything");
    expect(lines.join(" ")).not.toContain("never liked");
  });

  it("reports a tag swiped right every single time", () => {
    const algo = new MatchingAlgorithm(deck());
    swipe(algo, make("x", [Tag.Gaming]), 3, true);

    const lines = algo.getSentences(make("w", [Tag.Gaming]));
    expect(lines.join(" ")).toContain("You swiped right on every gaming distro.");
  });

  // Listed in enum order, not in the order they were swiped: the sentence is
  // built by filtering Object.values(Tag), so Stable precedes Gaming.
  it("merges several tags into one sentence rather than repeating itself", () => {
    const algo = new MatchingAlgorithm(deck());
    swipe(algo, make("x", [Tag.Rolling, Tag.Gaming, Tag.Stable]), 3, true);

    const lines = algo.getSentences(make("w", [Tag.Beginner]));
    expect(lines.join(" ")).toContain(
      "You swiped right on every rolling, stable and gaming distro.",
    );
  });

  it("joins a pair with 'and', no comma", () => {
    const algo = new MatchingAlgorithm(deck());
    swipe(algo, make("x", [Tag.Rolling, Tag.Gaming]), 3, true);

    const lines = algo.getSentences(make("w", [Tag.Beginner]));
    expect(lines.join(" ")).toContain("every rolling and gaming distro.");
  });

  it("does not print the same kind of line twice", () => {
    const algo = new MatchingAlgorithm(deck());
    swipe(algo, make("x", [Tag.Rolling]), 3, false);
    swipe(algo, make("y", [Tag.Gaming]), 3, false);

    const lines = algo.getSentences(make("w", [Tag.Rolling, Tag.Gaming]));
    const contradictions = lines.filter((l) => l.includes("rejected everything"));
    expect(contradictions.length).toBeLessThanOrEqual(1);
  });

  it("puts the contradiction ahead of the plain summary", () => {
    const algo = new MatchingAlgorithm(deck());
    swipe(algo, make("x", [Tag.Rolling]), 5, false);
    swipe(algo, make("y", [Tag.Gaming]), 3, true);

    const lines = algo.getSentences(make("w", [Tag.Rolling]));
    expect(lines[0]).toContain("rejected everything rolling");
  });
});
