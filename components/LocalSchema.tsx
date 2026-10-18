import { site } from "@/lib/site";

export default function LocalSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Dentist", "LocalBusiness"],
    "@id": `${site.url}/#dentist`,
    name: site.name,
    url: site.url,
    telephone: site.phoneDisplay,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: site.hours.days,
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
    hasMap: site.directionsHref,
    areaServed: { "@type": "City", name: "San Jose" },
    sameAs: site.social,
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
