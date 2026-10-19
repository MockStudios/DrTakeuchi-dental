import Link from "next/link";
import { site } from "@/lib/site";

const items = [
  ["Insurance", "Most major dental insurance plans are accepted. Bring your insurance information to your first visit."],
  ["Financing", "CareCredit financing and flexible payment plans are available. No insurance? You’re welcome too."],
  ["Treatment plans", "Talk through priorities, timing and options before deciding on care, so the plan fits you."],
];

export default function InsuranceFinancingSection() {
  return (
    <section className="launchSection financeSection" id="payment-options">
      <div className="launchShell">
        <div className="launchSectionHead launchSectionHeadSplit">
          <div>
            <span className="launchEyebrow">Financial clarity</span>
            <h2>Care should feel financially understandable too.</h2>
          </div>
          <p>
            Ask about your benefits, payment options and timing before you commit to treatment.
            Questions? Call <a href={site.phoneHref}>{site.phoneDisplay}</a>.
          </p>
        </div>
        <div className="financeGrid">
          {items.map(([title, body], i) => (
            <article className="financeCard" key={title}>
              <span className="financeNumber">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <Link href="/new-patients#payment" className="launchTextLink">Explore payment options →</Link>
      </div>
    </section>
  );
}
