import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return (
    <main className="contentPage shell">
      <h1>Privacy Policy</h1>
      <p>
        This website collects only the information you choose to send through its
        appointment request and contact forms — such as your name, phone number, email
        address and the reason for your visit. Form submissions are delivered to the office
        through Formspree, a third-party form service, and are used only to respond to
        your request.
      </p>
      <p>
        Please do not send sensitive medical information, insurance ID numbers or payment
        details through this website. Call the office instead.
      </p>
      <p>
        The homepage shows an embedded Google Map of the office. Google may receive your
        browser’s IP address when the map loads.
      </p>
      <p>
        Questions about this policy? Call {site.phoneDisplay} or write to {site.name},{" "}
        {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}.
      </p>
    </main>
  );
}
