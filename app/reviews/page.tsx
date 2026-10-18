import type { Metadata } from "next";
import Link from "next/link";
import { reviews } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Patient Reviews",
  description:
    "Read what San Jose patients say about Doug Takeuchi, DDS — comfortable, clearly explained dental care for anxious patients and families.",
  alternates: { canonical: "/reviews" },
};

export default function Page() {
  return (
    <main className="contentPage shell">
      <p className="eyebrow">Patient Experiences</p>
      <h1>What San Jose patients say.</h1>
      <p className="lede">
        Patients — including many who used to dread the dentist — describe care that is
        unhurried, clearly explained and comfortable.
      </p>
      <p className="reviewSummary">
        5.0 average ·{" "}
        <a href={site.yelpHref} target="_blank" rel="noreferrer">500+ reviews on Yelp ↗</a>
      </p>

      <section className="reviewGrid" aria-label="Selected patient reviews">
        {reviews.map((review) => (
          <figure className="reviewCard" key={review.name}>
            <div className="reviewStars" aria-label={`${review.stars} out of 5 stars`}>
              {"★".repeat(review.stars)}
            </div>
            <blockquote><p>“{review.text}”</p></blockquote>
            <figcaption>
              {review.name}
              <span>Verified Yelp Review</span>
            </figcaption>
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
