import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { distros } from "../src/app/data/distros";
import { Tag } from "../src/app/data/models/tag";

const PUBLIC = join(import.meta.dirname, "..", "public");
const validTags = new Set<string>(Object.values(Tag));

describe("catalogue integrity", () => {
  it("has every distro from the scrape", () => {
    expect(distros).toHaveLength(83);
  });

  it("has no duplicate slugs", () => {
    const seen = new Map<string, number>();
    for (const d of distros) seen.set(d.slug, (seen.get(d.slug) ?? 0) + 1);
    expect([...seen].filter(([, n]) => n > 1)).toEqual([]);
  });

  it("has no duplicate names", () => {
    const names = distros.map((d) => d.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it.each(distros.map((d) => [d.slug, d] as const))(
    "%s is complete",
    (_slug, d) => {
      for (const field of [
        "slug",
        "name",
        "tagline",
        "description",
        "originCountry",
        "basedOn",
        "website",
        "red_flag",
      ] as const) {
        expect(d[field].trim(), `${d.slug}.${field}`).not.toBe("");
      }
    },
  );
});

describe("tags", () => {
  // pickWinners divides the tag total by tags.length. An empty array makes
  // that NaN, which sorts unpredictably and can hand out a nonsense winner.
  it.each(distros.map((d) => [d.slug, d.tags] as const))(
    "%s carries at least one tag",
    (_slug, tags) => {
      expect(tags.length).toBeGreaterThan(0);
    },
  );

  it.each(distros.map((d) => [d.slug, d.tags] as const))(
    "%s uses only tags from the enum",
    (slug, tags) => {
      for (const tag of tags) expect(validTags, `${slug}: ${tag}`).toContain(tag);
    },
  );

  it.each(distros.map((d) => [d.slug, d.tags] as const))(
    "%s repeats no tag",
    (_slug, tags) => {
      expect(new Set(tags).size).toBe(tags.length);
    },
  );

  it("uses every tag in the enum at least once", () => {
    const used = new Set(distros.flatMap((d) => d.tags));
    const unused = Object.values(Tag).filter((t) => !used.has(t));
    expect(unused).toEqual([]);
  });
});

describe("release dates", () => {
  it.each(distros.map((d) => [d.slug, d.release_date] as const))(
    "%s has a real date",
    (_slug, date) => {
      expect(Number.isNaN(date.getTime())).toBe(false);
    },
  );

  it.each(distros.map((d) => [d.slug, d.release_date] as const))(
    "%s is not dated in the future",
    (_slug, date) => {
      expect(date.getTime()).toBeLessThanOrEqual(Date.now());
    },
  );

  // The card prints "<age> yo" off this. Anything before Linux itself is a typo.
  it.each(distros.map((d) => [d.slug, d.release_date] as const))(
    "%s is not older than Linux",
    (_slug, date) => {
      expect(date.getFullYear()).toBeGreaterThanOrEqual(1991);
    },
  );
});

describe("links and assets", () => {
  it.each(distros.map((d) => [d.slug, d.website] as const))(
    "%s has an http(s) website",
    (_slug, website) => {
      expect(() => new URL(website)).not.toThrow();
      expect(new URL(website).protocol).toMatch(/^https?:$/);
    },
  );

  it.each(distros.map((d) => [d.slug, d] as const))(
    "%s points its screenshot at its own slug",
    (_slug, d) => {
      expect(d.screenshot_path).toBe(`/screenshots/${d.slug}.webp`);
      expect(d.logo_path).toBe(`/logos/${d.slug}.png`);
    },
  );

  it.each(distros.map((d) => [d.slug, d.screenshot_path] as const))(
    "%s has its screenshot on disk",
    (_slug, path) => {
      expect(existsSync(join(PUBLIC, path))).toBe(true);
    },
  );
});
