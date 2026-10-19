import Link from "next/link";
import { reviews } from "@/lib/content";
import { site } from "@/lib/site";

// Each theme is illustrated by one of the Yelp reviews in lib/content.
const themes = [
  ["Dental anxiety", "Amanda T."],
  ["Clear explanations", "Tobi B."],
  ["Family trust", "Jeff T."],
  ["Modern care", "Quynh P."],
];

const proof = themes.map(([label, name]) => ({
  label,
  review: reviews.find((r) => r.name === name)!,
}));

export default function PatientProofSection() {
  return (
    <section className="launchSection proofSection" id="reviews">
      <div className="launchShell">
        <div className="launchSectionHead launchSectionHeadSplit">
          <div>
            <span className="launchEyebrow">Patient proof</span>
            <h2>What patients say they value.</h2>
          </div>
          <p>Comfort, clear explanations and long-term trust — in patients’ own words.</p>
        </div>
        <div className="proofGrid">
          {proof.map(({ label, review }) => (
            <figure className="proofCard" key={label}>
              <span className="proofLabel">{label}</span>
              <blockquote>“{review.text}”</blockquote>
              <figcaption className="proofSource">{review.name} · Verified Yelp Review</figcaption>
            </figure>
          ))}
        </div>
        <div className="proofFooter">
          <p>
            4.6 average · 31 Google reviews ·{" "}
            <a href={site.yelpHref} target="_blank" rel="noreferrer">Read reviews on Yelp ↗</a>
          </p>
          <Link href="/reviews" className="launchTextLink">Read patient experiences →</Link>
        </div>
      </div>
    </section>
  );
}
