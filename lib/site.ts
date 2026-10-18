const yelpHref = "https://www.yelp.com/biz/doug-takeuchi-dds-san-jose";

export const site = {
  name: "Doug Takeuchi, DDS",
  url: "https://www.drtakeuchi.com",
  phoneDisplay: "408-295-5651",
  phoneHref: "tel:+14082955651",
  address: {
    street: "189 North Bascom Avenue, Suite 110",
    city: "San Jose",
    state: "CA",
    zip: "95128",
    country: "US",
  },
  geo: { latitude: 37.3195, longitude: -121.9313 },
  hoursDisplay: "Mon–Fri · 8am–5pm",
  hours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
  description:
    "Comfort-focused family, restorative, cosmetic, implant, sedation and emergency dentistry in San Jose, California.",
  appointmentHref: "/contact#appointment",
  directionsHref:
    "https://www.google.com/maps/search/?api=1&query=189+North+Bascom+Avenue+Suite+110+San+Jose+CA+95128",
  // Same Formspree form the previous site used.
  formEndpoint: "https://formspree.io/f/xrejyeko",
  yelpHref,
  social: [yelpHref] as string[],
};

export const coreServices = [
  ["Emergency Dentistry", "/emergency-dentist-san-jose"],
  ["Sedation Dentistry", "/sedation-dentistry-san-jose"],
  ["Dental Implants", "/dental-implants-san-jose"],
  ["Cosmetic Dentistry", "/cosmetic-dentist-san-jose"],
  ["Family Dentistry", "/family-dentist-san-jose"],
  ["Restorative Dentistry", "/restorative-dentistry-san-jose"],
] as const;
