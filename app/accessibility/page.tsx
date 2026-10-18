import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility",
  alternates: { canonical: "/accessibility" },
};

export default function Page() {
  return (
    <main className="contentPage shell">
      <h1>Accessibility</h1>
      <p>
        This site is intended to support keyboard navigation, readable contrast,
        semantic structure, meaningful alternative text and reduced-motion preferences.
      </p>
      <p>
        If you have trouble using any part of this site, call{" "}
        <a href={site.phoneHref}>{site.phoneDisplay}</a> and the team will help.
      </p>
    </main>
  );
}
