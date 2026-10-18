import type { Metadata } from "next";
import AppointmentForm from "@/components/AppointmentForm";

export const metadata: Metadata = {
  title: "Sedation Dentistry San Jose, CA",
  description:
    "Explore comfort-focused dental care and sedation options for anxious dental patients in San Jose.",
  alternates: { canonical: "/sedation-dentistry-san-jose" },
};

export default function Page() {
  return (
    <main className="contentPage shell">
      <p className="eyebrow">Comfort-Focused Dentistry</p>
      <h1>Nervous about dental care?</h1>
      <p className="lede">
        Dental anxiety can be part of the care plan. Start by telling the team what makes dental visits difficult for you.
      </p>
      <p>
        Options include nitrous oxide (laughing gas) and oral sedation, discussed with you before treatment.
      </p>

      <section className="contentGrid">
        <article><h2>Mild nerves</h2><p>Clear explanations, pacing and extra time can help.</p></article>
        <article><h2>Strong anxiety</h2><p>Discuss available comfort and sedation options before treatment.</p></article>
        <article><h2>Long gap since your last visit</h2><p>Start where you are now, without judgment.</p></article>
        <article><h2>Past difficult experience</h2><p>Share what happened so the team can understand what you need.</p></article>
      </section>

      <AppointmentForm source="sedation_page" />
    </main>
  );
}
