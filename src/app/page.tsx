import SwipeFlow from "./components/SwipeFlow";
import Shell from "./components/Shell";
import { getStarCount } from "./lib/github";

export default async function Home() {
  // Fetched here rather than inside the header: Shell is rendered by error.tsx
  // too, which is a client component and cannot await anything.
  const stars = await getStarCount();

  return (
    <Shell stars={stars}>
      <SwipeFlow />
    </Shell>
  );
}
