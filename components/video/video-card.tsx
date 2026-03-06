import Link from "next/link";
import Image from "next/image";
import { VideoItem } from "@/lib/types";
import { StageBadge } from "@/components/common/stage-badge";

export function VideoCard({ video }: { video: VideoItem }) {
  return (
    <Link
      href={`/video-hub/${video.id}`}
      className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={video.thumbnail || `/api/og?title=${encodeURIComponent(video.title)}`}
          alt={video.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-2xl text-white">
            ▶
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug group-hover:text-primary">
          {video.title}
        </h3>
        <div className="mt-2 flex items-center gap-2">
          <StageBadge stage={video.stage} />
          <span className="text-xs text-muted-foreground">
            {video.ageRange} tuổi
          </span>
        </div>
      </div>
    </Link>
  );
}
