import idCardPortrait from "@/assets/id-card-portrait.jpg";
import { VIDEO_URLS } from "@/config/media";

/**
 * CENTRAL SITE SETTINGS
 * Edit this file for the email, TikTok profile, and ID-card portrait.
 * Edit src/config/media.ts to change video file paths in one place.
 */
export const site = {
  name: "Ascend Motion",
  tagline: "We Make Brands Impossible to Ignore.",
  description:
    "A creative advertising studio crafting cinematic commercials, product ads, brand films and promotional videos.",
  email: "hello.ascendmotion@gmail.com",
  phone: "" as string,
  location: "Lagos, Nigeria",
  socials: [
    { label: "TikTok", href: "https://www.tiktok.com/@ascendmotion.co" },
  ],
  video: {
    // This local MP4 is used as the homepage hero background.
    heroBackground: VIDEO_URLS.ascendTraceExplainer,
    // Add a combined showreel file here when one is available.
    src: "",
  },
  badge: {
    name: "HAWAL",
    role: "Creative Director",
    team: "Creative Team",
    // Replace src/assets/id-card-portrait.jpg with your preferred photo.
    portrait: idCardPortrait,
  },
};

export const projectTypes = [
  "Commercial Ad",
  "Product Video",
  "Brand Film",
  "Social Content",
  "Other",
];

export const budgets = [
  "Under ₦500k",
  "₦500k – ₦1.5M",
  "₦1.5M – ₦5M",
  "₦5M+",
  "Not sure yet",
];
