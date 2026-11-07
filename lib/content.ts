// Copy shared between the homepage and inner pages, from the practice's current site (drtakeuchi.com).
import { site } from "@/lib/site";

// Used by both the /new-patients page and the homepage's New Patients section.
export const newPatients = {
  title: "Your first visit should feel easy.",
  lede: "Whether it has been six months or several years since your last visit, the goal is to understand where you are now and help you leave with a clear plan.",
  topics: [
    {
      title: "What to expect",
      body: "Conversation, exam, appropriate imaging and a review of next steps.",
    },
    {
      title: "Nervous about the dentist?",
      body: "Tell the team before your visit so comfort can be part of the plan from the start.",
    },
    {
      title: "Before you arrive",
      body: "Bring identification, requested forms and insurance information if applicable.",
    },
    {
      // Links elsewhere on the site point to /new-patients#payment.
      id: "payment",
      title: "Questions about payment?",
      body: `The office accepts most major dental insurance plans and offers CareCredit financing. No insurance? You’re welcome too — call ${site.phoneDisplay} to discuss options.`,
    },
  ],
};

// Reviews are verbatim from Yelp as published on drtakeuchi.com (full text from its reviews
// page, excerpt from its homepage). Britten D.'s (Yelp, June 2024) was supplied separately.
export const reviews = [
  {
    name: "Britten D.",
    excerpt: "He was able to get me in for an emergency visit and provided the best care.",
    text: "Highly recommend Dr. Takeuchi. He was able to get me in for an emergency visit and provided the best care. Dr. Takeuchi is so informative and provided so much education and walked me through everything he did.",
    stars: 5,
  },
  {
    name: "Tobi B.",
    excerpt: "Dr. Takeuchi and his staff are tremendous. I had a semi-complicated procedure done with multiple steps and options. Dr. Takeuchi talked me through it all, and helped me…",
    text: "Dr. Takeuchi and his staff are tremendous. I had a semi-complicated procedure done with multiple steps and options. Dr. Takeuchi talked me through it all, and helped me weigh the pros and cons. Ultimately, I couldn't be more happy with my results. His staff is always very courteous, and they're great about confirming appointments with calls, emails, and even text messages. I highly recommend Dr. Takeuchi!",
    stars: 5,
  },
  {
    name: "Mike L.",
    excerpt: "I have never been much of a fan of going to the dentist :-). I can honestly say that thanks to Dr. Takeuchi and his staff, a dentist appointment is an activity I no longer dread…",
    text: "I have never been much of a fan of going to the dentist :-). I can honestly say that thanks to Dr. Takeuchi and his staff, a dentist appointment is an activity I no longer dread (...you can even watch your favorite TV channel). If you value efficiency and straight talk from your dentist, this office is for you.",
    stars: 5,
  },
  {
    name: "Quynh P.",
    excerpt: "Been to many dentists, he's the best. Don't know how else to say it. Cool equipment. Explains everything in detail and is able to show you pictures while telling the story…",
    text: "Been to many dentists, he's the best. Don't know how else to say it. Cool equipment. Explains everything in detail and is able to show you pictures while telling the story. Highly recommend him.",
    stars: 5,
  },
  {
    name: "Jeff T.",
    excerpt: "Our family has been going to Dr. Takeuchi for years. Doug is a great dentist and always makes us feel comfortable. His staff is fantastic. The office is clean and modern…",
    text: "Our family has been going to Dr. Takeuchi for years. Doug is a great dentist and always makes us feel comfortable. His staff is fantastic. The office is clean and modern. He is always updating the office with the latest technology. If you're looking for a great family dentist, check out Dr. Takeuchi.",
    stars: 5,
  },
  {
    name: "Insightful G.",
    excerpt: "One of the very few dentists I know that actually personally answers patients email inquires, and responds very quickly. He seems to care a lot about his business…",
    text: "One of the very few dentists I know that actually personally answers patients email inquires, and responds very quickly. He seems to care a lot about his business and reputation, and take a good care of the patients needs. His methodical approach to handling the patients concern is quite impressive!",
    stars: 5,
  },
  {
    name: "Amanda T.",
    excerpt: "Love, love, love this office. I get terrible anxiety/panic attacks and have never been able to find a dentist that put me at ease enough to get any work done…",
    text: "Love, love, love this office. I get terrible anxiety/panic attacks and have never been able to find a dentist that put me at ease enough to get any work done. After a recommendation from a coworker, I found Dr. Takeuchi and couldn't be happier. Everyone at the office is very kind and understanding.",
    stars: 5,
  },
];

// Patient testimonial videos from the practice's YouTube channel.
export const videoTestimonials = ["_0PojEpt3KE", "lUu3RiQhX8A", "33F8ciOeg8s", "3Xx6fC1PFX8", "NChXvut4yZA"];

// Handwritten thank-you letters published on drtakeuchi.com (public/images/reviews/letter-N.webp).
export const handwrittenLetters = [1, 2, 3, 4, 5, 6, 7, 8];

