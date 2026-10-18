import type { Metadata } from "next";
import Link from "next/link";
import AppointmentForm from "@/components/AppointmentForm";

export const metadata: Metadata = {
  title: "Family Dentist San Jose, CA",
  description: "Family dental care in San Jose for children, adults and families.",
  alternates: { canonical: "/family-dentist-san-jose" },
};

export default function Page() {
  return (
    <main className="contentPage shell">
      <p className="eyebrow">San Jose Dental Care</p>
      <h1>Dental care for the whole household.</h1>
      <p className="lede">
        Comprehensive preventive and restorative care for every member of your family —
        from children’s first visits to senior smile maintenance.
      </p>

      <section className="contentGrid">
        <article>
          <h2>Checkups &amp; cleanings</h2>
          <p>Regular exams and professional cleanings help catch small problems early, while they’re simpler to treat.</p>
        </article>
        <article>
          <h2>Children’s dentistry</h2>
          <p>Gentle, kid-friendly care that builds healthy habits and creates positive dental experiences from the very first visit.</p>
        </article>
        <article>
          <h2>Nervous family members</h2>
          <p>
            Comfort and <Link href="/sedation-dentistry-san-jose">sedation options</Link> are
            available for patients who feel anxious about dental visits.
          </p>
        </article>
        <article>
          <h2>When something needs repair</h2>
          <p>
            Fillings, crowns and other <Link href="/restorative-dentistry-san-jose">restorative care</Link> are
            handled in the same familiar office.
          </p>
        </article>
      </section>

      <AppointmentForm source="family-dentist-san-jose" />
    </main>
  );
}
