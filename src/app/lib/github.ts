const REPO_OWNER = "Schoji";
const REPO_NAME = "Linuxinder";
export const REPO_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}`;

/**
 * Star count for the repo, or null if GitHub does not answer.
 *
 * Fetched on the server and cached for an hour. Doing it from the browser
 * instead would spend the caller's unauthenticated quota - 60 requests an hour
 * per IP, shared by everyone behind the same NAT - and a rate-limited visitor
 * would watch the count fail to arrive. This way GitHub sees one request per
 * hour per deployment, whoever is reading.
 *
 * Returning null rather than throwing is deliberate: the button is decoration,
 * and a page that will not render because a third party is down is worse than
 * a button without a number.
 */
export async function getStarCount(): Promise<number | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return null;

    const data: unknown = await res.json();
    const count = (data as { stargazers_count?: unknown }).stargazers_count;

    return typeof count === "number" ? count : null;
  } catch {
    return null;
  }
}
