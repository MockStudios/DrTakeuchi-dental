import type { Metadata } from "next";
import AppointmentForm from "@/components/AppointmentForm";

export const metadata: Metadata = {
  title: "Dental Implants San Jose, CA",
  description:
    "Explore dental implants and tooth replacement options with Doug Takeuchi, DDS in San Jose.",
  alternates: { canonical: "/dental-implants-san-jose" },
};

export default function Page() {
  return (
    <main className="contentPage shell">
      <p className="eyebrow">Tooth Replacement</p>
      <h1>Replace a missing tooth with a plan you understand.</h1>
      <p className="lede">
        Compare implants, bridges and removable options in plain language,
        then discuss candidacy, timeline, comfort, maintenance and cost factors.
      </p>

      <section className="comparisonTable">
        <div><strong>Option</strong><strong>Implant</strong><strong>Bridge</strong><strong>Removable</strong></div>
        <div><span>Fixed</span><span>Often</span><span>Yes</span><span>No</span></div>
        <div><span>Neighboring teeth involved</span><span>Usually no</span><span>Often</span><span>No</span></div>
        <div><span>Timeline</span><span>Longer</span><span>Moderate</span><span>Often shorter</span></div>
      </section>

      <AppointmentForm source="implant_page" />
    </main>
  );
}
