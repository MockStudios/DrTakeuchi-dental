import type { Metadata } from "next";
import AppointmentForm from "@/components/AppointmentForm";
import { newPatients } from "@/lib/content";
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
      <h1>{newPatients.title}</h1>
      <p className="lede">{newPatients.lede}</p>

      <section className="contentGrid">
        {newPatients.topics.map(({ id, title, body }) => (
          <article key={title} id={id}>
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <p>Questions? Call {site.phoneDisplay}.</p>
      <AppointmentForm source="new_patients" />
    </main>
  );
}
