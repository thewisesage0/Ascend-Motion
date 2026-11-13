import { cn } from "@/lib/utils";

export function AMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 40" className={cn("fill-current", className)} aria-hidden="true">
      <path d="M19 0h10l19 40H37.5L24 11 10.5 40H0L19 0Z" />
      <path d="M2 31.5h33.5l3.3 7H12.5c-3 0-5-1.2-6.4-3.2L2 31.5Z" />
    </svg>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-foreground", className)}>
      <AMark className="h-7 w-auto" />
      {!compact && (
        <span className="text-[1.35rem] font-extrabold tracking-[-0.04em] leading-none">
          Ascend Motion<sup className="ml-0.5 text-[0.55rem] font-bold align-super">™</sup>
        </span>
      )}
    </span>
  );
}
