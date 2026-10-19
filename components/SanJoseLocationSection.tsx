"use client";

import { site } from "@/lib/site";
import { events } from "@/lib/analytics";

const mapSrc =
  "https://www.google.com/maps?q=189%20North%20Bascom%20Avenue%20Suite%20110%20San%20Jose%20CA%2095128&output=embed";

export default function SanJoseLocationSection() {
  return (
    <section className="launchSection locationSection" id="location">
      <div className="launchShell locationGrid">
        <div className="locationCopy">
          <span className="launchEyebrow">San Jose, California</span>
          <h2>Your San Jose dentist.</h2>
          <address>
            {site.address.street}<br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </address>
          <p className="locationHours">{site.hoursDisplay}</p>
          <p>
            Near Bascom Avenue — just minutes from Rose Garden, Willow Glen, Campbell, West San
            Jose, Burbank and downtown San Jose.
          </p>
          <div className="launchActions">
            <a
              className="launchButton launchButtonPrimary"
              href={site.directionsHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => events.directions("homepage_location")}
            >
              Get Directions
            </a>
            <a className="launchButton launchButtonGhost" href={site.phoneHref} onClick={() => events.phone("homepage_location")}>
              Call {site.phoneDisplay}
            </a>
          </div>
        </div>
        <div className="locationMap">
          <iframe
            title="Map showing Doug Takeuchi, DDS in San Jose"
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
