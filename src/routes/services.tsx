import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Clapperboard, Film, Package, Smartphone } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { VIDEO_URLS } from "@/config/media";
import { InlineVideo } from "@/components/video/InlineVideo";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Ascend Motion" },
      { name: "description", content: "Commercial ads, product videos, brand films and social content from Ascend Motion." },
      { property: "og:title", content: "What We Do — Ascend Motion" },
      { property: "og:description", content: "Cinematic, high-impact content that helps brands win attention." },
    ],
  }),
  component: Services,
});

const services = [
  { icon: Clapperboard, title: "Commercial Ads", desc: "Cinematic advertisements that promote products, services and brands.", video: VIDEO_URLS.cocaColaRealMagic },
  { icon: Package, title: "Product Videos", desc: "High-quality product showcases that generate interest and communicate product value.", video: VIDEO_URLS.ascendTraceExplainer },
  { icon: Film, title: "Brand Films", desc: "Story-driven videos that communicate a brand's identity and vision.", video: VIDEO_URLS.pollutionDocumentary },
  { icon: Smartphone, title: "Social Content", desc: "Short, engaging promotional videos optimised for social media.", video: VIDEO_URLS.goodNovelReaderPromo },
];

const steps = [
  { n: "01", t: "Discover", d: "We learn about your goals and vision." },
  { n: "02", t: "Create", d: "We plan, produce and bring your idea to life." },
  { n: "03", t: "Deliver", d: "You receive your polished, high-impact video." },
];

export function ServiceCard({ s }: { s: (typeof services)[number] }) {
  const Icon = s.icon;
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-soft transition-transform hover:-translate-y-1">
      <div className="aspect-[4/3] overflow-hidden bg-foreground">
        <InlineVideo src={s.video} title={`${s.title} example`} />
      </div>
      <div className="flex flex-1 flex-col p-4 md:p-6">
        <Icon className="h-6 w-6" />
        <h3 className="mt-3 text-lg font-bold md:text-xl">{s.title}</h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.desc}</p>
        <Link to="/start-project" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold hover:underline">Learn More <ArrowUpRight className="h-4 w-4" /></Link>
      </div>
    </article>
  );
}

function Services() {
  return (
    <>
      <PageHeader eyebrow="Our Services" title={<>What We <span className="font-editorial">Do</span></>} description="Cinematic, high-impact content that helps brands tell their story, win attention, and drive results." />
      <section className="paper-grain pb-24">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">{services.map((s) => <ServiceCard key={s.title} s={s} />)}</div>
          <h2 className="mt-24 text-4xl font-extrabold md:text-5xl">A Simple, <span className="font-editorial">Clear Process</span></h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="relative rounded-2xl border border-border bg-background p-8">
                <span className="font-editorial text-5xl text-foreground/20">{s.n}</span>
                <h3 className="mt-3 text-2xl font-bold">{s.t}</h3>
                <p className="mt-2 text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
