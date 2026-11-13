import { ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { site } from "@/config/site";
import { getVideoEmbedUrl, getVideoSource } from "@/lib/video";
import { cn } from "@/lib/utils";

function VideoFrame({ src, title, autoplay = false }: { src: string; title: string; autoplay?: boolean }) {
  const source = getVideoSource(src);

  if (source.kind === "file") {
    return (
      <video
        src={source.url}
        controls
        autoPlay={autoplay}
        muted={autoplay}
        loop={autoplay}
        playsInline
        preload="metadata"
        className="h-full w-full bg-foreground object-contain"
      />
    );
  }

  if (source.embedUrl) {
    return (
      <iframe
        src={getVideoEmbedUrl(source, { autoplay })}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="h-full w-full border-0"
      />
    );
  }

  if (source.kind === "link") {
    return (
      <div className="flex h-full min-h-64 flex-col items-center justify-center gap-4 bg-background p-8 text-center text-foreground">
        <p className="max-w-lg text-muted-foreground">This video is hosted on an external platform.</p>
        <a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 font-semibold text-background">
          Watch video on its platform <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-64 items-center justify-center bg-foreground p-8 text-center text-background">
      No video has been configured for this section yet.
    </div>
  );
}

/** Shows the actual video directly; no static poster/placeholder image is used. */
export function VideoPlayer({
  src = site.video.src,
  title,
  className,
}: {
  src?: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-3xl bg-foreground shadow-card", className)}>
      <VideoFrame src={src} title={title} autoplay={getVideoSource(src).kind !== "empty"} />
    </div>
  );
}

export function ShowreelDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const hasVideo = getVideoSource(site.video.src).kind !== "empty";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl overflow-hidden border-none bg-foreground p-0 sm:rounded-2xl">
        <DialogTitle className="sr-only">Ascend Motion showreel</DialogTitle>
        {hasVideo ? (
          <div className="aspect-video w-full">
            <VideoFrame src={site.video.src} title="Ascend Motion showreel" autoplay />
          </div>
        ) : (
          <div className="bg-background p-8 text-foreground sm:p-12">
            <p className="eyebrow">Showreel update</p>
            <h2 className="mt-2 text-2xl font-extrabold">Our combined showreel is being prepared.</h2>
            <p className="mt-3 text-sm text-muted-foreground">In the meantime, explore the individual project videos in Our Work.</p>
            <a href={`mailto:${site.email}`} className="mt-5 inline-flex font-semibold underline underline-offset-4">Request samples</a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
