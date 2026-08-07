import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "./lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = SITE_TITLE;
const description = SITE_DESCRIPTION;

export const metadata: Metadata = {
  // Everything relative in this object is resolved against this, including the
  // og:image that Next generates from app/opengraph-image.png.
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    // A ?match= result is still this page, so nothing else sets a title today -
    // but the template means anything that does inherits the brand.
    template: "%s — Linuxinder",
  },
  description,
  applicationName: SITE_NAME,
  authors: [{ name: "Piotr Wittig", url: "https://piotrwittig.com" }],
  creator: "Piotr Wittig",
  keywords: [
    "Linux",
    "Linux distro",
    "which Linux distro",
    "distro quiz",
    "distro picker",
    "Linux distribution comparison",
    "swipe",
    "satire",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    siteName: SITE_NAME,
    type: "website",
    url: SITE_URL,
    locale: "en",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

// Tells a search engine what this thing is rather than leaving it to guess from
// a page whose only real content is a deck of cards rendered on the client.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  applicationCategory: "EntertainmentApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  inLanguage: "en",
  isFamilyFriendly: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: {
    "@type": "Person",
    name: "Piotr Wittig",
    url: "https://piotrwittig.com",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          // The payload is a literal defined above, not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
