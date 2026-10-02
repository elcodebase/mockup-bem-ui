export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/kabinet", label: "Kabinet" },
  { href: "/news", label: "News" }
];

export const sosial = {
  instagram: "https://www.instagram.com/bemui_official",
  youtube: "https://www.youtube.com/@BEMUI",
  twitter: "https://twitter.com/BEM_UI"
};
