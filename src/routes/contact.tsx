import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/PageHeader";
import { SocialIcons } from "@/components/layout/Footer";
import { Field, inputCls } from "@/components/forms/Field";
import { projectTypes, site } from "@/config/site";
import { createMailtoUrl } from "@/lib/mailto";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Ascend Motion" },
      { name: "description", content: "Get in touch with Ascend Motion in Lagos, Nigeria." },
      { property: "og:title", content: "Let's Create Something Great — Ascend Motion" },
      { property: "og:description", content: "Ready to bring your idea to life? Reach out." },
    ],
  }),
  component: Contact,
});

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  project_type: z.string().min(1, "Choose a project type"),
  message: z.string().trim().min(5, "Tell us a little more").max(5000),
});

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const parsed = contactSchema.safeParse(Object.fromEntries(new FormData(form)));

    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
      return;
    }

    setErrors({});
    const { name, email, project_type, message } = parsed.data;
    const subject = `Website enquiry — ${project_type}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Project type: ${project_type}`,
      "",
      "Message:",
      message,
    ].join("\n");

    window.location.href = createMailtoUrl({ to: site.email, subject, body });
    toast.info("Your email app should open with your message. Review it and press Send to complete your enquiry.");
  }

  return (
    <>
      <PageHeader eyebrow="Contact" title={<>Let's Create <span className="font-editorial">Something Great</span></>} description="Ready to bring your idea to life? Reach out and let's make it happen." />
      <section className="paper-grain pb-24">
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.4fr] lg:px-10">
          <div className="space-y-5">
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-lg font-semibold"><Mail className="h-5 w-5" />{site.email}</a>
            {site.phone && <p className="flex items-center gap-3 text-lg font-semibold"><Phone className="h-5 w-5" />{site.phone}</p>}
            <p className="flex items-center gap-3 text-lg font-semibold"><MapPin className="h-5 w-5" />{site.location}</p>
            <SocialIcons />
          </div>
          <form onSubmit={submit} noValidate className="space-y-5 rounded-3xl border border-border bg-background p-6 shadow-soft md:p-10">
            <div className="grid gap-5 md:grid-cols-2">
              <Field id="name" label="Name" error={errors["name"]}><input id="name" name="name" autoComplete="name" required className={inputCls} aria-invalid={!!errors["name"]} /></Field>
              <Field id="email" label="Email" error={errors["email"]}><input id="email" name="email" type="email" autoComplete="email" required className={inputCls} aria-invalid={!!errors["email"]} /></Field>
            </div>
            <Field id="project_type" label="Project Type" error={errors["project_type"]}>
              <select id="project_type" name="project_type" defaultValue="" required className={inputCls} aria-invalid={!!errors["project_type"]}>
                <option value="" disabled>Select a type</option>
                {projectTypes.map((type) => <option key={type}>{type}</option>)}
              </select>
            </Field>
            <Field id="message" label="Message" error={errors["message"]}><textarea id="message" name="message" rows={6} required className={inputCls} aria-invalid={!!errors["message"]} /></Field>
            <Button type="submit" variant="pill" size="xl" className="w-full md:w-auto">Open Email to Send Message</Button>
            <p className="text-xs text-muted-foreground">Your message is not uploaded or stored by this website. It is placed in an email draft, and you choose whether to send it.</p>
          </form>
        </div>
      </section>
    </>
  );
}
