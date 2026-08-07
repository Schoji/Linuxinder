<div align="center">

# 🔥 Linuxinder

**Tinder, but for Linux distributions.**

Swipe right on rolling releases. Swipe left on anything that ships GNOME 3.
Find the distro that finally understands you.

*This is a joke. Please do not make life decisions based on it.*

</div>

---

## What is this?

Every distro on Linuxinder has a dating profile: a screenshot, a tagline written in
its own voice, a short bio, a few personality tags — and one red flag it only admits
to after you've already matched.

> **CachyOS** — *"Recompiled just for your CPU. Yes, that's flirting."*
> 🚩 I'm Arch underneath. One badly timed update and you get a black screen.

> **Debian** — *"Half your exes were built on top of me."*
> 🚩 By the time I call software ready, upstream has shipped three more.

> **Linux Mint** — *"I will never surprise you. That's the whole point."*
> 🚩 Wayland is still 'experimental' here, and I skip releases for months.

You swipe through the deck. At the end you get a match, two runners-up, and a short
read on your taste that is somehow more judgemental than it needs to be:

> *"You rejected everything immutable. Your match is EndeavourOS."*
> *"You swiped right on every gaming distro."*

Then you share the link and let someone else find out what you're into.

## How the matching works

There is an actual algorithm in here, which is the funniest part.

Every distro carries a handful of tags from a fixed vocabulary — `rolling`, `stable`,
`immutable`, `beginner`, `terminal`, `diy`, `ricing`, `gaming`, `lightweight`,
`privacy`, `systemd-free`, `will-break`, `windows-like`, `mac-like`, `obscure`, and
friends. See [tag.ts](src/app/data/models/tag.ts) for the full list of things you can
be attracted to.

[`MatchingAlgorithm`](src/app/data/core/matching_algorithm.ts) keeps three tallies:

| Tally | Meaning |
| --- | --- |
| `preferences` | `+1` per tag on a right swipe, `-1` on a left swipe |
| `seenTags` | how often each tag has been put in front of you |
| `likedTags` | how often you said yes to it |

At the end, every distro in the catalogue — including the ones you never saw — is
scored as the mean of its tags' preference values, and the top three are your match
and runners-up. Nothing else is weighted, and that is deliberate: overthink it and it
stops being funny.

The verdict lines come from the same three tallies. `seenTags` versus `likedTags` is
what lets it notice a contradiction ("you rejected every `immutable` distro, and your
match is immutable"), and a contradiction always outranks the generic
"you leaned hardest into `X`" fallback.

## Running it

```bash
pnpm install
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

```bash
pnpm build && pnpm start   # production
pnpm lint                  # eslint
```

## Adding a distro

Append one object to the array in [distros.ts](src/app/data/distros.ts):

```ts
{
  slug: "gentoo",
  name: "Gentoo",
  tagline: "I'll be ready in four hours. Worth the wait.",
  description: "…",
  release_date: new Date("2002-03-31"),
  originCountry: "USA",
  basedOn: "Independent",
  logo_path: "/logos/gentoo.png",
  screenshot_path: "/screenshots/gentoo.png",
  website: "https://www.gentoo.org",
  tags: [Tag.Diy, Tag.Terminal, Tag.WillBreak],
  red_flag: "…",
}
```

Drop the screenshot in [public/screenshots/](public/screenshots/) — 16:9 keeps it
uncropped, since the card renders it in an `aspect-video` box. Tags have to come from
the `Tag` enum; the scoring only knows about those. No other file needs touching.

A tagline should sound like the distro talking. A red flag should be true.

## Stack

Next.js 16 (App Router, React Compiler on) · React 19 · TypeScript · Tailwind CSS v4 ·
Motion for the swipe physics · lucide-react for icons · pnpm.

The card is deliberately shaped like a window rather than a photo — title bar, three
dots, screenshot below — because a desktop screenshot in a Tinder frame is the whole
premise in one image. Dragging is real drag: the card tilts into the throw, a glow
resolves toward like or pass as you cross the threshold, and the next two cards are
already mounted underneath so promoting one costs no network round trip.
`useReducedMotion` collapses all of it to instant for anyone who asked for that.

## Credits and licensing

The code is MIT (see [LICENSE](LICENSE)). The artwork is not, and the difference
matters if you fork this.

**Tux** — the penguin in [the app icon](src/app/icon.svg) — is © Larry Ewing, Simon
Budig and Anja Gerwinski, and is licensed under the
[GNU GPL](https://www.gnu.org/licenses/gpl-2.0.html), version 2 or any later version.
The notice is kept inside the SVG itself so it survives being copied out of this repo.

**Desktop screenshots** are credited individually in
[public/screenshots/ATTRIBUTION.md](public/screenshots/ATTRIBUTION.md). Most come from
DistroWatch's per-distribution pages; a handful were sourced from Wikimedia Commons
under GPL or CC BY-SA, and those carry an author and a licence in that table.

## Disclaimer

Linuxinder is satire. The red flags are real complaints, but they are chosen to be
unflattering rather than balanced, and the "algorithm" is fifteen lines of arithmetic
over tags someone assigned by vibe. If it matches you with something, that is a
suggestion to go read the distro's actual documentation, not a result.

Do not `dd` anything to a USB stick because a website with a flame logo told you to.

---

<div align="center">

[Piotr Wittig](https://piotrwittig.com) · 2026

</div>
