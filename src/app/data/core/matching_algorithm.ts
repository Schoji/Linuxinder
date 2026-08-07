import { Distro } from "../models/distro";
import { Tag } from "../models/tag";

type Candidate = { kind: string; text: string; weight: number };

/**
 * How many cards one run deals. The catalogue is far larger and keeps growing;
 * the run length is a pacing decision and should not grow with it.
 */
export const DECK_SIZE = 15;

/** Fisher-Yates. Shuffles the array you pass in, in place. */
function shuffleInPlace<T>(items: T[]) {
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }
}

export class MatchingAlgorithm {
    distributionList: Distro[];
    allDistributions: Distro[];
    /** Cards this run will deal: DECK_SIZE, or the catalogue if it is smaller. */
    readonly deckSize: number;
    preferences: Record<Tag, number> = Object.fromEntries(Object.values(Tag).map(tag => [tag, 0])) as Record<Tag, number>;
    // Partial: a key only shows up once that tag has actually been swiped on.
    seenTags: Record<Tag, number> = Object.fromEntries(Object.values(Tag).map(tag => [tag, 0])) as Record<Tag, number>;
    likedTags: Record<Tag, number> = Object.fromEntries(Object.values(Tag).map(tag => [tag, 0])) as Record<Tag, number>;
    
    constructor(distros: Distro[], deckSize: number = DECK_SIZE) {
        this.distributionList = [...distros];
        this.allDistributions = distros;

        // Never promise more cards than the catalogue actually holds.
        let size = deckSize;
        if (size > distros.length) size = distros.length;
        if (size < 0) size = 0;
        this.deckSize = size;
    }

    private shuffled = false;

    /**
     * Deferred on purpose: shuffling in the constructor would put Math.random()
     * back into the server render and hand the client a different deck.
     */
    private shuffleDeck() {
        shuffleInPlace(this.distributionList);

        // Cut to the run length only now. Trimming before the shuffle would
        // deal the same opening slice of the catalogue every time.
        this.distributionList = this.distributionList.slice(0, this.deckSize);

        this.shuffled = true;
    }

    public getRandomDistro() {
        if (!this.shuffled) this.shuffleDeck();

        const distro = this.distributionList.shift();
        if (distro === undefined) {
            return null;
        }
        for (const tag of distro.tags) {
            this.seenTags[tag]++
        }
        return distro;
    }

    /** The cards still to come, in the order they will be dealt. */
    public peek(count: number) {
        return this.distributionList.slice(0, count);
    }

    public likeDistro(distro: Distro) {
        distro.tags.forEach(tag => {
            this.preferences[tag]++;
            this.likedTags[tag]++
        });
    }

    public dislikeDistro(distro: Distro) {
        distro.tags.forEach(tag => {
            this.preferences[tag]--;
        });
    }

    public pickWinners() {
        const all_score: Map<string, number> = new Map
        for (const distro of this.allDistributions) {
            const score = distro.tags.reduce((sum, t) => sum + this.preferences[t], 0) / distro.tags.length
            all_score.set(distro.slug, score)
        }
        // A tie has to be settled by chance, not by position in distros.ts.
        // sort is stable, and over a 15-card run two thirds of games end in a
        // tie for first, so without this the same entry would win every time.
        const entries = Array.from(all_score.entries())
        shuffleInPlace(entries)

        const winners = entries.sort((a, b) => b[1] - a[1]).slice(0, 3).map(([slug, score]) => ({ slug, score }))
        return winners
    }

// "stable", "stable and beginner", "stable, beginner and rolling"
    private fmt(list: string[]): string {
        if (list.length <= 1) return list[0] ?? "";
        return `${list.slice(0, -1).join(", ")} and ${list.at(-1)}`;
    }

public getSentences(winner: Distro): string[] {
    const tags = Object.values(Tag);
    const seen = (t: Tag) => this.seenTags[t];
    const candidates: Candidate[] = [];

    // level 2 — contradicts the winner (the most interesting line, so the heaviest weight)
    for (const t of winner.tags) {
        if (seen(t) >= 3 && this.likedTags[t] === 0)
            candidates.push({ kind: "contradiction", weight: 1000 + seen(t),
                text: `You rejected everything ${t}. Your match is ${winner.name}.` });
    }

    // level 1 — merged into one line, not one line per tag
    const always = tags.filter(t => seen(t) >= 3 && this.likedTags[t] === seen(t));
    const never  = tags.filter(t => seen(t) >= 3 && this.likedTags[t] === 0);
    const evidence = (list: Tag[]) => list.reduce((s, t) => s + seen(t), 0);

    if (always.length) candidates.push({ kind: "always", weight: evidence(always),
        text: `You swiped right on every ${this.fmt(always)} distro.` });
    if (never.length) candidates.push({ kind: "never", weight: evidence(never),
        text: `You never liked ${this.fmt(never)}.` });

    // level 3 — fallback
    const sorted = [...tags].sort((a, b) => this.preferences[b] - this.preferences[a]);
    candidates.push({ kind: "lean", weight: -1,
        text: `You leaned hardest into ${sorted[0]}, and away from ${sorted.at(-1)}.` });

    const usedKinds = new Set<string>();
    return candidates
        .sort((a, b) => b.weight - a.weight)
        .filter(c => !usedKinds.has(c.kind) && usedKinds.add(c.kind))
        .slice(0, 2)
        .map(c => c.text);
}

}