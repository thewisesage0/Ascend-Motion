# Add your five video files here

**Copy/paste your MP4 files into this exact folder:**

`public/media/`

The website URLs below are already configured. You do not need to edit code as long as you keep the filenames exactly the same.

| Video file to put in this folder | Website URL | Where it appears | Description |
|---|---|---|---|
| `ascend_trace_explainer.mp4` | `/media/ascend_trace_explainer.mp4` | Homepage hero, Ascend Trace project, Product Videos service preview | Motion-led explainer for the Ascend Trace Node.js package, showing local processing, allowlist-only metadata, and dropped credential keys. |
| `birthday_19_free_videos.mp4` | `/media/birthday_19_free_videos.mp4` | Birthday 19 portfolio project | Short birthday animation with a countdown graphic and the message “I'm now 19.” |
| `coca-cola-real-magic.mp4` | `/media/coca-cola-real-magic.mp4` | Coca-Cola portfolio project, Commercial Ads service preview | Product spot featuring a Coca-Cola Original Taste bottle, a vivid red backdrop, and Real Magic campaign typography. |
| `goodnovel_reader_promo.mp4` | `/media/goodnovel_reader_promo.mp4` | GoodNovel portfolio project, Social Content service preview | GoodNovel reader promo featuring *Alpha Werewolf Kings* and illustrated romance and werewolf story covers. |
| `pollution_documentary_the_air_we_leave.mp4` | `/media/pollution_documentary_the_air_we_leave.mp4` | The Air We Leave portfolio project, Brand Films service preview | Environmental film about pollution and plastic waste, closing with “Breathe… while you still can.” |

## Folder path versus website URL

For example, the real file must be saved on your computer inside the project at:

`public/media/ascend_trace_explainer.mp4`

The website loads it from:

`/media/ascend_trace_explainer.mp4`

Do not put `public` in the browser URL. The same rule applies to all five files.

## Change a video later

Open **`src/config/media.ts`**. This is the single configuration file containing all five video URLs. If you rename a video file, update its matching URL in that file and keep the physical filename in `public/media/` in sync.

## No generic media placeholders

The homepage hero, service previews, portfolio cards, and project detail pages use the actual videos. They no longer display the shared production-set photo as a fallback, poster, or gallery image. The About section intentionally retains its crew photo, and the ID badge retains its separate portrait.

The Watch Showreel dialog remains text-only until you add a dedicated combined showreel. Add its URL in `site.video.src` inside `src/config/site.ts` when that file is ready.

## Verify before deploying

Run the dev server, then open a URL directly, for example:

`http://localhost:5173/media/ascend_trace_explainer.mp4`

If the video plays there, the file path is correct. Copy all five actual MP4 files into this folder before uploading/deploying the website. The source ZIP contains the setup and URL configuration, not the MP4 binaries.
