import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ['192.168.1.197'],
  images: {
    // The cards are desktop screenshots, so the detail that matters is UI text
    // a few pixels tall. The default 75 turns menu entries into grey mush by
    // the time a 1920px source has been resampled down to the ~672px card.
    // Any quality used in a `quality` prop has to be listed here.
    qualities: [75, 90],
  },
};

export default nextConfig;
