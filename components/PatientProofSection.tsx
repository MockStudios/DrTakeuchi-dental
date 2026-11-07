import Link from "next/link";
import { handwrittenLetters, reviews, videoTestimonials } from "@/lib/content";
import { site } from "@/lib/site";

// Each theme is illustrated by one of the Yelp reviews in lib/content.
const themes = [
  ["Dental anxiety", "Amanda T."],
  ["Clear explanations", "Tobi B."],
  ["No more dread", "Mike L."],
  ["Modern care", "Quynh P."],
  ["Family trust", "Jeff T."],
  ["Personal attention", "Insightful G."],
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
              <blockquote>“{review.excerpt}”</blockquote>
              <figcaption className="proofSource">{review.name} · Yelp review</figcaption>
            </figure>
          ))}
        </div>
        <div className="proofMedia">
          <Link href="/reviews#videos" className="proofMediaCard">
            <span className="proofMediaThumb">
              <img src={`/images/reviews/video-${videoTestimonials[0]}.webp`} alt="" loading="lazy" />
              <span className="liteYouTubePlay" aria-hidden="true" />
            </span>
            <span>
              <strong>{videoTestimonials.length} video testimonials</strong>
              <span>Patients describe their care in their own words.</span>
            </span>
          </Link>
          <Link href="/reviews#letters" className="proofMediaCard">
            <span className="proofMediaThumb">
              <img src="/images/reviews/letter-6.webp" alt="" loading="lazy" />
            </span>
            <span>
              <strong>{handwrittenLetters.length} handwritten thank-you letters</strong>
              <span>Notes patients sent to Dr. Takeuchi and the team.</span>
            </span>
          </Link>
        </div>
        <div className="proofFooter">
          <p>
            4.6 average · 31 Google reviews ·{" "}
            <a href={site.yelpHref} target="_blank" rel="noreferrer">Read reviews on Yelp ↗</a>
          </p>
          <Link href="/reviews" className="launchTextLink">See all patient reviews →</Link>
        </div>
      </div>
    </section>
  );
}
