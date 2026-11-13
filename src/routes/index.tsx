import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Play } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IdBadge } from "@/components/brand/IdBadge";
import { Hatch, InkLine, MarkRule, Orbits, Plus, TornCorner } from "@/components/brand/Decor";
import { ShowreelDialog } from "@/components/video/VideoPlayer";
import { PortfolioCard } from "@/components/work/PortfolioCard";
import { projects } from "@/data/projects";
import { site } from "@/config/site";
import { getVideoEmbedUrl, getVideoSource } from "@/lib/video";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ascend Motion — Cinematic Ads for Modern Brands" },
      { name: "description", content: "Ascend Motion is a Lagos creative advertising studio making cinematic commercials, product ads and brand films." },
      { property: "og:title", content: "Ascend Motion — Cinematic Ads for Modern Brands" },
      { property: "og:description", content: "High-impact, story-driven commercials that showcase your brand, product and vision." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [reel, setReel] = useState(false);
  const heroVideo = getVideoSource(site.video.heroBackground);
  return (
    <>
      <section className="home-hero relative overflow-hidden">
        {heroVideo.kind === "file" ? (
          <video src={heroVideo.url} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        ) : heroVideo.embedUrl && (heroVideo.kind === "youtube" || heroVideo.kind === "vimeo") ? (
          <iframe
            src={getVideoEmbedUrl(heroVideo, { autoplay: true, background: true })}
            title="Ascend Motion background video"
            allow="autoplay; encrypted-media; picture-in-picture"
            aria-hidden="true"
            tabIndex={-1}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
          />
        ) : (
          <div className="absolute inset-0 bg-foreground" aria-hidden="true" />
        )}
        <div className="absolute inset-0 hidden md:block" style={{ background: "var(--overlay-hero)" }} />
        <div className="absolute inset-0 md:hidden" style={{ background: "var(--overlay-hero-mobile)" }} />
        <div className="paper-grain absolute inset-0 bg-transparent" />
        <Orbits className="text-foreground" />
        <TornCorner className="-left-4 top-32 h-48 w-48" />
        <TornCorner flip className="-right-4 bottom-0 h-48 w-48 rotate-180" />
        <Plus className="left-[6%] top-[28%]" />
        <Plus className="right-[12%] top-[16%]" />
        <Hatch className="bottom-10 right-[12%] text-lg" />

        <div className="home-hero-layout relative z-10 mx-auto grid max-w-7xl items-center gap-6 px-6 pb-16 pt-24 lg:grid-cols-[1.25fr_1fr] lg:px-10">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <span className="eyebrow animate-fade-up inline-block border border-foreground/40 px-3 py-1.5">Creative Advertising Studio</span>
            <h1 className="home-hero-title animate-fade-up mt-6 text-5xl font-extrabold leading-[0.98] sm:text-6xl lg:text-[4.6rem] xl:text-[5.4rem]">
              Cinematic Ads
              <br />
              <span className="whitespace-nowrap">for <span className="font-editorial relative inline-block">Modern Brands.<InkLine className="absolute -bottom-3 left-0 h-3 w-full" /></span></span>
            </h1>
            <p className="home-hero-description animate-fade-up mx-auto mt-8 max-w-lg text-lg text-charcoal md:text-xl lg:mx-0">
              We create high-impact, story-driven commercials that showcase your brand, product, and vision.
            </p>
            <div className="home-hero-actions animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild variant="pill" size="xl"><Link to="/start-project">Start a Project <ArrowUpRight /></Link></Button>
              <Button variant="pillOutline" size="xl" onClick={() => setReel(true)}><Play className="fill-current" /> Watch Showreel</Button>
            </div>
            <MarkRule className="mt-12 hidden lg:flex" />
          </div>
          <div className="home-hero-badge order-1 flex justify-center lg:order-2 lg:-mt-24 lg:self-start">
            <IdBadge className="w-[200px] sm:w-[250px] lg:w-[300px]" strap={180} />
          </div>
        </div>
      </section>

      <section className="paper-grain relative overflow-hidden py-24">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Selected Work</p>
              <h2 className="mt-3 text-5xl font-extrabold md:text-6xl">Recent <span className="font-editorial">projects</span></h2>
            </div>
            <Button asChild variant="pillOutline" size="lg"><Link to="/work">View all work <ArrowUpRight /></Link></Button>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => <PortfolioCard key={p.slug} project={p} />)}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-foreground py-24 text-background">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-4xl font-extrabold md:text-6xl">We Make Brands <span className="font-editorial">Impossible to Ignore.</span></h2>
          <Button asChild size="xl" className="mt-10 rounded-full bg-background text-foreground hover:bg-secondary"><Link to="/start-project">Start a Project <ArrowUpRight /></Link></Button>
        </div>
      </section>
      <ShowreelDialog open={reel} onOpenChange={setReel} />
    </>
  );
}
