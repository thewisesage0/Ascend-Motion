import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Play } from "lucide-react";
import { InlineVideo } from "@/components/video/InlineVideo";
import type { Project } from "@/data/projects";

/** Portfolio cards display the real project video immediately, without a poster image. */
export function PortfolioCard({ project }: { project: Project }) {
  const hasVideo = Boolean(project.video.trim());

  return (
    <Link to="/work/$slug" params={{ slug: project.slug }} className="group block">
      <div className="relative aspect-[16/8.5] overflow-hidden rounded-2xl bg-foreground shadow-soft">
        {hasVideo ? (
          <InlineVideo
            src={project.video}
            title={`${project.client} ${project.title} preview`}
            className="transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-sm text-background">
            Video coming soon
          </div>
        )}

        <span className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground shadow-soft transition-transform group-hover:scale-110">
          {hasVideo ? <Play className="ml-0.5 h-4 w-4 fill-current" /> : <ArrowUpRight className="h-4 w-4" />}
        </span>
        {project.duration && (
          <span className="absolute bottom-4 right-4 rounded-full bg-foreground/80 px-3 py-1 text-sm font-semibold text-background">
            {project.duration}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-4 px-1">
        <div>
          <h3 className="text-lg font-bold tracking-tight">
            {project.client} – {project.title}
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{project.categories.join("  •  ")}</p>
        </div>
        <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
