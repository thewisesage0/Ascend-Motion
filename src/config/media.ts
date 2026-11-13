/**
 * ASCEND MOTION — VIDEO FILES
 * ---------------------------------------------------------------------------
 * This is the ONE place to change the website's video URLs.
 *
 * 1. Put each MP4 file in: public/media/
 * 2. Keep the exact filename shown below, OR change the matching URL here.
 * 3. A file at public/media/example.mp4 is served by the website as
 *    /media/example.mp4 (the public/ part is NOT included in the URL).
 * 4. Save and redeploy the site after changing files or URLs.
 *
 * Example:
 *   File on your computer: public/media/my-new-video.mp4
 *   URL used by the website: /media/my-new-video.mp4
 */
export const VIDEO_URLS = {
  /** Homepage hero background and the Ascend Trace portfolio project. */
  ascendTraceExplainer: "/media/ascend_trace_explainer.mp4",

  /** Birthday animation celebrating the 19th birthday. */
  birthday19: "/media/birthday_19_free_videos.mp4",

  /** Coca-Cola Original Taste / Real Magic product spot. */
  cocaColaRealMagic: "/media/coca-cola-real-magic.mp4",

  /** GoodNovel reader promo for Alpha Werewolf Kings. */
  goodNovelReaderPromo: "/media/goodnovel_reader_promo.mp4",

  /** Environmental film: The Air We Leave. */
  pollutionDocumentary: "/media/pollution_documentary_the_air_we_leave.mp4",
} as const;

/**
 * Video notes for easy reference. The full project descriptions also appear
 * on the Work page and each project's detail page.
 */
export const VIDEO_NOTES = {
  ascendTraceExplainer:
    "Motion-led explainer for the Ascend Trace Node.js package: local processing, allowlist-only metadata, and dropped credential keys.",
  birthday19:
    "Birthday animation with a countdown graphic and the message “I'm now 19.”",
  cocaColaRealMagic:
    "Coca-Cola Original Taste bottle, vivid red backdrop, and Real Magic campaign typography.",
  goodNovelReaderPromo:
    "GoodNovel reader promo featuring Alpha Werewolf Kings and illustrated romance and werewolf story covers.",
  pollutionDocumentary:
    'Environmental film about pollution and plastic waste, closing with “Breathe… while you still can.”',
} as const;
