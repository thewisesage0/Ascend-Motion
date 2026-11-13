import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Ascend Motion" },
      { name: "description", content: "Terms for using the Ascend Motion website." },
      { property: "og:title", content: "Terms of Service — Ascend Motion" },
      { property: "og:description", content: "Terms for using the Ascend Motion website." },
    ],
  }),
  component: () => (
    <>
      <PageHeader badge={false} eyebrow="Legal" title={<>Terms of <span className="font-editorial">Service</span></>} description="All work shown on this site is the property of Ascend Motion and its clients. Project terms, pricing and delivery are agreed individually in each proposal." />
      <div className="pb-24" />
    </>
  ),
});
