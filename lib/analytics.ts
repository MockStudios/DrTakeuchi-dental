type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export function trackEvent(name: string, params: Params = {}) {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
}

export const events = {
  phone: (location: string) => trackEvent("phone_click", { location }),
  emergencyPhone: (location: string) =>
    trackEvent("emergency_phone_click", { location }),
  appointmentStart: (source: string) =>
    trackEvent("appointment_start", { source }),
  appointmentComplete: (source: string) =>
    trackEvent("appointment_complete", { source }),
  directions: (location: string) =>
    trackEvent("directions_click", { location }),
  symptom: (symptom: string) =>
    trackEvent("symptom_selected", { symptom }),
  sedation: (location: string) =>
    trackEvent("sedation_cta_click", { location }),
  implant: (location: string) =>
    trackEvent("implant_cta_click", { location }),
};
