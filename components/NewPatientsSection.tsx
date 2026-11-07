import AppointmentForm from "@/components/AppointmentForm";
import { newPatients } from "@/lib/content";
import { site } from "@/lib/site";

// The /new-patients page as a homepage section, using the same copy and appointment form.
export default function NewPatientsSection() {
  return (
    <section className="launchSection newPatientsSection" id="new-patients">
      <div className="launchShell newPatientsGrid">
        <div className="newPatientsCopy">
          <span className="launchEyebrow">New patients</span>
          <h2>{newPatients.title}</h2>
          <p className="newPatientsLede">{newPatients.lede}</p>
          <div className="newPatientsTopics">
            {newPatients.topics.map(({ title, body }) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <p className="newPatientsCall">
            Questions? Call <a href={site.phoneHref}>{site.phoneDisplay}</a>.
          </p>
        </div>
        <AppointmentForm source="home_new_patients" />
      </div>
    </section>
  );
}
