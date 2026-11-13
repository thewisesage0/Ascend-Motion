import {
  Outlet,
  Link,
  createRootRoute,
  useRouter,
  useLocation,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4 pt-28">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-extrabold text-foreground">404</h1>
        <h2 className="font-editorial mt-4 text-2xl text-foreground">This scene doesn't exist.</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for has moved or never made the cut.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong on our end. You can try refreshing or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Try again
          </button>
          <a href="/" className="inline-flex items-center justify-center rounded-full border border-input bg-background px-4 py-2 text-sm font-medium text-foreground">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const pageTitles: Record<string, string> = {
  "/": "Ascend Motion — Cinematic Ads for Modern Brands",
  "/about": "About — Ascend Motion",
  "/contact": "Contact — Ascend Motion",
  "/privacy": "Privacy Policy — Ascend Motion",
  "/services": "Services — Ascend Motion",
  "/start-project": "Start a Project — Ascend Motion",
  "/terms": "Terms of Service — Ascend Motion",
  "/work": "Our Work — Ascend Motion",
};

function RootComponent() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = pageTitles[pathname] ?? (pathname.startsWith("/work/") ? "Project — Ascend Motion" : "Ascend Motion — Creative Advertising Studio");
  }, [pathname]);

  return (
    <>
      <Navbar />
      <main key={pathname} className="animate-in fade-in duration-500">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-center" />
    </>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});
