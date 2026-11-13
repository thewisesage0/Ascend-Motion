import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Play } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/PageHeader";
import { ShowreelDialog } from "@/components/video/VideoPlayer";
import productionSet from "@/assets/production_set.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Ascend Motion" },
      { name: "description", content: "The story behind Ascend Motion, a creative advertising studio in Lagos, Nigeria." },
      { property: "og:title", content: "The Story Behind Ascend Motion" },
      { property: "og:description", content: "We turn ideas into cinematic, high-impact videos for modern brands." },
    ],
  }),
  component: About,
});

function About() {
  const [reel, setReel] = useState(false);
  return (
    <>
      <PageHeader eyebrow="About Us" title={<>The Story Behind <span className="font-editorial">Ascend Motion</span></>} description="We're a creative advertising studio that turns ideas into cinematic, high-impact videos for modern brands." />
      <section className="paper-grain pb-24">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <img src={productionSet} alt="Ascend Motion crew on a commercial set" width={1600} height={1008} loading="lazy" className="aspect-[16/8] w-full rounded-3xl object-cover shadow-card" />
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            <div><p className="eyebrow">Our Mission</p><p className="mt-3 text-2xl font-bold">To help brands grow through powerful visual storytelling.</p></div>
            <div><p className="eyebrow">Our Vision</p><p className="mt-3 text-2xl font-bold">To become a leading creative studio for brand advertising in Africa and beyond.</p></div>
            <div><p className="eyebrow">Our Values</p><p className="font-editorial mt-3 text-3xl">Creativity. Quality. Strategy. Results.</p></div>
          </div>
          <div className="mt-14 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="pill" size="xl"><Link to="/start-project">Start a Project <ArrowUpRight /></Link></Button>
            <Button variant="pillOutline" size="xl" onClick={() => setReel(true)}><Play className="fill-current" /> Watch Showreel</Button>
          </div>
        </div>
      </section>
      <ShowreelDialog open={reel} onOpenChange={setReel} />
    </>
  );
}
