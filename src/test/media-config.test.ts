import { describe, expect, it } from "vitest";
import { VIDEO_URLS } from "@/config/media";
import { projects } from "@/data/projects";
import { site } from "@/config/site";

describe("Ascend Motion local video configuration", () => {
  it("keeps all five video paths under public/media", () => {
    const urls = Object.values(VIDEO_URLS);
    expect(urls).toHaveLength(5);
    expect(urls.every((url) => url.startsWith("/media/") && url.endsWith(".mp4"))).toBe(true);
  });

  it("uses the Ascend Trace explainer as the homepage hero background", () => {
    expect(site.video.heroBackground).toBe(VIDEO_URLS.ascendTraceExplainer);
  });

  it("connects every supplied video to a portfolio project", () => {
    const projectVideoUrls = projects.map((project) => project.video);
    expect(projectVideoUrls).toHaveLength(5);
    expect(projectVideoUrls).toEqual(expect.arrayContaining(Object.values(VIDEO_URLS)));
  });

  it("does not configure generic still-image posters or placeholder galleries", () => {
    for (const project of projects) {
      expect(project.video).toMatch(/^\/media\/.+\.mp4$/);
      expect("poster" in project).toBe(false);
      expect("gallery" in project).toBe(false);
    }
  });
});
