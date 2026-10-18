# Dr. Takeuchi — Entry Tier Launch Production Layer

This bundle upgrades the current drtakeuchi.netlify.app build from a polished concept into an Entry Tier Launch Site.

## Adds
- centralized practice/NAP data
- core conversion pages
- appointment form scaffold
- emergency conversion pathway
- Dentist/LocalBusiness schema
- SEO metadata
- sitemap + robots
- legacy redirect framework
- analytics event helpers
- persistent call / appointment CTA
- footer + legal scaffolding
- reduced-motion accessibility
- image-performance guidance

## Keep from the current build
- existing visual direction
- current homepage storytelling
- The Tooth X-Ray as the single signature interaction

## Before launch
1. Appointment form posts to Formspree (`site.formEndpoint`, same form as the previous site). Swap in the practice's approved scheduling/CRM endpoint when ready.
2. Verify credentials, hours, insurance/financing, review claims, and office details. Have the practice review the emergency first-aid copy and the privacy policy.
3. Expand redirects using the real current sitemap/Search Console.
4. Add GA4/GTM.
5. Connect Search Console.
6. QA iPhone Safari, Android Chrome, Safari, Chrome.
7. ~~Compress Tooth X-Ray frames to AVIF/WebP.~~ Done: `public/images/tooth-xray/*.webp`.
8. ~~Preload only the above-fold visual.~~ Done: hero image uses `fetchPriority="high"`; X-Ray frames lazy-load.
9. Do not collect sensitive medical data in a generic form.

## Develop
- `npm run dev` — local dev server
- `npm run build` — production build (Netlify runs this; see `netlify.toml`)
