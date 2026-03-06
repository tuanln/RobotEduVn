"use client";

import { LearningStage } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const stages: { value: LearningStage | "all"; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "kham-pha", label: "Khám Phá" },
  { value: "tu-duy", label: "Tư Duy" },
  { value: "lap-trinh", label: "Lập Trình" },
  { value: "iot-robot", label: "IoT & Robot" },
  { value: "chia-se", label: "Chia Sẻ" },
];

interface VideoFilterProps {
  selectedStage: LearningStage | "all";
  searchQuery: string;
  onStageChange: (stage: LearningStage | "all") => void;
  onSearchChange: (query: string) => void;
}

export function VideoFilter({
  selectedStage,
  searchQuery,
  onStageChange,
  onSearchChange,
}: VideoFilterProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm video..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {stages.map((s) => (
          <button
            key={s.value}
            onClick={() => onStageChange(s.value)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              selectedStage === s.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
