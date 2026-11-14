import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, FileText, Rocket, Upload } from "lucide-react";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { IdBadge } from "@/components/brand/IdBadge";
import { Orbits, Plus, TornCorner } from "@/components/brand/Decor";
import { Field, inputCls } from "@/components/forms/Field";
import { budgets, projectTypes, site } from "@/config/site";
import { createMailtoUrl } from "@/lib/mailto";

export const Route = createFileRoute("/start-project")({
  head: () => ({
    meta: [
      { title: "Start a Project — Ascend Motion" },
      { name: "description", content: "Tell Ascend Motion about your project and get a proposal, timeline and next steps." },
      { property: "og:title", content: "Let's Bring Your Idea to Life — Ascend Motion" },
      { property: "og:description", content: "Send your brief and we reply within 24 hours." },
    ],
  }),
  component: StartProject,
});

export const MAX_FILE_BYTES = 25 * 1024 * 1024;
export const ACCEPT = "image/*,video/*,.pdf,.doc,.docx,.ppt,.pptx,.txt";

export const inquirySchema = z.object({
  full_name: z.string().trim().min(1, "Please enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email address").max(255),
  project_type: z.string().min(1, "Choose a project type"),
  budget: z.string().min(1, "Choose an estimated budget"),
  details: z.string().trim().min(10, "Tell us a bit more (at least 10 characters)").max(5000),
});

const benefits = [
  { icon: Clock, t: "Quick Response", d: "We reply within 24 hours" },
  { icon: FileText, t: "Tailored Proposal", d: "A plan built for your goals" },
  { icon: Rocket, t: "Production Ready", d: "From idea to final delivery" },
];

function StartProject() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [file, setFile] = useState<File | null>(null);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.delete("attachment");
    const parsed = inquirySchema.safeParse(Object.fromEntries(fd));
    const nextErrors: Record<string, string> = parsed.success
      ? {}
      : Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message]));

    if (file && file.size > MAX_FILE_BYTES) {
      nextErrors["attachment"] = "Choose a file smaller than 25 MB";
    }

    setErrors(nextErrors);
    if (!parsed.success || nextErrors["attachment"]) return;

    const { full_name, email, project_type, budget, details } = parsed.data;
    const subject = `New project enquiry — ${project_type}`;
    const body = [
      `Name: ${full_name}`,
      `Email: ${email}`,
      `Project type: ${project_type}`,
      `Budget: ${budget}`,
      "",
      "Project details:",
      details,
      "",
      file
        ? `Attachment to add manually before sending: ${file.name}`
        : "No attachment selected.",
      "",
      "Please review this brief and send the email to submit the enquiry.",
    ].join("\n");

    window.location.href = createMailtoUrl({ to: site.email, subject, body });
    toast.info(file
      ? "Your email app should open. Attach the selected file manually, then press Send."
      : "Your email app should open with your project brief. Review it and press Send.");
  }

  return (
    <section className="paper-grain relative overflow-hidden pb-24 pt-36">
      <Orbits className="text-foreground" />
      <TornCorner className="-left-6 top-24 h-40 w-40" />
      <Plus className="right-[6%] top-40" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.2fr] lg:px-10">
        <div>
          <p className="eyebrow">Start a Project</p>
          <h1 className="mt-4 text-5xl font-extrabold leading-[0.98] md:text-7xl">Let's Bring Your <span className="font-editorial">Idea to Life.</span></h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">Tell us about your project, and we'll get back to you with a proposal, timeline, and next steps.</p>
          <ul className="mt-10 space-y-5">
            {benefits.map(({ icon: Icon, t, d }) => (
              <li key={t} className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background"><Icon className="h-5 w-5" /></span>
                <span><span className="block font-bold">{t}</span><span className="text-muted-foreground">{d}</span></span>
              </li>
            ))}
          </ul>
          <div className="mt-12 hidden lg:block"><IdBadge strap={60} width={240} /></div>
        </div>

        <form onSubmit={submit} noValidate className="space-y-5 rounded-3xl border border-border bg-background p-6 shadow-card md:p-10">
          <div className="grid gap-5 md:grid-cols-2">
            <Field id="full_name" label="Full Name" error={errors["full_name"]}><input id="full_name" name="full_name" autoComplete="name" required className={inputCls} aria-invalid={!!errors["full_name"]} /></Field>
            <Field id="email" label="Email Address" error={errors["email"]}><input id="email" name="email" type="email" autoComplete="email" required className={inputCls} aria-invalid={!!errors["email"]} /></Field>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <Field id="project_type" label="Project Type" error={errors["project_type"]}>
              <select id="project_type" name="project_type" defaultValue="" required className={inputCls} aria-invalid={!!errors["project_type"]}>
                <option value="" disabled>Select a type</option>
                {projectTypes.map((type) => <option key={type}>{type}</option>)}
              </select>
            </Field>
            <Field id="budget" label="Estimated Budget" error={errors["budget"]}>
              <select id="budget" name="budget" defaultValue="" required className={inputCls} aria-invalid={!!errors["budget"]}>
                <option value="" disabled>Select a range</option>
                {budgets.map((budget) => <option key={budget}>{budget}</option>)}
              </select>
            </Field>
          </div>
          <Field id="details" label="Tell Us About Your Project" error={errors["details"]}><textarea id="details" name="details" rows={6} required className={inputCls} aria-invalid={!!errors["details"]} /></Field>
          <Field id="attachment" label="Attachment (optional)" error={errors["attachment"]}>
            <label htmlFor="attachment" className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-input px-4 py-5 text-sm text-muted-foreground hover:border-foreground">
              <Upload className="h-5 w-5" />
              <span className="truncate">{file ? file.name : "Choose a file to attach to your email (max 25 MB)"}</span>
            </label>
            <input id="attachment" name="attachment" type="file" accept={ACCEPT} className="sr-only" onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
            <p className="mt-2 text-xs text-muted-foreground">This website cannot attach files automatically. Your email app will open with the file name in the message; attach the file there before sending.</p>
          </Field>
          <Button type="submit" variant="pill" size="xl" className="w-full">Open Email to Send Brief <ArrowUpRight /></Button>
          <p className="text-xs text-muted-foreground">No account or database is involved. Your details are placed in an email draft for you to review and send.</p>
          <Link to="/contact" className="block text-center text-sm underline underline-offset-4">Prefer a shorter enquiry? Contact us.</Link>
        </form>
      </div>
    </section>
  );
}
