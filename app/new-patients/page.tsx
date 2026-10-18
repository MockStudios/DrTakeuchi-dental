import type { Metadata } from "next";
import AppointmentForm from "@/components/AppointmentForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "New Dental Patients in San Jose",
  description:
    "New patients are welcome at Doug Takeuchi, DDS in San Jose. Learn what to expect and request your first appointment.",
  alternates: { canonical: "/new-patients" },
};

export default function Page() {
  return (
    <main className="contentPage shell">
      <p className="eyebrow">New Patients</p>
      <h1>Your first visit should feel easy.</h1>
      <p className="lede">
        Whether it has been six months or several years since your last visit,
        the goal is to understand where you are now and help you leave with a clear plan.
      </p>

      <section className="contentGrid">
        <article>
          <h2>What to expect</h2>
          <p>Conversation, exam, appropriate imaging and a review of next steps.</p>
        </article>
        <article>
          <h2>Nervous about the dentist?</h2>
          <p>Tell the team before your visit so comfort can be part of the plan from the start.</p>
        </article>
        <article>
          <h2>Before you arrive</h2>
          <p>Bring identification, requested forms and insurance information if applicable.</p>
        </article>
        <article>
          <h2>Questions about payment?</h2>
          <p>
            The office accepts most major dental insurance plans and offers CareCredit financing.
            No insurance? You’re welcome too — call {site.phoneDisplay} to discuss options.
          </p>
        </article>
      </section>

      <p>Questions? Call {site.phoneDisplay}.</p>
      <AppointmentForm source="new_patients" />
    </main>
  );
}
