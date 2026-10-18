import type { Metadata } from "next";
import "./globals.css";
import "@/styles/entry-tier-launch.css";
import LocalSchema from "@/components/LocalSchema";
import SiteHeader from "@/components/SiteHeader";
import LaunchFooter from "@/components/LaunchFooter";
import PersistentConversionBar from "@/components/PersistentConversionBar";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "San Jose Dentist | Doug Takeuchi, DDS",
    template: "%s | Doug Takeuchi, DDS",
  },
  description: site.description,
  alternates: { canonical: "/" },
  icons: { icon: "/uploads/TakeuchiFavicon-e9fd53c7.png" },
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700;800&display=swap"
        />
      </head>
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
