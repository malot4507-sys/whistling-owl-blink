/**
 * Site Configuration - EDIT THIS FILE to customize your site
 * All metadata, OG images, and branding read from here automatically.
 */

export const siteConfig = {
  // Basic Info
  name: "Your SaaS Name",
  tagline: "Your tagline here",
  description:
    "Your product description here. Built with Kleap - the AI website builder.",

  // Site URL (replaced automatically on deploy)
  url: process.env.NEXT_PUBLIC_URL || "https://your-app.kleap.io",

  // Layout: navbar is hidden by default. Set to true for marketing/landing sites.
  showNavbar: true,

  // Navigation links (only used when showNavbar is true)
  navLinks: [
    { title: "Games", link: "#games" },
    { title: "Crypto", link: "#crypto" },
    { title: "Live Casino", link: "#live" },
    { title: "Sign Up", link: "#signup" },
  ] as { title: string; link: string }[],

  // SEO Keywords
  keywords: ["keyword1", "keyword2", "keyword3"],

  // Author/Company
  author: "Your Name",
  company: "Your Company",

  // Social
  twitter: "@yourtwitter",

  // OG Image: set to a generated image URL for rich link previews
  ogImage: "https://lrggyvioreorxttbasgi.supabase.co/storage/v1/object/public/app-assets/7798/images/1771295906087-casino-hero.jpg",

  // Theme colors for OG image (fallback when ogImage is empty)
  ogBackground: "#020022",
  ogAccent1: "#1a1a4e",
  ogAccent2: "#2d1b4e",
};

export type SiteConfig = typeof siteConfig;
