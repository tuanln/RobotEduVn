"use client";

import { NhipSlug } from "@/lib/types";
import { NHIP } from "@/lib/content/nhip";
import { NHIP_NHAN_EN } from "@/lib/content/nhip-nhan/en";
import { NHIP_NHAN_VI } from "@/lib/content/nhip-nhan/vi";
import type { Locale } from "@/lib/i18n/locales";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";


interface VideoFilterProps {
  selectedStage: NhipSlug | "all";
  searchQuery: string;
  onStageChange: (stage: NhipSlug | "all") => void;
  onSearchChange: (query: string) => void;
  locale: Locale;
  tatCa: string;
  timKiem: string;
}

export function VideoFilter({
  selectedStage,
  searchQuery,
  onStageChange,
  onSearchChange,
  locale,
  tatCa,
  timKiem,
}: VideoFilterProps) {
  const nhan = locale === "en" ? NHIP_NHAN_EN : NHIP_NHAN_VI;
  const stages: { value: NhipSlug | "all"; label: string }[] = [
    { value: "all", label: tatCa },
    ...NHIP.map((n) => ({ value: n.slug, label: nhan[n.slug].ten })),
  ];
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={timKiem}
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
