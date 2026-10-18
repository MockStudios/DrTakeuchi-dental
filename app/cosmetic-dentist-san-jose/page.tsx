import type { Metadata } from "next";
import AppointmentForm from "@/components/AppointmentForm";

export const metadata: Metadata = {
  title: "Cosmetic Dentist San Jose, CA",
  description: "Cosmetic dentistry in San Jose including whitening, bonding, veneers and restorative smile options.",
  alternates: { canonical: "/cosmetic-dentist-san-jose" },
};

export default function Page() {
  return (
    <main className="contentPage shell">
      <p className="eyebrow">San Jose Dental Care</p>
      <h1>Cosmetic dentistry should start with what you want to change.</h1>
      <p className="lede">Color, shape, chips, spacing and worn teeth can each lead to different treatment options.</p>

      <section className="contentGrid">
        <article>
          <h2>Teeth whitening</h2>
          <p>Professional whitening treatments that deliver dramatically brighter results safely, quickly, and effectively.</p>
        </article>
        <article>
          <h2>Porcelain veneers</h2>
          <p>Ultra-thin porcelain shells that correct chips, gaps, stains, and shape — transforming your smile in just two visits.</p>
        </article>
        <article>
          <h2>Dental bonding</h2>
          <p>Tooth-colored resin that repairs small chips, gaps and uneven edges.</p>
        </article>
        <article>
          <h2>Smile makeovers</h2>
          <p>A combined plan — whitening, bonding, veneers or crowns — designed around what you want to change.</p>
        </article>
      </section>

      <img
        className="featureImage"
        src="/uploads/BeforeAfter-Whitening.jpeg"
        alt="Teeth whitening before and after results"
        loading="lazy"
      />

      <AppointmentForm source="cosmetic-dentist-san-jose" />
    </main>
  );
}
