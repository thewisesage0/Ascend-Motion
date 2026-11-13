import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { AMark, Logo } from "./Logo";

/**
 * Reusable hanging Ascend Motion ID badge. `strap` controls lanyard length (px).
 * `cropped` hides the card's lower half (used on page headers).
 */
export function IdBadge({
  className,
  strap = 220,
  width,
}: {
  className?: string;
  strap?: number;
  width?: number;
}) {
  const { badge } = site;
  return (
    <div className={cn("pointer-events-none select-none", className)} style={{ width }} aria-label={`${badge.name}, ${badge.role}, Ascend Motion ID badge`} role="img">
      <div className="animate-badge-swing relative flex flex-col items-center">
        {/* Lanyard */}
        <div className="relative flex flex-col items-center" style={{ height: strap }}>
          <div
            className="relative h-full w-11 overflow-hidden rounded-b-sm shadow-soft"
            style={{ background: "var(--lanyard)" }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-end gap-5 pb-4 text-primary-foreground">
              <span className="whitespace-nowrap text-[11px] font-bold tracking-tight [writing-mode:vertical-rl] rotate-180">
                Ascend Motion™
              </span>
              <AMark className="h-4 w-auto" />
            </div>
          </div>
        </div>
        {/* Clip */}
        <div className="relative -mt-1 flex flex-col items-center">
          <div className="h-5 w-8 rounded-md" style={{ background: "var(--metal)" }} />
          <div className="h-7 w-3 rounded-full border-[3px] border-charcoal/70" style={{ background: "var(--metal)" }} />
          <div className="-mt-1 h-3 w-12 rounded-sm" style={{ background: "var(--metal)" }} />
        </div>
        {/* Plastic sleeve */}
        <div
          className="relative -mt-1 w-full rounded-[22px] border border-foreground/10 bg-background/40 p-3 shadow-card backdrop-blur-[2px]"
          style={{ aspectRatio: "0.72" }}
        >
          <div className="absolute left-1/2 top-2 h-2 w-14 -translate-x-1/2 rounded-full border border-foreground/15 bg-background/60" />
          {/* Printed card */}
          <div className="paper-grain relative flex h-full flex-col overflow-hidden rounded-[14px] border border-foreground/5 bg-background px-4 pb-4 pt-6">
            <div className="relative z-10 flex flex-col items-center">
              <Logo className="[&_svg]:h-5 [&_span]:text-base" />
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.38em] text-charcoal">{badge.team}</span>
            </div>
            <div className="relative z-10 mt-3 flex-1 overflow-hidden rounded-md bg-muted">
              <img src={badge.portrait} alt="" className="h-full w-full object-cover object-top" loading="eager" />
            </div>
            <div className="relative z-10 mt-3 flex items-end justify-between gap-2">
              <div>
                <div className="text-xl font-extrabold leading-none tracking-tight">{badge.name}</div>
                <div className="font-editorial text-sm text-charcoal">{badge.role}</div>
              </div>
              <div className="barcode h-8 w-20" />
            </div>
          </div>
          {/* Reflections */}
          <div className="pointer-events-none absolute inset-0 rounded-[22px]" style={{ background: "var(--plastic)" }} />
          <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-background/80" />
        </div>
      </div>
      <div className="animate-badge-shadow mx-auto mt-4 h-4 w-3/4 rounded-full bg-foreground/20 blur-xl" />
    </div>
  );
}
