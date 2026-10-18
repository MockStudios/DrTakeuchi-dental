import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Disclaimer",
  alternates: { canonical: "/website-disclaimer" },
};

export default function Page() {
  return (
    <main className="contentPage shell">
      <h1>Website Disclaimer</h1>
      <p>
        Information on this website is for general educational purposes and is not a
        substitute for diagnosis or individualized dental advice.
      </p>
      <p>If you believe you are experiencing a life-threatening emergency, call 911.</p>
    </main>
  );
}
