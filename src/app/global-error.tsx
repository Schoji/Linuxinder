"use client";

import "./globals.css";

// The last resort: an error thrown by the root layout itself, which replaces
// the whole document. No Shell here - the layout that provides the font
// variables is exactly the thing that failed, so this stands on its own.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col items-center justify-center gap-6 px-6 text-center bg-zinc-50 dark:bg-[#1a1a2e]">
        <h1 className="text-4xl font-bold bg-linear-to-r from-[#ff4a58] to-[#ff7354] bg-clip-text text-transparent">
          Linuxinder is down
        </h1>
        <p className="max-w-md text-muted">
          The app failed to start at all. Reloading is genuinely worth a try.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center bg-foreground text-background font-semibold px-7 py-3 rounded-full active:scale-95 cursor-pointer"
        >
          Reload
        </button>
        {error.digest && (
          <p className="text-muted text-xs font-mono">error {error.digest}</p>
        )}
      </body>
    </html>
  );
}
