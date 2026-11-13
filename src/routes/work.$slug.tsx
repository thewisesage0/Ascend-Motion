import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Orbits, Plus } from "@/components/brand/Decor";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { getProject, projects } from "@/data/projects";
import { PortfolioCard } from "@/components/work/PortfolioCard";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const title = p ? `${p.client} – ${p.title} — Ascend Motion` : "Project — Ascend Motion";
    const desc = p?.description ?? "An Ascend Motion project.";
    return { meta: [{ title }, { name: "description", content: desc }, { property: "og:title", content: title }, { property: "og:description", content: desc }] };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length] ?? project;
  return (
    <section className="paper-grain relative overflow-hidden pb-24 pt-32">
      <Orbits className="text-foreground" />
      <Plus className="right-[6%] top-32" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <Link to="/work" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"><ArrowLeft className="h-4 w-4" /> Back to Work</Link>
        <VideoPlayer key={project.slug} title={`${project.client} ${project.title}`} src={project.video} className="mt-6 aspect-video" />
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <p className="eyebrow">{project.kind}</p>
            <h1 className="mt-3 text-5xl font-extrabold md:text-7xl">{project.client} <span className="font-editorial block">{project.title}</span></h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{project.description}</p>
          </div>
          <div className="space-y-6">
            <dl className="grid grid-cols-2 gap-4 border-y border-border py-6">
              <div><dt className="eyebrow text-[10px] text-muted-foreground">Year</dt><dd className="mt-1 font-bold">{project.year}</dd></div>
              <div><dt className="eyebrow text-[10px] text-muted-foreground">Category</dt><dd className="mt-1 font-bold">{project.categories[0]}</dd></div>
            </dl>
            <Button asChild variant="pill" size="xl" className="w-full"><Link to="/start-project">Start a Similar Project <ArrowUpRight /></Link></Button>
            <Button asChild variant="pillOutline" size="xl" className="w-full"><Link to="/work/$slug" params={{ slug: next.slug }}>Watch Next: {next.client} <ArrowUpRight /></Link></Button>
          </div>
        </div>

        <h2 className="mt-20 text-3xl font-extrabold">Explore <span className="font-editorial">More Work</span></h2>
        <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.filter((item) => item.slug !== project.slug).slice(0, 3).map((item) => (
            <PortfolioCard key={item.slug} project={item} />
          ))}
        </div>

        <h2 className="mt-20 text-3xl font-extrabold">Project <span className="font-editorial">Highlights</span></h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-center gap-3 rounded-2xl border border-border bg-background p-5 font-semibold"><Check className="h-5 w-5" />{h}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
