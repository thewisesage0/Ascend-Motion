export type MailDraft = {
  to: string;
  subject: string;
  body: string;
};

/** Build a mailto URL without relying on a server, API, or database. */
export function createMailtoUrl({ to, subject, body }: MailDraft): string {
  const recipient = to.trim();
  const query = [
    `subject=${encodeURIComponent(subject)}`,
    `body=${encodeURIComponent(body)}`,
  ].join("&");

  return `mailto:${recipient}?${query}`;
}
