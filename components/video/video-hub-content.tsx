"use client";

import { useState, useEffect, useMemo } from "react";
import { VideoItem, NhipSlug } from "@/lib/types";
import { VIDEOS } from "@/lib/content/videos";
import { VideoCard } from "@/components/video/video-card";
import { VideoFilter } from "@/components/video/video-filter";
import { useSearchParams } from "next/navigation";
import { normalizeNhipSlug } from "@/lib/content/nhip-slug";

export function VideoHubContent() {
  const searchParams = useSearchParams();
  const rawStage = searchParams.get("stage");
  const initialStage: NhipSlug | "all" =
    !rawStage || rawStage === "all" ? "all" : normalizeNhipSlug(rawStage);

  const [videos, setVideos] = useState<VideoItem[]>(VIDEOS);
  const [selectedStage, setSelectedStage] = useState<NhipSlug | "all">(
    initialStage
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/content?type=videos")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setVideos(data);
      })
      .catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    return videos.filter((v) => {
      if (selectedStage !== "all" && v.stage !== selectedStage) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          v.title.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [videos, selectedStage, searchQuery]);

  return (
    <>
      <VideoFilter
        selectedStage={selectedStage}
        searchQuery={searchQuery}
        onStageChange={setSelectedStage}
        onSearchChange={setSearchQuery}
      />

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg text-muted-foreground">
            Không tìm thấy video nào.
          </p>
          <button
            onClick={() => {
              setSelectedStage("all");
              setSearchQuery("");
            }}
            className="mt-2 text-sm text-primary hover:underline"
          >
            Xoá bộ lọc
          </button>
        </div>
      )}
    </>
  );
}
