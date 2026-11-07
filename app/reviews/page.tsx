import type { Metadata } from "next";
import Link from "next/link";
import LiteYouTube from "@/components/LiteYouTube";
import { handwrittenLetters, reviews, videoTestimonials } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Patient Reviews",
  description:
    "Read what San Jose patients say about Doug Takeuchi, DDS — Yelp reviews, video testimonials and handwritten thank-you letters.",
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
        4.6 average · 31 Google reviews ·{" "}
        <a href={site.yelpHref} target="_blank" rel="noreferrer">Read reviews on Yelp ↗</a>
      </p>

      <section className="reviewSection" aria-labelledby="yelp-reviews">
        <h2 id="yelp-reviews">Yelp reviews</h2>
        <div className="reviewGrid">
          {reviews.map((review) => (
            <figure className="reviewCard" key={review.name}>
              <div className="reviewStars" aria-label={`${review.stars} out of 5 stars`}>
                {"★".repeat(review.stars)}
              </div>
              <blockquote><p>“{review.text}”</p></blockquote>
              <figcaption>
                {review.name}
                <span>Yelp review</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="reviewSection" id="videos" aria-labelledby="video-testimonials">
        <h2 id="video-testimonials">Video testimonials</h2>
        <p>Patients describe their experience with Dr. Takeuchi and the team.</p>
        <div className="videoGrid">
          {videoTestimonials.map((id, i) => (
            <LiteYouTube key={id} id={id} title={`Patient testimonial video ${i + 1} of ${videoTestimonials.length}`} />
          ))}
        </div>
      </section>

      <section className="reviewSection" id="letters" aria-labelledby="handwritten-letters">
        <h2 id="handwritten-letters">Handwritten thank-you letters</h2>
        <p>Notes and letters patients have sent to the office over the years.</p>
        <div className="letterGrid">
          {handwrittenLetters.map((n) => (
            <a key={n} href={`/images/reviews/letter-${n}.webp`} target="_blank" rel="noreferrer">
              <img
                src={`/images/reviews/letter-${n}.webp`}
                alt={`Handwritten thank-you letter from a patient (${n} of ${handwrittenLetters.length})`}
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </section>

      <div className="emergencyActions">
        <Link className="primaryAction" href={site.appointmentHref}>Request an Appointment</Link>
        <a className="secondaryAction" href={site.phoneHref}>Call {site.phoneDisplay}</a>
      </div>
    </main>
  );
}
