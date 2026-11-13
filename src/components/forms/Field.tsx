import type { ReactNode } from "react";

export const inputCls =
  "w-full rounded-xl border border-input bg-background px-4 py-3.5 text-[15px] outline-none transition focus:border-foreground focus:ring-1 focus:ring-foreground aria-[invalid=true]:border-destructive";

export function Field({ id, label, error, children }: { id: string; label: string; error?: string | undefined; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-sm text-destructive" role="alert">{error}</p>}
    </div>
  );
}
