import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import "@/styles/entry-tier-launch.css";
import "@/styles/launch-tier-completion.css";
import LocalSchema from "@/components/LocalSchema";
import SiteHeader from "@/components/SiteHeader";
import LaunchFooter from "@/components/LaunchFooter";
import PersistentConversionBar from "@/components/PersistentConversionBar";
import { site } from "@/lib/site";

// Self-hosted at build time, so no request to Google Fonts blocks the first paint.
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "San Jose Dentist | Doug Takeuchi, DDS",
    template: "%s | Doug Takeuchi, DDS",
  },
  description: site.description,
  alternates: { canonical: "/" },
  // Preview only: keep search engines out until the practice approves. Remove at launch.
  robots: { index: false, follow: false },
  icons: {
    icon: [
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Doug Takeuchi, DDS | San Jose Dentist",
    description: site.description,
    type: "website",
    locale: "en_US",
    url: site.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        <LocalSchema />
        <SiteHeader />
        {children}
        <LaunchFooter />
        <PersistentConversionBar />
      </body>
    </html>
  );
}
