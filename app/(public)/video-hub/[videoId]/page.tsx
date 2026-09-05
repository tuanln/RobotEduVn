import { notFound } from "next/navigation";
import Link from "next/link";
import { getVideos } from "@/lib/sheets";
import { VideoPlayer } from "@/components/video/video-player";
import { StageBadge } from "@/components/common/stage-badge";
import { VideoCard } from "@/components/video/video-card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{ videoId: string }>;
}) {
  const { videoId } = await params;
  const videos = await getVideos();
  const video = videos.find((v) => v.id === videoId);

  if (!video) notFound();

  const related = videos
    .filter((v) => v.stage === video.stage && v.id !== video.id)
    .slice(0, 3);

  return (
    <div className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Back */}
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href="/video-hub">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Video Hub
          </Link>
        </Button>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main */}
          <div className="lg:col-span-2">
            <VideoPlayer youtubeId={video.youtubeId} title={video.title} />
            <h1 className="mt-6 text-2xl font-bold">{video.title}</h1>
            <div className="mt-3 flex items-center gap-3">
              <StageBadge stage={video.stage} />
              <span className="text-sm text-muted-foreground">
                {video.ageRange} tuổi
              </span>
              {video.tags.length > 0 && (
                <div className="flex gap-1">
                  {video.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {video.description}
            </p>
          </div>

          {/* Sidebar: related */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Video Liên Quan</h2>
            <div className="space-y-4">
              {related.map((v) => (
                <VideoCard key={v.id} video={v} />
              ))}
            </div>
            {related.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Chưa có video liên quan.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
