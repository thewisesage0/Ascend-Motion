import { describe, expect, it } from "vitest";
import { createMailtoUrl } from "@/lib/mailto";

describe("createMailtoUrl", () => {
  it("encodes the subject and body as a valid mailto draft", () => {
    const url = createMailtoUrl({
      to: "hello@example.com",
      subject: "Project enquiry — Product Ad",
      body: "Name: Ada Lovelace\nBudget: ₦500k+\nLet's talk.",
    });

    expect(url.startsWith("mailto:hello@example.com?")).toBe(true);
    expect(url).toContain("subject=Project%20enquiry");
    expect(url).toContain("body=Name%3A%20Ada%20Lovelace");
    expect(decodeURIComponent(url)).toContain("Let's talk.");
  });
});
