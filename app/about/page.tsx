import type { Metadata } from "next";
import Link from "next/link";
import { credentials, practiceHighlights, reviews } from "@/lib/content";
import { site } from "@/lib/site";

// Backs up the "personally answers patient emails" line above.
const patientNote = reviews.find((r) => r.name === "Insightful G.")!;

export const metadata: Metadata = {
  title: "About Dr. Takeuchi",
  description:
    "Meet Dr. Doug Takeuchi, DDS — raised in San Jose, trained at UCSF, and recognized with the Quintessence Award and honors from the American College of Dentists.",
  alternates: { canonical: "/about" },
};

const photos = [
  ["/uploads/SmilingClinicTeamPortrait.webp", "Dr. Takeuchi with the smiling dental team", "Our Team"],
  ["/uploads/TakeuchiExterior.webp", "Doug Takeuchi DDS office at 189 N Bascom Ave, San Jose", "Our Office"],
  ["/uploads/Parentchild-Waitingroom.webp", "Family reading together in the waiting room", "Family Friendly"],
];

export default function Page() {
  return (
    <main className="contentPage shell">
      <p className="eyebrow">About the Practice</p>
      <h1>Clinical precision. Calm, human care.</h1>

      <div className="aboutIntro">
        <img className="aboutPortrait" src="/uploads/DTakeuchiHeadshot.webp" alt="Dr. Doug Takeuchi, DDS" />

        <div>
          <p className="lede">
            With over 20 years of practice in San Jose, Dr. Takeuchi has built a reputation
            for combining clinical excellence with genuine warmth. He personally answers
            patient emails — because to him, every patient is a guest.
          </p>
          <p>
            His office features high-tech diagnostic equipment, in-ceiling DirecTV and
            multiple sedation options — because great dentistry shouldn’t mean suffering
            through it.
          </p>

          <h2>Rooted in San Jose</h2>
          <p>
            Dr. Takeuchi grew up in the San Jose area and graduated from Leigh High School. He
            and his wife married in 1994 and raised their two children here. An avid
            football fan who enjoys skiing and scuba diving, he’s proud to serve the community
            where he grew up.
          </p>

          <h2>What to expect</h2>
          <ul className="checkList">
            {practiceHighlights.map((item) => <li key={item}>{item}</li>)}
          </ul>

          <h2>Education &amp; credentials</h2>
          <ul className="checkList">
            {credentials.map((item) => <li key={item}>{item}</li>)}
          </ul>

          <figure className="reviewCard aboutReview">
            <div className="reviewStars" aria-label={`${patientNote.stars} out of 5 stars`}>
              {"★".repeat(patientNote.stars)}
            </div>
            <blockquote><p>“{patientNote.text}”</p></blockquote>
            <figcaption>
              {patientNote.name}
              <span>Yelp review · <Link href="/reviews">More patient reviews</Link></span>
            </figcaption>
          </figure>
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
