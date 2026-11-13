import { cn } from "@/lib/utils";
import { AMark } from "./Logo";

export function Plus({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("absolute h-5 w-5 stroke-foreground", className)} aria-hidden="true">
      <path d="M10 0v20M0 10h20" strokeWidth="1.2" />
    </svg>
  );
}

/** Rough black torn-paper brush corner */
export function TornCorner({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 220 220"
      className={cn("pointer-events-none absolute fill-foreground", flip && "-scale-x-100", className)}
      aria-hidden="true"
    >
      <path d="M0 40c18 4 30-6 48 2 14 6 20-10 38-6 10 2 16 12 30 8-8 14-30 12-40 24-8 10-24 4-34 16-6 8-22 2-28 14-4 8-10 12-14 10V40Z" opacity=".9" />
      <path d="M0 0h120c-6 8-20 6-30 14-12 10-30 6-42 16C36 38 18 34 0 40V0Z" opacity=".15" />
      <path d="M0 128c6-6 14-2 20-10 6-6 14-2 18-8-4 10-12 12-16 20-4 6-14 6-22 12v-14Z" opacity=".6" />
    </svg>
  );
}

/** Large curved orbital lines */
export function Orbits({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="none" className={cn("pointer-events-none absolute inset-0 h-full w-full", className)} aria-hidden="true">
      <path className="animate-draw" d="M-50 820C300 640 700 420 1100 260S1550 60 1700 40" fill="none" stroke="currentColor" strokeWidth="1" opacity=".35" />
      <path className="animate-draw" d="M200 950C520 760 900 600 1250 520s380-120 450-180" fill="none" stroke="currentColor" strokeWidth=".8" opacity=".25" />
      <path d="M760 330c120-160 420-220 560-160 90 40 30 140-140 220" fill="none" stroke="currentColor" strokeWidth=".7" opacity=".3" />
    </svg>
  );
}

export function Watermark({ className }: { className?: string }) {
  return <AMark className={cn("pointer-events-none absolute text-foreground opacity-[0.035]", className)} />;
}

export function Hatch({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("pointer-events-none absolute font-light tracking-[-0.1em] text-foreground", className)}>//////////////</span>;
}

export function InkLine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 14" className={cn("pointer-events-none", className)} aria-hidden="true" preserveAspectRatio="none">
      <path d="M2 9C80 4 160 3 240 5s120 3 156 1" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

export function MarkRule({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 text-foreground", className)} aria-hidden="true">
      <AMark className="h-4 w-auto" />
      <span className="h-px w-28 bg-foreground/60" />
      <span className="text-xs tracking-widest">•••</span>
    </div>
  );
}
