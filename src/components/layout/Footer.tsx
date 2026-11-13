import { Link } from "@tanstack/react-router";
import { Music2, ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { site } from "@/config/site";
import { createMailtoUrl } from "@/lib/mailto";
import { Logo } from "@/components/brand/Logo";
import { Orbits, Plus, Watermark } from "@/components/brand/Decor";
import { navLinks } from "./Navbar";

const icons: Record<string, typeof Music2> = { TikTok: Music2 };

export function SocialIcons() {
  return (
    <div className="flex gap-3">
      {site.socials.map((social) => {
        const Icon = icons[social.label] ?? Music2;
        return (
          <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 transition-colors hover:bg-foreground hover:text-background">
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}

const emailSchema = z.string().trim().email("Enter a valid email").max(255);

export function Footer() {
  const [email, setEmail] = useState("");

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Enter a valid email");
      return;
    }

    const subscriberEmail = parsed.data.toLowerCase();
    const subject = "Newsletter subscription request";
    const body = `Please add this email address to the Ascend Motion updates list: ${subscriberEmail}`;
    window.location.href = createMailtoUrl({ to: site.email, subject, body });
    toast.info("Your email app should open. Send the message to request updates.");
  }

  return (
    <footer className="paper-grain relative overflow-hidden border-t border-border">
      <Orbits className="text-foreground" />
      <Watermark className="-right-20 bottom-0 h-[420px] w-auto" />
      <Plus className="left-[8%] top-10" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr] lg:px-10">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-muted-foreground">{site.description}</p>
          <p className="font-editorial mt-4 text-lg">{site.tagline}</p>
          <div className="mt-6"><SocialIcons /></div>
        </div>
        <div>
          <h4 className="eyebrow mb-5">Navigate</h4>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.to}><Link to={link.to} className="text-muted-foreground hover:text-foreground">{link.label}</Link></li>
            ))}
            <li><Link to="/start-project" className="text-muted-foreground hover:text-foreground">Start a Project</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow mb-5">Services</h4>
          <ul className="space-y-3 text-muted-foreground">
            {["Commercial Ads", "Product Videos", "Brand Films", "Social Content"].map((service) => (
              <li key={service}><Link to="/services" className="hover:text-foreground">{service}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="eyebrow mb-5">Contact</h4>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /><a href={`mailto:${site.email}`} className="hover:text-foreground">{site.email}</a></li>
            {site.phone && <li className="flex items-center gap-2"><Phone className="h-4 w-4" />{site.phone}</li>}
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" />{site.location}</li>
          </ul>
          <form onSubmit={subscribe} className="mt-6">
            <label htmlFor="newsletter" className="text-sm font-semibold">Get updates by email</label>
            <div className="mt-2 flex rounded-full border border-foreground/20 bg-background p-1">
              <input id="newsletter" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email" autoComplete="email" required className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none" />
              <button type="submit" aria-label="Request email updates" className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background"><ArrowRight className="h-4 w-4" /></button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Opens your email app. No online signup or mailing database.</p>
          </form>
        </div>
      </div>
      <div className="relative z-10 border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-muted-foreground md:flex-row lg:px-10">
          <span>© {new Date().getFullYear()} Ascend Motion™. All rights reserved.</span>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
