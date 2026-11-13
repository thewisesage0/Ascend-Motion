import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { site } from "@/config/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Ascend Motion" },
      { name: "description", content: "How Ascend Motion handles information you send us." },
      { property: "og:title", content: "Privacy Policy — Ascend Motion" },
      { property: "og:description", content: "How Ascend Motion handles your information." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <>
      <PageHeader badge={false} eyebrow="Legal" title={<>Privacy <span className="font-editorial">Policy</span></>} description="This is a static website. It does not use an account system, database, or online form-processing service." />
      <section className="mx-auto max-w-4xl space-y-8 px-6 pb-24 text-muted-foreground lg:px-10">
        <div>
          <h2 className="mb-2 text-xl font-bold text-foreground">Information you choose to send</h2>
          <p>When you submit a contact or project form, this website prepares an email in your device's email application. The website does not transmit or store the form contents. The information is sent to Ascend Motion only when you choose to send the email from your email application.</p>
        </div>
        <div>
          <h2 className="mb-2 text-xl font-bold text-foreground">Attachments</h2>
          <p>Files selected in the project enquiry form are not uploaded by this website. The form only reminds you of the selected file name. You must attach the file yourself in your email application before sending.</p>
        </div>
        <div>
          <h2 className="mb-2 text-xl font-bold text-foreground">Third-party services</h2>
          <p>The site loads fonts from Google Fonts and provides links to third-party social platforms. Those providers may receive technical information when your browser requests their resources or when you visit their sites. Their own privacy policies apply.</p>
        </div>
        <div>
          <h2 className="mb-2 text-xl font-bold text-foreground">Contact</h2>
          <p>For privacy questions, email <a className="text-foreground underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>.</p>
        </div>
      </section>
    </>
  );
}
