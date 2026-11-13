import { describe, expect, it } from "vitest";
import { getVideoEmbedUrl, getVideoSource, isDirectVideoSource } from "@/lib/video";

describe("video URL helpers", () => {
  it("recognizes direct video files, including local public paths", () => {
    expect(getVideoSource("/media/hero.mp4").kind).toBe("file");
    expect(getVideoSource("https://cdn.example.com/clip.webm?token=abc").kind).toBe("file");
    expect(isDirectVideoSource("/media/hero.mp4")).toBe(true);
  });

  it("converts YouTube watch links into embeddable URLs", () => {
    const source = getVideoSource("https://www.youtube.com/watch?v=abc123");
    expect(source.kind).toBe("youtube");
    expect(getVideoEmbedUrl(source, { autoplay: true, background: true })).toContain("playlist=abc123");
  });

  it("recognizes Vimeo video links", () => {
    expect(getVideoSource("https://vimeo.com/123456789").kind).toBe("vimeo");
  });

  it("recognizes TikTok video page links", () => {
    expect(getVideoSource("https://www.tiktok.com/@brand/video/123456789").kind).toBe("tiktok");
  });

  it("returns an empty source for an unset video", () => {
    expect(getVideoSource("").kind).toBe("empty");
  });
});
