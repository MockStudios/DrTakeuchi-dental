import Link from "next/link";

const items = [
  ["New Patients", "First visit • forms • what to expect", "/new-patients"],
  ["Insurance & Financing", "Benefits • payment options • treatment planning", "/new-patients#payment"],
  ["Office", "San Jose • directions • practical visit information", "/contact"],
  ["Questions", "Call the office or request an appointment", "/contact#appointment"],
];

export default function PatientInfoSection() {
  return (
    <section className="launchSection patientInfoSection">
      <div className="launchShell">
        <div className="launchSectionHead">
          <span className="launchEyebrow">Before your visit</span>
          <h2>Everything you need before your appointment.</h2>
        </div>
        <div className="patientInfoGrid">
          {items.map(([title, meta, href]) => (
            <Link className="patientInfoCard" href={href} key={title}>
              <h3>{title}</h3>
              <p>{meta}</p>
              <span>Explore →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
