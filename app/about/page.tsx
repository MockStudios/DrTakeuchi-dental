import type { Metadata } from "next";
import Link from "next/link";
import { credentials, practiceHighlights } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Dr. Takeuchi",
  description:
    "Meet Dr. Doug Takeuchi, DDS, a UCSF-trained San Jose dentist with over 20 years of practice in comfortable family, cosmetic and restorative care.",
  alternates: { canonical: "/about" },
};

const photos = [
  ["/uploads/TakeuchiTeamShot.jpeg", "Dr. Takeuchi and the dental team", "Our Team"],
  ["/uploads/TakeuchiOfficeExterior.jpeg", "Doug Takeuchi DDS office at 189 N Bascom Ave, San Jose", "Our Office"],
  ["/uploads/Parentchild-Waitingroom.jpeg", "Family reading together in the waiting room", "Family Friendly"],
];

export default function Page() {
  return (
    <main className="contentPage shell">
      <p className="eyebrow">About the Practice</p>
      <h1>Clinical precision. Calm, human care.</h1>

      <div className="aboutIntro">
        <img className="aboutPortrait" src="/uploads/DTakeuchiHeadshot.jpeg" alt="Dr. Doug Takeuchi, DDS" />

        <div>
          <p className="lede">
            With over 20 years of practice in San Jose, Dr. Takeuchi has built a reputation
            for combining clinical excellence with genuine warmth. He personally answers
            patient emails — because to him, every patient is a guest.
          </p>
          <p>
            His office features high-tech diagnostic equipment, in-ceiling DirectTV and
            multiple sedation options — because great dentistry shouldn’t mean suffering
            through it.
          </p>

          <h2>What to expect</h2>
          <ul className="checkList">
            {practiceHighlights.map((item) => <li key={item}>{item}</li>)}
          </ul>

          <h2>Education &amp; credentials</h2>
          <ul className="checkList">
            {credentials.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>

      <section className="photoGrid" aria-label="The practice">
        {photos.map(([src, alt, caption]) => (
          <figure key={src}>
            <img src={src} alt={alt} loading="lazy" />
            <figcaption>{caption}</figcaption>
          </figure>
        ))}
      </section>

      <div className="emergencyActions">
        <Link className="primaryAction" href={site.appointmentHref}>Request an Appointment</Link>
        <a className="secondaryAction" href={site.phoneHref}>Call {site.phoneDisplay}</a>
      </div>
    </main>
  );
}
