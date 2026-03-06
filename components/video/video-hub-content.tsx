"use client";

import { useState, useEffect, useMemo } from "react";
import { VideoItem, LearningStage } from "@/lib/types";
import { MOCK_VIDEOS } from "@/lib/data";
import { VideoCard } from "@/components/video/video-card";
import { VideoFilter } from "@/components/video/video-filter";
import { useSearchParams } from "next/navigation";

export function VideoHubContent() {
  const searchParams = useSearchParams();
  const initialStage = (searchParams.get("stage") as LearningStage) || "all";

  const [videos, setVideos] = useState<VideoItem[]>(MOCK_VIDEOS);
  const [selectedStage, setSelectedStage] = useState<LearningStage | "all">(
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
            Khong tim thay video nao.
          </p>
          <button
            onClick={() => {
              setSelectedStage("all");
              setSearchQuery("");
            }}
            className="mt-2 text-sm text-primary hover:underline"
          >
            Xoa bo loc
          </button>
        </div>
      )}
    </>
  );
}
