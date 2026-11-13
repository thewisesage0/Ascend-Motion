# Ascend Motion — Static Website

A responsive creative-studio website built with React, TanStack Router, Vite, and Tailwind CSS. This is a static frontend: it has no database, server functions, authentication, backend API, or file-upload service.

## Run locally

Requirements: Node.js 22.12+ and npm 10+.

```bash
npm install
npm run dev
```

## Build and deploy

```bash
npm run check
npm run build
npm run preview
```

The production site is generated in `dist/`. Use `npm run build` as the build command and `dist` as the output/publish directory. The included `_redirects` and `vercel.json` files configure SPA route fallback for supported static hosts.

## Contact and social links

The public email and TikTok URL are configured in `src/config/site.ts`:

- Email: `hello.ascendmotion@gmail.com`
- TikTok: `https://www.tiktok.com/@ascendmotion.co`

The site displays TikTok only. Contact, project enquiry, and newsletter forms open a pre-filled `mailto:` draft. Visitors review and send the message using their own email app; the website does not submit or store form data.

## Add your five videos — exact folder and URLs

**Copy all five MP4 files into this exact project folder: `public/media/`**.

The complete file-to-URL list and descriptions are also in `public/media/README.md`.

| Put this file in `public/media/` | The website URL | Used for |
|---|---|---|
| `ascend_trace_explainer.mp4` | `/media/ascend_trace_explainer.mp4` | Homepage hero background + Ascend Trace project |
| `birthday_19_free_videos.mp4` | `/media/birthday_19_free_videos.mp4` | Birthday 19 project |
| `coca-cola-real-magic.mp4` | `/media/coca-cola-real-magic.mp4` | Coca-Cola Real Magic project |
| `goodnovel_reader_promo.mp4` | `/media/goodnovel_reader_promo.mp4` | GoodNovel reader promo project |
| `pollution_documentary_the_air_we_leave.mp4` | `/media/pollution_documentary_the_air_we_leave.mp4` | The Air We Leave pollution documentary project |

**Important:** `public/media/filename.mp4` is the location on disk. `/media/filename.mp4` is the URL in the browser. Do not add `public` to the URL.

### The one file to edit when changing URLs

Open **`src/config/media.ts`**. It contains all five URL values in one place. Each portfolio entry and the homepage hero reads from these constants, so you do not need to search through React components.

Example:

```ts
export const VIDEO_URLS = {
  ascendTraceExplainer: "/media/ascend_trace_explainer.mp4",
  birthday19: "/media/birthday_19_free_videos.mp4",
  cocaColaRealMagic: "/media/coca-cola-real-magic.mp4",
  goodNovelReaderPromo: "/media/goodnovel_reader_promo.mp4",
  pollutionDocumentary: "/media/pollution_documentary_the_air_we_leave.mp4",
} as const;
```

To use a differently named file, change only the matching URL in `src/config/media.ts`, and make sure the real file in `public/media/` has the matching filename. Save and redeploy.

### Check a video before deploying

After copying a file into `public/media/`, start the dev server and open its URL directly, for example `http://localhost:5173/media/ascend_trace_explainer.mp4`. If the video plays there, the path is correct.

The homepage hero uses the Ascend Trace video as a muted, looping background. The same five video files also power the portfolio cards, project detail pages, and relevant service previews. All of those media areas play the real MP4 files directly; they do not use the production-set still as a placeholder. The only retained editorial still photo is the crew image in the About section. The ID badge portrait remains as a separate intentional profile photo.

## Media behaviour

- Homepage hero: Ascend Trace MP4, muted and looping, with no poster image.
- Portfolio cards: the corresponding MP4 previews automatically play when near the viewport.
- Project detail pages: the matching MP4 is shown directly with video controls; related-work cards use their own project MP4s.
- Services page: each service card displays an MP4 preview.
- About page: retains the static production-set crew image intentionally.
- ID badge: keeps its separate portrait photo intentionally.
- Watch Showreel: shows a text-only notice until a combined showreel URL is supplied; it does not display a static placeholder.

## Change the ID-card photo

Replace `src/assets/id-card-portrait.jpg` with your preferred photo. Keep the exact filename and JPG format so the card updates automatically.

## Static form behaviour

Forms use `mailto:` and do not send anything in the background. The visitor's device needs a configured email application or mail handler. No database, API key, environment variable, or server runtime is needed. Files selected on the project form are not uploaded or attached automatically; visitors must attach them manually in their email app.
