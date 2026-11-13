import type { ReactNode } from "react";
import { IdBadge } from "@/components/brand/IdBadge";
import { Orbits, Plus, TornCorner } from "@/components/brand/Decor";

/** Shared inner-page header with eyebrow, editorial headline and the hanging badge on desktop. */
export function PageHeader({
  eyebrow,
  title,
  description,
  badge = true,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  badge?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="paper-grain relative overflow-hidden pb-12 pt-36 md:pb-16 md:pt-40">
      <Orbits className="text-foreground" />
      <TornCorner className="-left-6 top-24 h-40 w-40" />
      <TornCorner flip className="-right-6 top-1/2 hidden h-44 w-44 md:block" />
      <Plus className="left-[5%] top-36" />
      <Plus className="right-[4%] top-48 hidden md:block" />
      {badge && (
        <div className="absolute -top-10 right-[10%] hidden rotate-[8deg] lg:block">
          <IdBadge strap={130} width={270} />
        </div>
      )}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <p className="eyebrow animate-fade-up">{eyebrow}</p>
        <h1 className="animate-fade-up mt-4 max-w-3xl text-6xl font-extrabold leading-[0.95] md:text-8xl">{title}</h1>
        <p className="animate-fade-up mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">{description}</p>
        {children}
      </div>
    </section>
  );
}
