// Shared design tokens and icon set, carried over from the original homepage.

export const T = {
  teal: "oklch(0.52 0.13 192)",
  tealLight: "oklch(0.94 0.04 192)",
  tealMid: "oklch(0.70 0.09 192)",
  gold: "oklch(0.72 0.13 82)",
  goldLight: "oklch(0.95 0.04 82)",
  slate: "oklch(0.18 0.02 240)",
  slateMid: "oklch(0.40 0.02 240)",
  slateLight: "oklch(0.62 0.02 240)",
  white: "oklch(0.985 0.008 60)",
  offWhite: "oklch(0.97 0.01 60)",
  surface: "oklch(0.975 0.012 60)"
};

export const Icon = ({ name, size = 22, color = "currentColor" }) => {
  const paths = {
    tooth: "M8 2C5.5 2 4 4 4 6c0 2 1 3.5 1.5 5C6 13 6 15 6 17c0 2 .5 3 2 3s2-2 2-3.5c0-.5.3-.5.5-.5s.5 0 .5.5C11 18 12 20 14 20s2-1 2-3c0-2 0-4 .5-6C17 9.5 18 8 18 6c0-2-1.5-4-4-4-1 0-2 .5-3 1.5C10 2.5 9 2 8 2z",
    star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    phone: "M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z",
    calendar: "M8 2v3M16 2v3M3 8h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
    check: "M20 6L9 17l-5-5",
    shield: "M12 2L3 7v6c0 5.25 3.75 10.15 9 11.25C17.25 23.15 21 18.25 21 13V7L12 2z",
    smile: "M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10z",
    sparkle: "M12 3v3m0 12v3m9-9h-3M6 12H3m12.36-6.36-2.12 2.12M8.46 15.54l-2.12 2.12m12.02 0-2.12-2.12M8.46 8.46 6.34 6.34",
    map: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
    users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    implant: "M12 2v6m0 0c-2.5 0-5 1.5-5 4v8h10v-8c0-2.5-2.5-4-5-4zM9 20h6",
    sedation: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
    chevron: "M19 9l-7 7-7-7",
    arrow: "M5 12h14M12 5l7 7-7 7",
    close: "M18 6L6 18M6 6l12 12"
  };
  const d = paths[name] || paths.star;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill={name === "star" || name === "tooth" ? color : "none"}
      stroke={name === "star" || name === "tooth" ? "none" : color}
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>);
};
