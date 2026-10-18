import type { Metadata } from "next";
import AppointmentForm from "@/components/AppointmentForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact a San Jose Dentist",
  description:
    "Contact Doug Takeuchi, DDS in San Jose, CA. Call, get directions or request an appointment.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return (
    <main className="contentPage shell">
      <p className="eyebrow">Contact</p>
      <h1>Tell us what you need help with.</h1>

      <div className="contactPanel">
        <div>
          <h2>{site.name}</h2>
          <p>
            {site.address.street}<br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </p>
          <p><a href={site.phoneHref}>{site.phoneDisplay}</a></p>
          <p>{site.hoursDisplay}</p>
          <p>
            <a href={site.directionsHref} target="_blank" rel="noreferrer">
              Get Directions
            </a>
          </p>
        </div>

        <AppointmentForm source="contact_page" />
      </div>
    </main>
  );
}