export const faqs = [
  { q: "Who is a good dentist in San Jose for anxious patients?", a: "Dr. Doug Takeuchi, DDS is widely recommended for anxious patients. His practice offers oral sedation and nitrous oxide (laughing gas). His gentle, unhurried approach comes up again and again in reviews from patients who previously avoided the dentist." },
  { q: "Does Dr. Takeuchi offer cosmetic dentistry?", a: "Yes. Dr. Takeuchi provides porcelain veneers, professional teeth whitening, dental bonding, and complete smile makeovers at his San Jose office at 189 North Bascom Avenue, Suite 110." },
  { q: "Does this office treat children and families?", a: "Yes. Dr. Takeuchi's practice welcomes patients of all ages — from children's first dental visits to full-arch restorations for seniors. New family patients are always welcome." },
  { q: "What tooth replacement options are available?", a: "Dr. Takeuchi offers dental implants, fixed bridges, and dentures. Dental implants are the gold standard — they look, feel, and function like natural teeth and are designed to last a lifetime." },
  { q: "Where is Dr. Takeuchi's dental office located?", a: "189 North Bascom Avenue, Suite 110, San Jose, CA 95128. The office is convenient to Rose Garden, Willow Glen, Campbell, West San Jose, Burbank, and downtown San Jose." },
  { q: "What number should I call to request an appointment?", a: "Call 408-295-5651, Monday through Friday, 8am–5pm. You can also request an appointment online using the form on this page." },
  { q: "Does Dr. Takeuchi help with root canals?", a: "Yes. Dr. Takeuchi performs modern, comfortable root canal treatments to save infected or damaged teeth. Most root canals are completed in a single visit with minimal discomfort." },
  { q: "Does the office help with dental insurance and financing?", a: "Yes. The office accepts most major dental insurance plans and offers CareCredit for flexible payment financing. Patients without insurance are also welcome — call 408-295-5651 to discuss your options." },
];

export const credentials = [
  "D.D.S. and B.S. in Dental Sciences, UCSF School of Dentistry — recognized as the second-highest-ranked dental school in the nation",
  "B.S. Biology, University of the Pacific",
  "Quintessence Award for Outstanding Achievement in Restorative Dentistry",
  "Honors from the American College of Dentists",
  "Raised in San Jose — Leigh High School graduate",
];

export const practiceHighlights = [
  "Oral & nitrous sedation for anxious patients",
  "High-tech imaging & same-day care",
  "Full cosmetic & restorative capabilities",
  "Flexible payment plans & CareCredit accepted",
];

// Used by the homepage's Services section and the hero film's service cards.
export const services: {
  icon: string;
  title: string;
  short: string;
  href: string;
  highlight: string | null;
  desc: string;
}[] = [
  { icon: "users", title: "Family Dentistry", short: "Preventive and restorative care for every member of your family.", href: "/family-dentist-san-jose", highlight: null, desc: "Comprehensive preventive and restorative care for every member of your family — from children's first visits to senior smile maintenance." },
  { icon: "sparkle", title: "Cosmetic Dentistry", short: "Veneers, bonding, whitening and smile makeovers.", href: "/cosmetic-dentist-san-jose", highlight: "Most Popular", desc: "Veneers, bonding, whitening, and smile makeovers designed to give you a radiant, confidence-boosting smile." },
  { icon: "tooth", title: "Restorative Dentistry", short: "Crowns, bridges and fillings that restore full function.", href: "/restorative-dentistry-san-jose", highlight: null, desc: "Crowns, bridges, and fillings that repair damaged teeth, restore full function, and blend naturally with your smile." },
  { icon: "implant", title: "Tooth Replacement", short: "Implants, bridges and dentures for missing teeth.", href: "/dental-implants-san-jose", highlight: null, desc: "Dental implants, bridges, and dentures — permanent and removable solutions for one or more missing teeth." },
  { icon: "sedation", title: "Sedation Dentistry", short: "Oral and nitrous sedation so anxious patients can relax.", href: "/sedation-dentistry-san-jose", highlight: "Anxiety-Free", desc: "Oral and nitrous oxide sedation so even the most anxious patients can relax and get the care they need comfortably." },
  { icon: "phone", title: "Emergency Dentistry", short: "Same-day appointments for tooth pain and dental trauma.", href: "/emergency-dentist-san-jose", highlight: "Same Day", desc: "Same-day appointments for tooth pain, broken teeth, lost fillings, and dental trauma. Call 408-295-5651." },
  { icon: "smile", title: "Children's Dentistry", short: "Gentle, kid-friendly care from the very first visit.", href: "/family-dentist-san-jose", highlight: null, desc: "Gentle, kid-friendly care that builds healthy habits and creates positive dental experiences from the very first visit." },
  { icon: "tooth", title: "Root Canals", short: "Modern, comfortable treatment to save infected teeth.", href: "/restorative-dentistry-san-jose", highlight: null, desc: "Modern, comfortable root canal treatment to save infected teeth and relieve pain — often completed in a single visit." },
  { icon: "shield", title: "Dental Crowns", short: "Natural-looking porcelain crowns that protect damaged teeth.", href: "/restorative-dentistry-san-jose", highlight: null, desc: "Natural-looking porcelain crowns that protect damaged teeth and blend seamlessly with your surrounding smile." },
  { icon: "sparkle", title: "Teeth Whitening", short: "Professional whitening for dramatically brighter results.", href: "/cosmetic-dentist-san-jose", highlight: null, desc: "Professional whitening treatments that deliver dramatically brighter results safely, quickly, and effectively." },
  { icon: "smile", title: "Veneers", short: "Ultra-thin porcelain shells that correct chips, gaps and stains.", href: "/cosmetic-dentist-san-jose", highlight: null, desc: "Ultra-thin porcelain shells that correct chips, gaps, stains, and shape — transforming your smile in just two visits." },
  { icon: "tooth", title: "Tooth-Colored Fillings", short: "Composite fillings that match your natural tooth color.", href: "/restorative-dentistry-san-jose", highlight: null, desc: "Composite resin fillings that match your natural tooth color, leaving no visible trace of the repair." }
];
