import { createFileRoute, Outlet, useMatchRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PortfolioCard } from "@/components/work/PortfolioCard";
import { categories, projects, type Category } from "@/data/projects";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Our Work — Ascend Motion" },
      { name: "description", content: "A curated selection of cinematic ads, brand films and motion-driven campaigns by Ascend Motion." },
      { property: "og:title", content: "Our Work — Ascend Motion" },
      { property: "og:description", content: "Cinematic ads, brand films and motion-driven campaigns." },
    ],
  }),
  component: WorkLayout,
});

function WorkLayout() {
  const matchRoute = useMatchRoute();
  if (matchRoute({ to: "/work/$slug" })) return <Outlet />;
  return <Work />;
}

function Work() {
  const [filter, setFilter] = useState<Category | "All">("All");
  const list = filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));
  const tabs: (Category | "All")[] = ["All", ...categories];
  return (
    <>
      <PageHeader eyebrow="Our Work" title={<>Our <span className="font-editorial">Work</span></>} description="A curated selection of cinematic ads, brand films, and motion-driven campaigns we've created." />
      <section className="paper-grain pb-24">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none]" role="tablist">
            {tabs.map((t) => {
              const count = t === "All" ? projects.length : projects.filter((p) => p.categories.includes(t)).length;
              return (
                <button key={t} role="tab" aria-selected={filter === t} onClick={() => setFilter(t)}
                  className={cn("shrink-0 rounded-full px-6 py-3 text-[15px] font-medium transition-colors", filter === t ? "bg-foreground text-background" : "hover:bg-accent")}>
                  {t === "All" ? "All Work" : t} ({count})
                </button>
              );
            })}
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => <PortfolioCard key={p.slug} project={p} />)}
          </div>
          {list.length === 0 && <p className="mt-10 text-muted-foreground">No projects in this category yet.</p>}
        </div>
      </section>
    </>
  );
}
