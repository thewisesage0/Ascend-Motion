import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link to="/" aria-label="Ascend Motion home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <nav className="hidden items-center gap-12 md:flex" aria-label="Main">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="relative py-2 text-[15px] font-medium after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform data-[status=active]:after:scale-x-100 hover:after:scale-x-100"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Button asChild variant="pill" size="lg" className="hidden md:inline-flex">
          <Link to="/start-project">
            Start a Project <ArrowUpRight />
          </Link>
        </Button>
        <button
          type="button"
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
        </button>
      </div>
      <div
        className={cn(
          "paper-grain fixed inset-0 top-[84px] z-30 flex flex-col px-6 pb-10 pt-6 transition-all duration-300 md:hidden",
          open ? "opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <nav className="relative z-10 flex flex-col" aria-label="Mobile">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              onClick={() => setOpen(false)}
              className="border-b border-border py-5 text-3xl font-bold tracking-tight data-[status=active]:font-editorial"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Button asChild variant="pill" size="xl" className="relative z-10 mt-8 w-full">
          <Link to="/start-project" onClick={() => setOpen(false)}>
            Start a Project <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </header>
  );
}
