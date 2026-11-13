import { VIDEO_URLS } from "@/config/media";

export type Category = "Commercials" | "Brand Films" | "Product Ads" | "Social Ads";

export const categories: Category[] = ["Commercials", "Brand Films", "Product Ads", "Social Ads"];

export type Project = {
  slug: string;
  client: string;
  title: string;
  kind: string;
  categories: Category[];
  description: string;
  year: string;
  duration?: string;
  video: string;
  highlights: string[];
};

/**
 * PORTFOLIO PROJECTS
 * Video URLs are imported from src/config/media.ts, so all five file paths
 * can be edited in one place. Add or remove project objects here as needed.
 * No shared still-image placeholders are used for portfolio media.
 */
export const projects: Project[] = [
  {
    slug: "ascend-trace-explainer",
    client: "Ascend Trace",
    title: "Node.js Package Explainer",
    kind: "Technology Explainer",
    categories: ["Product Ads", "Brand Films"],
    description:
      "A motion-led explainer for the Ascend Trace Node.js package, showing local processing, allowlist-only metadata, and dropped credential keys. The video makes the package's privacy-focused workflow easy to understand through clear visual storytelling.",
    year: "2026",
    video: VIDEO_URLS.ascendTraceExplainer,
    highlights: [
      "Local processing workflow",
      "Allowlist-only metadata",
      "Credential keys are dropped",
      "Motion-led technical storytelling",
    ],
  },
  {
    slug: "birthday-19",
    client: "Birthday 19",
    title: "I'm Now 19",
    kind: "Personal Motion Design",
    categories: ["Social Ads", "Brand Films"],
    description:
      "A short birthday animation celebrating turning 19, built around a countdown graphic and the message “I'm now 19.”",
    year: "2026",
    video: VIDEO_URLS.birthday19,
    highlights: [
      "Countdown-led animation",
      "Birthday milestone celebration",
      "Bold motion graphics",
      "Closing message: “I'm now 19.”",
    ],
  },
  {
    slug: "coca-cola-real-magic",
    client: "Coca-Cola",
    title: "Real Magic Product Spot",
    kind: "Product Commercial",
    categories: ["Commercials", "Product Ads"],
    description:
      "A product spot featuring a Coca-Cola Original Taste bottle, a vivid red backdrop, and Real Magic campaign typography. The edit puts the product and campaign identity at the centre of the visual treatment.",
    year: "2026",
    video: VIDEO_URLS.cocaColaRealMagic,
    highlights: [
      "Coca-Cola Original Taste product focus",
      "Vivid red visual direction",
      "Real Magic campaign typography",
      "Product-led commercial treatment",
    ],
  },
  {
    slug: "goodnovel-reader-promo",
    client: "GoodNovel",
    title: "Alpha Werewolf Kings Reader Promo",
    kind: "Reader Promotion",
    categories: ["Social Ads", "Product Ads"],
    description:
      "A GoodNovel reader promo featuring Alpha Werewolf Kings alongside illustrated romance and werewolf story covers. The video is designed to put the stories in front of readers and encourage discovery on the platform.",
    year: "2026",
    video: VIDEO_URLS.goodNovelReaderPromo,
    highlights: [
      "Alpha Werewolf Kings feature",
      "Illustrated romance story covers",
      "Werewolf fiction artwork",
      "Reader-focused promotion",
    ],
  },
  {
    slug: "the-air-we-leave",
    client: "The Air We Leave",
    title: "Pollution Documentary",
    kind: "Environmental Awareness Film",
    categories: ["Brand Films", "Social Ads"],
    description:
      'An environmental film about pollution and plastic waste, closing with the message “Breathe… while you still can.” The piece uses motion and visual storytelling to call attention to the impact of waste on the environment.',
    year: "2026",
    video: VIDEO_URLS.pollutionDocumentary,
    highlights: [
      "Environmental awareness storytelling",
      "Pollution and plastic waste",
      "Documentary-style visual narrative",
      'Closing message: “Breathe… while you still can.”',
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
