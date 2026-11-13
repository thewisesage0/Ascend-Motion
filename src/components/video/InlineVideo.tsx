import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Autoplaying, muted video preview with no poster or static-image fallback.
 * Playback starts near the viewport and pauses when the media scrolls away.
 */
export function InlineVideo({
  src,
  title,
  className,
  controls = false,
  loop = true,
}: {
  src: string;
  title: string;
  className?: string;
  controls?: boolean;
  loop?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      void video.play().catch(() => {
        // Browser autoplay policies can defer playback until a user gesture.
      });
    };

    if (typeof IntersectionObserver === "undefined") {
      play();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) play();
          else video.pause();
        }
      },
      { threshold: 0.12, rootMargin: "120px" },
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [src]);

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-foreground", className)}>
      <video
        ref={videoRef}
        src={src}
        muted
        loop={loop}
        autoPlay
        playsInline
        controls={controls}
        preload="metadata"
        aria-label={title}
        onError={() => setFailed(true)}
        onLoadedData={() => setFailed(false)}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center bg-foreground px-4 text-center text-sm text-background">
          Video unavailable. Check that the MP4 exists at {src}.
        </div>
      )}
    </div>
  );
}
