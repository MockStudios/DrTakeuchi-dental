import type { Metadata } from "next";
import AppointmentForm from "@/components/AppointmentForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Emergency Dentist San Jose, CA",
  description:
    "Need help with severe tooth pain, swelling, a broken tooth or lost crown? Contact Doug Takeuchi, DDS in San Jose.",
  alternates: { canonical: "/emergency-dentist-san-jose" },
};

// General first-aid guidance (consistent with ADA patient advice); the practice should review.
const concerns = [
  [
    "Severe tooth pain",
    "Rinse with warm water and gently floss to clear any trapped food, then call the office. Don’t put aspirin or other pain relievers directly on the gums — it can burn the tissue.",
  ],
  [
    "Swelling or suspected infection",
    "Call the office promptly — infections can spread. A cold compress on the outside of the cheek may ease swelling. If swelling affects your breathing or swallowing, call 911 or go to the nearest emergency room.",
  ],
  [
    "Broken or cracked tooth",
    "Save any pieces and rinse your mouth with warm water. Press gauze on any bleeding for about 10 minutes and use a cold compress for swelling. Avoid chewing on that side until you’re seen.",
  ],
  [
    "Lost crown or filling",
    "Keep the crown or filling and bring it with you. Avoid chewing on that side and call to schedule a visit — exposed tooth structure can be sensitive and easier to damage.",
  ],
  [
    "Knocked-out tooth",
    "Pick the tooth up by the crown, not the root. Rinse it briefly if dirty, but don’t scrub it. Keep it moist in milk and call right away — the best chance of saving it is within about an hour.",
  ],
  [
    "Dental trauma",
    "Rinse gently and use a cold compress for swelling, then call so your teeth, gums and bite can be checked. For a head injury, loss of consciousness or bleeding that won’t stop, call 911.",
  ],
];

export default function Page() {
  return (
    <main className="contentPage shell">
      <p className="eyebrow">Urgent Dental Care • San Jose</p>
      <h1>A dental problem shouldn’t leave you guessing what to do next.</h1>
      <p className="lede">
        If you have severe pain, swelling, a broken tooth, a lost restoration or trauma,
        call the office. For life-threatening emergencies, call 911.
      </p>

      <div className="emergencyActions">
        <a className="primaryAction" href={site.phoneHref}>
          Call {site.phoneDisplay}
        </a>
        <a className="secondaryAction" href="#appointment">
          Request Appointment
        </a>
      </div>

      <section className="concernGrid">
        {concerns.map(([title, advice]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{advice}</p>
          </article>
        ))}
      </section>

      <AppointmentForm source="emergency_page" />
    </main>
  );
}
