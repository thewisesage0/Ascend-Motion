import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";

describe("App routing", () => {
  const paths = [
    "/",
    "/about",
    "/contact",
    "/privacy",
    "/services",
    "/start-project",
    "/terms",
    "/work",
    "/work/glow-by-dallah",
  ];

  it.each(paths)("matches %s instead of falling back to not found", (path) => {
    const router = createRouter({ routeTree });
    const matches = router.matchRoutes(path);
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
