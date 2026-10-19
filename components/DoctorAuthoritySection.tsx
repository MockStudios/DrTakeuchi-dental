import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const points = [
  ["Clear explanations", "Understand what is happening, what the options are, and what comes next."],
  ["Comfort-first care", "Dental anxiety and past difficult experiences can be part of the care plan."],
  ["Modern diagnostics", "Current technology and visual explanations make treatment easier to understand."],
  ["Family + restorative care", "One practice for preventive, restorative, cosmetic and long-term family dentistry."],
];

export default function DoctorAuthoritySection() {
  return (
    <section className="launchSection authoritySection" id="doctor">
      <div className="launchShell authorityGrid">
        <div className="authorityImageWrap">
          <Image
            src="/uploads/SmilingClinicTeamPortrait.webp"
            alt="Dr. Doug Takeuchi with his dental team in the San Jose office"
            width={1678}
            height={937}
            className="authorityImage"
            sizes="(max-width: 900px) 100vw, 52vw"
          />
        </div>
        <div className="authorityCopy">
          <span className="launchEyebrow">Meet the practice</span>
          <h2>The person behind the plan.</h2>
          <p className="authorityIntro">
            Great dentistry is not only about what gets treated. It is about understanding the
            person sitting in the chair, explaining the options clearly, and making the next step
            feel manageable.
          </p>
          <div className="authorityName">
            <strong>{site.name}</strong>
            <span>UCSF School of Dentistry · 20+ years in San Jose</span>
          </div>
          <div className="authorityPoints">
            {points.map(([title, body]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <div className="launchActions">
            <Link href="/about" className="launchButton launchButtonPrimary">Meet Dr. Takeuchi</Link>
            <Link href={site.appointmentHref} className="launchButton launchButtonGhost">Request an Appointment</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
