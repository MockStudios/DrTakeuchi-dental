import Link from "next/link";
import { coreServices, site } from "@/lib/site";

export default function LaunchFooter() {
  return (
    <footer className="launchFooter">
      <div className="launchFooterGrid shell">
        <div>
          <img
            className="launchFooterLogo"
            src="/uploads/Doug-Takeuchi-Logo-dark.png"
            alt={site.name}
          />
          <p>
            {site.address.street}<br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </p>
          <p>
            <a href={site.phoneHref}>{site.phoneDisplay}</a><br />
            {site.hoursDisplay}
          </p>
        </div>

        <div>
          <h3>Care</h3>
          <nav aria-label="Dental services">
            {coreServices.map(([label, href]) => (
              <Link key={href} href={href}>{label}</Link>
            ))}
          </nav>
        </div>

        <div>
          <h3>Patients</h3>
          <nav aria-label="Patient information">
            <Link href="/new-patients">New Patients</Link>
            <Link href="/reviews">Reviews</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>

        <div>
          <h3>Visit</h3>
          <nav aria-label="Visit and legal">
            <a href={site.directionsHref} target="_blank" rel="noreferrer">
              Directions
            </a>
            <a href={site.yelpHref} target="_blank" rel="noreferrer">
              Yelp Reviews
            </a>
            <Link href="/privacy">Privacy</Link>
            <Link href="/accessibility">Accessibility</Link>
            <Link href="/website-disclaimer">Website Disclaimer</Link>
          </nav>
        </div>
      </div>

      <p className="launchFooterLegal shell">
        © {new Date().getFullYear()} {site.name} · All rights reserved
      </p>
    </footer>
  );
}
