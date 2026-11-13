export type VideoSourceKind = "file" | "youtube" | "vimeo" | "tiktok" | "link" | "empty";

export type VideoSource = {
  kind: VideoSourceKind;
  url: string;
  embedUrl?: string;
};

function safeUrl(value: string): URL | null {
  try {
    return new URL(value, "https://ascendmotion.local");
  } catch {
    return null;
  }
}

/** Detect common video links so portfolio videos can be configured with a URL. */
export function getVideoSource(value?: string): VideoSource {
  const source = value?.trim() ?? "";
  if (!source) return { kind: "empty", url: "" };

  if (/\.(mp4|webm|ogg)(?:$|[?#])/i.test(source)) {
    return { kind: "file", url: source };
  }

  const parsed = safeUrl(source);
  if (!parsed) return { kind: "link", url: source };

  const host = parsed.hostname.replace(/^www\./, "").toLowerCase();
  if (host === "youtu.be" || host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
    const id = host === "youtu.be"
      ? parsed.pathname.split("/").filter(Boolean)[0]
      : parsed.searchParams.get("v") ?? parsed.pathname.match(/\/(?:embed|shorts|live)\/([^/?]+)/)?.[1];
    if (id) {
      return { kind: "youtube", url: source, embedUrl: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}` };
    }
  }

  if (host === "vimeo.com" || host.endsWith("vimeo.com")) {
    const id = parsed.pathname.match(/\/(?:video\/)?(\d+)/)?.[1];
    if (id) return { kind: "vimeo", url: source, embedUrl: `https://player.vimeo.com/video/${id}` };
  }

  if (host.endsWith("tiktok.com")) {
    const id = parsed.pathname.match(/\/video\/(\d+)/)?.[1];
    if (id) return { kind: "tiktok", url: source, embedUrl: `https://www.tiktok.com/player/v1/${id}` };
  }

  return { kind: "link", url: source };
}

export function getVideoEmbedUrl(
  source: VideoSource,
  options: { autoplay?: boolean; background?: boolean } = {},
): string | undefined {
  if (!source.embedUrl) return undefined;
  const { autoplay = false, background = false } = options;
  const params = new URLSearchParams();

  if (source.kind === "youtube") {
    params.set("autoplay", autoplay ? "1" : "0");
    params.set("mute", background || autoplay ? "1" : "0");
    params.set("playsinline", "1");
    params.set("rel", "0");
    params.set("controls", background ? "0" : "1");
    if (background) {
      const id = source.embedUrl.split("/").pop();
      params.set("loop", "1");
      if (id) params.set("playlist", id);
    }
  } else if (source.kind === "vimeo") {
    params.set("autoplay", autoplay ? "1" : "0");
    params.set("muted", background || autoplay ? "1" : "0");
    params.set("loop", background ? "1" : "0");
    params.set("title", "0");
    params.set("byline", "0");
    params.set("portrait", "0");
    if (background) params.set("background", "1");
  } else if (source.kind === "tiktok") {
    params.set("autoplay", autoplay ? "1" : "0");
    params.set("loop", background ? "1" : "0");
    params.set("controls", background ? "0" : "1");
  }

  return `${source.embedUrl}?${params.toString()}`;
}

export function isDirectVideoSource(value?: string): boolean {
  return getVideoSource(value).kind === "file";
}
