import type { Metadata } from "next";
import Link from "next/link";
import AppointmentForm from "@/components/AppointmentForm";

export const metadata: Metadata = {
  title: "Restorative Dentistry San Jose, CA",
  description: "Restorative dentistry in San Jose for damaged, worn or compromised teeth.",
  alternates: { canonical: "/restorative-dentistry-san-jose" },
};

export default function Page() {
  return (
    <main className="contentPage shell">
      <p className="eyebrow">San Jose Dental Care</p>
      <h1>Repair what hurts. Restore what matters.</h1>
      <p className="lede">
        Crowns, fillings, bridges and root canal treatment that repair damaged teeth,
        restore full function and blend naturally with your smile.
      </p>

      <section className="contentGrid">
        <article>
          <h2>Tooth-colored fillings</h2>
          <p>Composite resin fillings that match your natural tooth color, leaving no visible trace of the repair.</p>
        </article>
        <article>
          <h2>Dental crowns</h2>
          <p>Natural-looking porcelain crowns that protect damaged teeth and blend seamlessly with your surrounding smile.</p>
        </article>
        <article>
          <h2>Root canal treatment</h2>
          <p>Modern, comfortable root canal treatment to save infected teeth and relieve pain — often completed in a single visit.</p>
        </article>
        <article>
          <h2>Bridges &amp; tooth replacement</h2>
          <p>
            Fixed bridges, dentures and <Link href="/dental-implants-san-jose">dental implants</Link> for
            one or more missing teeth.
          </p>
        </article>
      </section>

      <AppointmentForm source="restorative-dentistry-san-jose" />
    </main>
  );
}
