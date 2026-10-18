"use client";

import { useState } from "react";
import { events } from "@/lib/analytics";
import { site } from "@/lib/site";

export default function AppointmentForm({
  source = "contact_page",
}: {
  source?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    events.appointmentStart(source);
    setStatus("sending");

    // Do not collect diagnosis, medication, insurance IDs, or other PHI here.
    // URL-encoded keeps this a simple CORS request (no preflight) to Formspree.
    const body = new URLSearchParams();
    new FormData(e.currentTarget).forEach((value, key) => body.append(key, String(value)));
    body.append("form", `Appointment request (${source})`);
    body.append("_subject", "New appointment request — drtakeuchi website");

    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`);
    } catch {
      setStatus("error");
      return;
    }

    events.appointmentComplete(source);
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="appointmentForm" role="status" id="appointment">
        <h3>Thanks. Your request has been received.</h3>
        <p>
          The office will follow up during business hours ({site.hoursDisplay}). If you
          need help sooner, call <a href={site.phoneHref}>{site.phoneDisplay}</a>.
        </p>
      </div>
    );
  }

  return (
    <form className="appointmentForm" onSubmit={submit} id="appointment">
      <label>
        What can we help with?
        <select name="reason" defaultValue="" required>
          <option value="" disabled>Select one</option>
          <option value="emergency">Tooth pain / emergency</option>
          <option value="broken">Broken tooth / crown / filling</option>
          <option value="anxiety">Dental anxiety / sedation</option>
          <option value="implant">Missing tooth / dental implant</option>
          <option value="cosmetic">Cosmetic dentistry</option>
          <option value="family">Cleaning / checkup / family care</option>
          <option value="other">Other</option>
        </select>
      </label>

      <div className="formSplit">
        <label>
          First name
          <input name="firstName" autoComplete="given-name" required />
        </label>
        <label>
          Phone
          <input name="phone" autoComplete="tel" inputMode="tel" required />
        </label>
      </div>

      <label>
        Email
        <input name="email" type="email" autoComplete="email" />
      </label>

      <label>
        New patient?
        <select name="patientStatus" defaultValue="new">
          <option value="new">Yes</option>
          <option value="existing">No, existing patient</option>
        </select>
      </label>

      <label>
        Preferred contact
        <select name="contactPreference" defaultValue="phone">
          <option value="phone">Phone</option>
          <option value="text">Text</option>
          <option value="email">Email</option>
        </select>
      </label>

      {status === "error" && (
        <p className="formError" role="alert">
          Sorry, your request didn’t go through. Please try again or call{" "}
          <a href={site.phoneHref}>{site.phoneDisplay}</a>.
        </p>
      )}

      <button disabled={status === "sending"} type="submit">
        {status === "sending" ? "Sending…" : "Request an Appointment"}
      </button>

      <p className="formPrivacyNote">
        Please do not send sensitive medical information through this form.
      </p>
    </form>
  );
}
